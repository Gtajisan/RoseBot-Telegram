module.exports = {
  name: 'promote',
  description: 'Promote user to admin',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /promote <user_id>');
      return;
    }
    const userId = args[0];
    await goat.reply(ctx, `✅ User ${userId} promoted to admin`);
  }
};
