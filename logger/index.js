class Logger {
  constructor(config = {}) {
    this.level = config.level || 'info';
    this.showTimestamp = config.showTimestamp !== false;
    this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
    this.colors = {
      debug: '\x1b[36m',
      info: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };
  }

  format(level, message, data = '') {
    const timestamp = this.showTimestamp ? `[${new Date().toISOString()}] ` : '';
    const color = this.colors[level] || '';
    const reset = this.colors.reset;
    const emoji = { debug: '🔍', info: 'ℹ️', warn: '⚠️', error: '❌' }[level] || '';
    return `${color}${emoji} ${timestamp}[${level.toUpperCase()}]${reset} ${message} ${data}`;
  }

  log(level, message, data = '') {
    if (this.levels[level] >= this.levels[this.level]) {
      console.log(this.format(level, message, data));
    }
  }

  debug(message, data = '') { this.log('debug', message, data); }
  info(message, data = '') { this.log('info', message, data); }
  warn(message, data = '') { this.log('warn', message, data); }
  error(message, data = '') { this.log('error', message, data); }
}

module.exports = Logger;
