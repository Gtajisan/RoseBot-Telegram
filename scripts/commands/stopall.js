module.exports = {
  name: 'stopall',
  description: 'Remove all filters',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      await goat.reply(ctx, '✅ All filters removed', { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
