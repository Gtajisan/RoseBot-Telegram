const { Telegraf } = require('telegraf');

class TelegramClient {
  constructor(token, logger) {
    this.bot = new Telegraf(token);
    this.logger = logger;
  }

  getInstance() {
    return this.bot;
  }

  getTelegram() {
    return this.bot.telegram;
  }
}

module.exports = TelegramClient;
