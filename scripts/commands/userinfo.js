module.exports = {
  name: 'userinfo',
  description: 'Get detailed user information',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      let targetUserId = ctx.from.id;
      
      // Get target user ID
      if (ctx.message?.reply_to_message?.from) {
        targetUserId = ctx.message.reply_to_message.from.id;
      } else if (args[0] && !isNaN(args[0])) {
        targetUserId = parseInt(args[0]);
      }

      const telegram = goat.getInstance().telegram;
      
      // Get user profile photos
      let photoCount = 0;
      try {
        const photos = await telegram.getUserProfilePhotos(targetUserId);
        photoCount = photos.total_count || 0;
      } catch (err) {
        photoCount = '?';
      }

      // Get user database info
      const userData = await db.getUser(targetUserId);
      const createdDate = userData?.created_at 
        ? new Date(userData.created_at).toLocaleDateString() 
        : 'Not tracked';

      // Get command usage
      const cmdStats = await db.all(`
        SELECT COUNT(*) as count FROM command_usage WHERE user_id = ?
      `, [targetUserId]);

      // Get warnings
      const warnStats = await db.all(`
        SELECT COUNT(*) as count FROM warnings WHERE user_id = ?
      `, [targetUserId]);

      // Build info message
      let info = `*👤 User Information*\n\n`;
      info += `*User ID:* \`${targetUserId}\`\n`;
      info += `*Username:* ${userData?.username ? '@' + userData.username : '(None)'}\n`;
      info += `*Name:* ${userData?.first_name || 'Unknown'}\n`;
      info += `*Admin:* ${userData?.is_admin ? '✅ Yes' : '❌ No'}\n`;
      info += `*Banned:* ${userData?.is_banned ? '🚫 Yes' : '✅ No'}\n`;
      info += `*Profile Photos:* ${photoCount}\n`;
      info += `*First Seen:* ${createdDate}\n`;

      info += `\n*📈 Activity:*\n`;
      info += `*Commands Used:* ${cmdStats?.[0]?.count || 0}\n`;
      info += `*Warnings:* ${warnStats?.[0]?.count || 0}\n`;

      await goat.reply(ctx, info, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error getting user info: ${error.message}`, { parse_mode: 'Markdown' });
    }
  }
};
