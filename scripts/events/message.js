module.exports = {
  event: 'message',
  description: 'Handle messages',

  async execute(ctx, goat, db, config, logger) {
    try {
      const user = ctx.from;
      const chat = ctx.chat;
      
      // Log all chats and users
      if (user) {
        await db.addUser(user.id, {
          username: user.username || 'unknown',
          first_name: user.first_name || ''
        });
        
        logger?.debug(`👤 User: ${user.first_name} (@${user.username}) [ID: ${user.id}]`);
      }

      if (chat) {
        await db.addChat(chat.id, {
          title: chat.title || chat.first_name || 'Private Chat',
          type: chat.type
        });
        
        const chatType = chat.type === 'group' ? '👥' : (chat.type === 'supergroup' ? '👥👥' : '💬');
        logger?.debug(`${chatType} Chat: ${chat.title || chat.first_name} (${chat.type}) [ID: ${chat.id}]`);
      }

      // Track command usage
      if (ctx.message?.text?.startsWith('/')) {
        const cmd = ctx.message.text.split(' ')[0].replace('/', '');
        try {
          await db.run(`
            INSERT INTO command_usage (user_id, chat_id, command, timestamp)
            VALUES (?, ?, ?, ?)
          `, [user.id, chat.id, cmd, Date.now()]);
        } catch (err) {
          logger?.debug(`⚠️ Command tracking error for ${cmd}: ${err.message}`);
        }
      }
    } catch (error) {
      logger?.error(`❌ Message event error: ${error.message}`);
    }
  }
};
