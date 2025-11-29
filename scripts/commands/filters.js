module.exports = {
  name: 'filters',
  description: 'List all filters',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const msg = `<b>🔍 Active Filters</b>\n\nNo filters active yet.\n\nUse /filter to add`;
    await goat.reply(ctx, msg);
  }
};
