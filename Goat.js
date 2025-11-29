/**
 * Goat.js - Telegram Edition (Converted from GoatBot-V2)
 * Main bot class using Telegraf framework
 */

const { Telegraf } = require('telegraf');

class Goat {
  constructor(token, config, logger) {
    this.bot = new Telegraf(token);
    this.config = config;
    this.logger = logger;
    this.cooldowns = new Map();
  }

  /**
   * Send message
   */
  async sendMessage(chatId, text, options = {}) {
    try {
      return await this.bot.telegram.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        ...options
      });
    } catch (error) {
      this.logger.error('sendMessage error:', error.message);
      throw error;
    }
  }

  /**
   * Edit message
   */
  async editMessage(chatId, messageId, text, options = {}) {
    try {
      return await this.bot.telegram.editMessageText(chatId, messageId, null, text, {
        parse_mode: 'HTML',
        ...options
      });
    } catch (error) {
      this.logger.error('editMessage error:', error.message);
      throw error;
    }
  }

  /**
   * Delete message
   */
  async deleteMessage(chatId, messageId) {
    try {
      return await this.bot.telegram.deleteMessage(chatId, messageId);
    } catch (error) {
      this.logger.error('deleteMessage error:', error.message);
      throw error;
    }
  }

  /**
   * Reply to message
   */
  async reply(ctx, text, options = {}) {
    try {
      return await ctx.reply(text, {
        parse_mode: 'HTML',
        ...options
      });
    } catch (error) {
      this.logger.error('reply error:', error.message);
      throw error;
    }
  }

  /**
   * Get user info
   */
  async getUser(userId) {
    try {
      return await this.bot.telegram.getChat(userId);
    } catch (error) {
      this.logger.error('getUser error:', error.message);
      throw error;
    }
  }

  /**
   * Get group admins
   */
  async getGroupAdmins(chatId) {
    try {
      return await this.bot.telegram.getChatAdministrators(chatId);
    } catch (error) {
      this.logger.error('getGroupAdmins error:', error.message);
      throw error;
    }
  }

  /**
   * Get chat info
   */
  async fetchChat(chatId) {
    try {
      return await this.bot.telegram.getChat(chatId);
    } catch (error) {
      this.logger.error('fetchChat error:', error.message);
      throw error;
    }
  }

  /**
   * Ban user
   */
  async banUser(chatId, userId) {
    try {
      return await this.bot.telegram.banChatMember(chatId, userId);
    } catch (error) {
      this.logger.error('banUser error:', error.message);
      throw error;
    }
  }

  /**
   * Unban user
   */
  async unbanUser(chatId, userId) {
    try {
      return await this.bot.telegram.unbanChatMember(chatId, userId);
    } catch (error) {
      this.logger.error('unbanUser error:', error.message);
      throw error;
    }
  }

  /**
   * Kick user
   */
  async kickUser(chatId, userId) {
    try {
      return await this.bot.telegram.kickChatMember(chatId, userId);
    } catch (error) {
      this.logger.error('kickUser error:', error.message);
      throw error;
    }
  }

  /**
   * Check if user is admin
   */
  async isUserAdmin(chatId, userId) {
    try {
      const member = await this.bot.telegram.getChatMember(chatId, userId);
      return member.status === 'administrator' || member.status === 'creator';
    } catch (error) {
      return false;
    }
  }

  /**
   * Check cooldown
   */
  checkCooldown(userId, command) {
    const key = `${userId}-${command}`;
    const cooldownMs = this.config.cooldown?.default || 3000;

    if (this.cooldowns.has(key)) {
      const expirationTime = this.cooldowns.get(key);
      if (Date.now() < expirationTime) return false;
    }

    this.cooldowns.set(key, Date.now() + cooldownMs);
    return true;
  }

  /**
   * Get cooldown remaining
   */
  getCooldownRemaining(userId, command) {
    const key = `${userId}-${command}`;
    if (!this.cooldowns.has(key)) return 0;
    return Math.max(0, this.cooldowns.get(key) - Date.now());
  }

  /**
   * Launch bot
   */
  async launch() {
    try {
      await this.bot.launch(this.config.telegram.polling);
      this.logger.info('✅ Bot polling started');
    } catch (error) {
      this.logger.error('Bot launch error:', error.message);
      throw error;
    }
  }

  /**
   * Stop bot
   */
  async stop() {
    try {
      await this.bot.stop();
      this.logger.info('🛑 Bot stopped');
    } catch (error) {
      this.logger.error('Bot stop error:', error.message);
    }
  }

  /**
   * Get bot instance
   */
  getInstance() {
    return this.bot;
  }
}

module.exports = Goat;
