module.exports = {
  name: 'chatinfo',
  description: 'Get detailed chat information',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      const chat = ctx.chat;
      const telegram = goat.getInstance().telegram;

      // Get chat member count
      let memberCount = 0;
      let adminCount = 0;
      
      try {
        memberCount = await telegram.getChatMembersCount(chat.id);
      } catch (err) {
        memberCount = '?';
      }

      // Try to get administrators count (requires admin permissions)
      try {
        const admins = await telegram.getChatAdministrators(chat.id);
        adminCount = admins ? admins.length : '?';
      } catch (err) {
        adminCount = '?';
      }

      // Get chat database info
      const chatData = await db.getChat(chat.id);
      const createdDate = chatData?.created_at 
        ? new Date(chatData.created_at).toLocaleDateString() 
        : 'Unknown';

      // Determine if bot is admin
      let botIsAdmin = false;
      try {
        const botId = await telegram.getMe();
        const botMember = await telegram.getChatMember(chat.id, botId.id);
        botIsAdmin = botMember.status === 'administrator' || botMember.status === 'creator';
      } catch (err) {
        botIsAdmin = false;
      }

      // Build info message
      let info = `*📊 Chat Information*\n\n`;
      info += `*Chat ID:* \`${chat.id}\`\n`;
      info += `*Type:* ${chat.type === 'group' ? '👥 Group' : chat.type === 'supergroup' ? '👥👥 Supergroup' : chat.type === 'private' ? '💬 Private' : chat.type}\n`;
      
      if (chat.title) {
        info += `*Title:* ${chat.title}\n`;
      }
      
      if (chat.description) {
        info += `*Description:* ${chat.description}\n`;
      }

      info += `*Members:* ${memberCount}\n`;
      info += `*Admins:* ${adminCount}\n`;
      info += `*Created:* ${createdDate}\n`;
      info += `*Bot Admin:* ${botIsAdmin ? '✅ Yes' : '❌ No'}\n`;

      // Get prefix from database or config
      const prefix = chatData?.prefix || config.bot.prefix;
      info += `*Prefix:* \`${prefix}\`\n`;

      // Add stats
      const commandStats = await db.all(`
        SELECT COUNT(*) as count FROM command_usage WHERE chat_id = ?
      `, [chat.id]);
      
      const warnStats = await db.all(`
        SELECT COUNT(*) as count FROM warnings WHERE chat_id = ?
      `, [chat.id]);

      info += `\n*📈 Statistics:*\n`;
      info += `*Commands Used:* ${commandStats?.[0]?.count || 0}\n`;
      info += `*Warnings Issued:* ${warnStats?.[0]?.count || 0}\n`;

      await goat.reply(ctx, info, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error getting chat info: ${error.message}`, { parse_mode: 'Markdown' });
    }
  }
};
