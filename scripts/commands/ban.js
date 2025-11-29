module.exports = {
  name: 'ban',
  description: 'Ban user from group',
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
        await goat.reply(ctx, '❌ Usage: /ban <user_id|reply>\nReason (optional): /ban <id> <reason>');
        return;
      }

      const reason = args.slice(1).join(' ') || 'No reason';

      // Ban user
      await goat.getInstance().telegram.kickChatMember(ctx.chat.id, targetUserId);
      
      // Get user info for display
      const user = await db.getUser(targetUserId);
      const userName = user?.first_name || `User ${targetUserId}`;

      // Log to database
      await db.run(`INSERT INTO warnings (user_id, chat_id, reason, created_at) VALUES (?, ?, ?, ?)`,
        [targetUserId, ctx.chat.id, `BAN: ${reason}`, Date.now()]);

      await goat.reply(ctx, `🚫 *Banned* ${userName}\n📌 Reason: ${reason}`, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
