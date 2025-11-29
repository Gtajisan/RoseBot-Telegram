module.exports = {
  name: 'warns',
  description: 'Check user warns',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /warns <user_id>');
      return;
    }
    await goat.reply(ctx, `⚠️ User ${args[0]}: 0 warns`);
  }
};
