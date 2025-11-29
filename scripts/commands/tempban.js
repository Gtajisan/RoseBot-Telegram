module.exports = {
  name: 'tempban',
  description: 'Temporary ban user',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0] || !args[1]) {
        await goat.reply(ctx, '❌ Usage: /tempban <user_id> <time>\nExample: /tempban 123456 24h');
        return;
      }
      const userId = parseInt(args[0]);
      const time = args[1];
      await goat.banUser(ctx.chat.id, userId);
      await goat.reply(ctx, `✅ User ${userId} temporarily banned for ${time}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
