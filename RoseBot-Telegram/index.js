#!/usr/bin/env node

const fs = require('fs');
const express = require('express');

const Logger = require('./logger');
const Goat = require('./Goat');
const CommandHandler = require('./bot/handlers/CommandHandler');
const EventHandler = require('./bot/handlers/EventHandler');
const DB = require('./database');

// Load config
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const configCommands = JSON.parse(fs.readFileSync('./configCommands.json', 'utf8'));
const versions = JSON.parse(fs.readFileSync('./versions.json', 'utf8'));
config.configCommands = configCommands;

// Initialize
const logger = new Logger(config.logging);
const db = new DB(config.database.path);
const goat = new Goat(config.telegram.token, config, logger);
const commandHandler = new CommandHandler(config, logger, db);
const eventHandler = new EventHandler(config, logger, db);

console.log(`
╔════════════════════════════════════════╗
║    🌹 ROSE BOT - Telegram Edition     ║
║     Version ${versions.version} (Build ${versions.build})        ║
╚════════════════════════════════════════╝
`);

logger.info('🚀 Rose Bot starting...');

// Load commands and events
commandHandler.load('./scripts/commands');
eventHandler.load('./scripts/events');

// Attach to ctx
goat.getInstance().context.commandHandler = commandHandler;
goat.getInstance().context.eventHandler = eventHandler;

// Message handler
goat.getInstance().on('message', async (ctx) => {
  try {
    ctx.commandHandler = commandHandler;
    ctx.eventHandler = eventHandler;

    const text = ctx.message?.text || '';

    if (text.startsWith(config.bot.prefix)) {
      const args = text.slice(config.bot.prefix.length).split(/\s+/);
      const cmd = args.shift().toLowerCase();
      await commandHandler.handle(ctx, cmd, args, goat);
    } else {
      await eventHandler.emit('message', ctx, goat);
    }
  } catch (error) {
    logger.error('Message error:', error.message);
  }
});

// Group join event
goat.getInstance().on('my_chat_member', async (ctx) => {
  try {
    const member = ctx.myChatMember.new_chat_member;
    if (member.status === 'member') {
      ctx.commandHandler = commandHandler;
      ctx.eventHandler = eventHandler;
      await eventHandler.emit('group_join', ctx, goat);
    }
  } catch (error) {
    logger.error('Group join error:', error.message);
  }
});

// Error handler
goat.getInstance().catch((err) => {
  logger.error('Bot error:', err.message);
});

// Express API
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'online', version: versions.version });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: Date.now() });
});

app.get('/api/stats', (req, res) => {
  const stats = db.getStats();
  const memory = process.memoryUsage();
  res.json({
    bot: { version: versions.version, uptime: Math.floor(process.uptime()), stats },
    system: { memory: { heapUsed: Math.round(memory.heapUsed / 1024 / 1024) } }
  });
});

app.get('/api/commands', (req, res) => {
  const cmds = commandHandler.getAll();
  res.json({ count: cmds.length, commands: cmds });
});

// Start
async function start() {
  try {
    app.listen(config.api.port, () => {
      logger.info(`📊 Dashboard API on port ${config.api.port}`);
    });

    await goat.launch();
    logger.info('✅ Rose Bot ONLINE!');
    logger.info(`📋 Commands: ${commandHandler.count()} | Events: ${eventHandler.events.size}`);
  } catch (error) {
    logger.error('Startup error:', error.message);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  logger.warn('Shutting down...');
  await goat.stop();
  db.close();
  process.exit(0);
});

start().catch(e => {
  logger.error('Fatal error:', e.message);
  process.exit(1);
});

module.exports = { goat, db, logger, commandHandler, eventHandler };
