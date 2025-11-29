const fs = require('fs');
const path = require('path');

class CommandHandler {
  constructor(config, logger, db) {
    this.commands = new Map();
    this.config = config;
    this.logger = logger;
    this.db = db;
  }

  load(commandsDir) {
    // Resolve to absolute path
    const absoluteDir = path.isAbsolute(commandsDir) 
      ? commandsDir 
      : path.resolve(__dirname, '../../', commandsDir);
    
    if (!fs.existsSync(absoluteDir)) {
      this.logger.warn(`Commands directory not found: ${absoluteDir}`);
      return;
    }

    const files = fs.readdirSync(absoluteDir).filter(f => f.endsWith('.js'));

    for (const file of files) {
      try {
        const filePath = path.join(absoluteDir, file);
        // Clear all cache entries for this file
        Object.keys(require.cache).forEach(key => {
          if (key.includes(file) || key.endsWith(filePath)) {
            delete require.cache[key];
          }
        });
        const cmd = require(filePath);

        // Validate command structure
        if (!cmd.name) {
          this.logger.warn(`⚠️ Command ${file} missing 'name' property - skipped`);
          continue;
        }
        if (typeof cmd.execute !== 'function') {
          this.logger.warn(`⚠️ Command ${file} missing 'execute' function - skipped`);
          continue;
        }

        this.commands.set(cmd.name, cmd);
        this.logger.info(`✅ Command loaded: /${cmd.name}`);
      } catch (error) {
        this.logger.error(`Failed to load command ${file}: ${error.message}`);
      }
    }

    this.logger.info(`📋 Total commands loaded: ${this.commands.size}`);
  }

  get(name) {
    return this.commands.get(name);
  }

  getAll() {
    return Array.from(this.commands.values());
  }

  async handle(ctx, commandName, args, goat) {
    const cmd = this.get(commandName);
    if (!cmd) return false;

    const userId = ctx.from?.id;
    const isOwner = this.config.configCommands?.owners?.includes(userId);
    const user = await this.db.getUser(userId);

    if (cmd.adminOnly && !isOwner && !user?.is_admin) {
      await goat.reply(ctx, '❌ Admin only');
      return false;
    }

    if (!goat.checkCooldown(userId, commandName)) {
      const remaining = Math.ceil(goat.getCooldownRemaining(userId, commandName) / 1000);
      await goat.reply(ctx, `⏱️ Wait ${remaining}s`);
      return false;
    }

    try {
      await cmd.execute(ctx, args, this.db, this.config, goat);
      await this.db.addCommandUsage(userId, commandName);
      return true;
    } catch (error) {
      this.logger.error(`Command error (${commandName}):`, error.message);
      await goat.reply(ctx, `❌ Error: ${error.message}`);
      return false;
    }
  }

  getAll() {
    return Array.from(this.commands.values());
  }

  count() {
    return this.commands.size;
  }
}

module.exports = CommandHandler;
