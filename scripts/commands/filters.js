module.exports = {
  name: 'filters',
  description: 'List all filters',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      const msg = `*🔍 Active Filters*\n\nNo filters active yet.\n\nUse /filter to add`;
      await goat.reply(ctx, msg, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
