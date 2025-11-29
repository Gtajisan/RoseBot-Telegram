/**
 * General utilities
 */

const resolve = {
  // Username to ID resolution
  async resolveName(name, goat) {
    try {
      if (!name.includes('@')) {
        return parseInt(name);
      }
      // For Telegram, username resolution would require API call
      // This is a placeholder for Messenger compatibility
      return null;
    } catch (error) {
      return null;
    }
  }
};

module.exports = { resolve };
