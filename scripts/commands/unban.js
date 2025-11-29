module.exports = {
  name: 'unban',
  description: 'Unban user',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /unban <user_id>');
        return;
      }
      const userId = parseInt(args[0]);
      await goat.unbanUser(ctx.chat.id, userId);
      await goat.reply(ctx, `✅ User ${userId} unbanned`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
