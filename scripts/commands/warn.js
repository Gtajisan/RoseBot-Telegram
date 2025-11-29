module.exports = {
  name: 'warn',
  description: 'Warn user (3 warns = kick)',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      // Get target user
      let targetUserId = null;
      if (ctx.message?.reply_to_message?.from) {
        targetUserId = ctx.message.reply_to_message.from.id;
      } else if (args[0] && !isNaN(args[0])) {
        targetUserId = parseInt(args[0]);
      } else {
        await goat.reply(ctx, '❌ Usage: /warn <user_id|reply>\nReason (optional): /warn <id> <reason>');
        return;
      }

      const reason = args.slice(1).join(' ') || 'No reason';

      // Add warning to database
      await db.run(`INSERT INTO warnings (user_id, chat_id, reason, created_at) VALUES (?, ?, ?, ?)`,
        [targetUserId, ctx.chat.id, reason, Date.now()]);

      // Get warning count
      const warnings = await db.all(`
        SELECT COUNT(*) as count FROM warnings WHERE user_id = ? AND chat_id = ?
      `, [targetUserId, ctx.chat.id]);

      const warnCount = warnings?.[0]?.count || 1;

      // Get user info
      const user = await db.getUser(targetUserId);
      const userName = user?.first_name || `User ${targetUserId}`;

      let msg = `⚠️ *Warning* ${userName}\n`;
      msg += `📊 Warnings: ${warnCount}/3\n`;
      msg += `📌 Reason: ${reason}`;

      // Auto-kick after 3 warnings
      if (warnCount >= 3) {
        await goat.getInstance().telegram.kickChatMember(ctx.chat.id, targetUserId);
        setTimeout(async () => {
          try {
            await goat.getInstance().telegram.unbanChatMember(ctx.chat.id, targetUserId);
          } catch (err) {}
        }, 5000);
        msg = `🚪 *Auto-kicked* ${userName}\n📊 Reached 3 warnings\n📌 Reason: ${reason}`;
      }

      await goat.reply(ctx, msg, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
