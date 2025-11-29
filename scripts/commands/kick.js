module.exports = {
  name: 'kick',
  description: 'Kick user from group',
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
        await goat.reply(ctx, '❌ Usage: /kick <user_id|reply>\nReason (optional): /kick <id> <reason>');
        return;
      }

      const reason = args.slice(1).join(' ') || 'No reason';

      // Kick user
      await goat.getInstance().telegram.kickChatMember(ctx.chat.id, targetUserId);
      
      // Unban after 5 seconds to allow rejoin
      setTimeout(async () => {
        try {
          await goat.getInstance().telegram.unbanChatMember(ctx.chat.id, targetUserId);
        } catch (err) {}
      }, 5000);

      // Get user info
      const user = await db.getUser(targetUserId);
      const userName = user?.first_name || `User ${targetUserId}`;

      await goat.reply(ctx, `🚪 *Kicked* ${userName}\n📌 Reason: ${reason}`, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
