/**
 * Unified Logger for Rose Bot
 * Handles database, bot, and system logging
 */

const fs = require('fs');
const path = require('path');

class Logger {
  constructor(logDir = './logs') {
    this.logDir = logDir;
    this.levels = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
    this.currentLevel = this.levels.INFO;
    
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.dbLogFile = path.join(logDir, 'database.log');
    this.botLogFile = path.join(logDir, 'bot.log');
    this.errorLogFile = path.join(logDir, 'errors.log');
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  format(level, tag, message, data = null) {
    const timestamp = this.getTimestamp();
    let log = `[${timestamp}] [${level}] [${tag}] ${message}`;
    if (data) {
      log += ` | ${JSON.stringify(data).substring(0, 200)}`;
    }
    return log;
  }

  write(file, content) {
    try {
      fs.appendFileSync(file, content + '\n');
    } catch (err) {
      console.error('Failed to write log:', err.message);
    }
  }

  // Database logging
  database(operation, details, success = true) {
    const level = success ? 'INFO' : 'ERROR';
    const emoji = success ? '📊' : '❌';
    const msg = this.format(level, 'DATABASE', `${emoji} ${operation}`, details);
    this.write(this.dbLogFile, msg);
    if (!success) this.write(this.errorLogFile, msg);
  }

  // Bot logging
  bot(event, details = null) {
    const emoji = '🤖';
    const msg = this.format('INFO', 'BOT', `${emoji} ${event}`, details);
    this.write(this.botLogFile, msg);
  }

  // Command logging
  command(command, userId, success = true, error = null) {
    const level = success ? 'INFO' : 'ERROR';
    const emoji = success ? '✅' : '❌';
    const details = { command, userId, timestamp: Date.now() };
    if (error) details.error = error;
    const msg = this.format(level, 'COMMAND', `${emoji} /${command}`, details);
    this.write(this.botLogFile, msg);
    if (!success) this.write(this.errorLogFile, msg);
  }

  // Error logging
  error(tag, error, context = null) {
    const msg = this.format('ERROR', tag, `${error.message}`, context);
    this.write(this.errorLogFile, msg);
    console.error(msg);
  }

  // Info logging
  info(tag, message, data = null) {
    const msg = this.format('INFO', tag, message, data);
    this.write(this.botLogFile, msg);
    console.log(msg);
  }

  // Debug logging
  debug(tag, message, data = null) {
    if (this.currentLevel >= this.levels.DEBUG) {
      const msg = this.format('DEBUG', tag, message, data);
      console.log(msg);
    }
  }

  // Get log stats
  getStats() {
    try {
      const dbSize = fs.statSync(this.dbLogFile).size;
      const botSize = fs.statSync(this.botLogFile).size;
      const errorSize = fs.statSync(this.errorLogFile).size;
      
      return {
        database: `${(dbSize / 1024).toFixed(2)} KB`,
        bot: `${(botSize / 1024).toFixed(2)} KB`,
        errors: `${(errorSize / 1024).toFixed(2)} KB`
      };
    } catch {
      return { database: '0 KB', bot: '0 KB', errors: '0 KB' };
    }
  }

  // Clear logs
  clear() {
    [this.dbLogFile, this.botLogFile, this.errorLogFile].forEach(file => {
      try {
        fs.writeFileSync(file, '');
      } catch (err) {
        console.error(`Failed to clear ${file}:`, err.message);
      }
    });
  }
}

module.exports = new Logger();
