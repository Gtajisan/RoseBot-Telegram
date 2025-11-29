module.exports = {
  name: 'promote',
  description: 'Promote user to admin',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /promote <user_id>', { parse_mode: 'Markdown' });
      return;
    }
    const userId = args[0];
    await goat.reply(ctx, `✅ User ${userId} promoted to admin`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
