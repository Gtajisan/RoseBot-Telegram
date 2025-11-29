/**
 * Telegram API wrapper
 * Replaces fb-chat-api for Telegram-specific operations
 */

class TelegramAPI {
  constructor(telegram, logger) {
    this.telegram = telegram;
    this.logger = logger;
  }

  async sendMessage(chatId, text, options = {}) {
    return await this.telegram.sendMessage(chatId, text, { parse_mode: 'HTML', ...options });
  }

  async editMessage(chatId, messageId, text, options = {}) {
    return await this.telegram.editMessageText(chatId, messageId, null, text, { parse_mode: 'HTML', ...options });
  }

  async deleteMessage(chatId, messageId) {
    return await this.telegram.deleteMessage(chatId, messageId);
  }

  async getChat(chatId) {
    return await this.telegram.getChat(chatId);
  }

  async getChatAdministrators(chatId) {
    return await this.telegram.getChatAdministrators(chatId);
  }

  async getChatMember(chatId, userId) {
    return await this.telegram.getChatMember(chatId, userId);
  }

  async banUser(chatId, userId) {
    return await this.telegram.banChatMember(chatId, userId);
  }

  async unbanUser(chatId, userId) {
    return await this.telegram.unbanChatMember(chatId, userId);
  }

  async kickUser(chatId, userId) {
    return await this.telegram.kickChatMember(chatId, userId);
  }
}

module.exports = TelegramAPI;
