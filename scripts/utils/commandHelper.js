/**
 * Command Helper Utility
 * Provides standardized error handling, logging, and API response validation
 * for all bot commands
 */

const commandHelper = {
  /**
   * Safely log messages with emoji prefixes
   */
  log: (emoji, tag, message, data = null) => {
    const timestamp = new Date().toISOString();
    if (data) {
      console.log(`${emoji} [${tag}] ${message}`, JSON.stringify(data).substring(0, 150));
    } else {
      console.log(`${emoji} [${tag}] ${message}`);
    }
  },

  /**
   * Handle command errors with user-friendly messages
   */
  handleError: async (ctx, goat, error, commandName) => {
    commandHelper.log('❌', commandName, 'Error:', error.message);
    
    let errorMsg = '❌ Command failed';
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      errorMsg = '⏱️ Request timed out - try again in a moment.';
    } else if (error.message.includes('404')) {
      errorMsg = '❌ Resource not found';
    } else if (error.message.includes('401') || error.message.includes('403')) {
      errorMsg = '🔐 Access denied';
    } else if (error.message.includes('429')) {
      errorMsg = '⚠️ Rate limited - try again later';
    } else if (error.message.includes('500') || error.message.includes('503')) {
      errorMsg = '⚠️ Service error - try again later';
    }
    
    try {
      await goat.reply(ctx, errorMsg, { parse_mode: 'Markdown' });
    } catch (replyErr) {
      console.error(`Failed to send error reply: ${replyErr.message}`);
    }
  },

  /**
   * Validate API response
   */
  validateResponse: (data, expectedFields = []) => {
    if (!data) return false;
    
    for (const field of expectedFields) {
      if (!data[field]) return false;
    }
    
    return true;
  },

  /**
   * Safe string truncation for logging
   */
  truncate: (str, length = 80) => {
    if (!str) return 'null';
    const s = String(str);
    return s.length > length ? s.substring(0, length) + '...' : s;
  }
};

module.exports = commandHelper;
