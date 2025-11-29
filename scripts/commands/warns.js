module.exports = {
  name: 'warns',
  description: 'Check user warns',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /warns <user_id>', { parse_mode: 'Markdown' });
        return;
      }
      await goat.reply(ctx, `⚠️ User ${args[0]}: 0 warns`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
