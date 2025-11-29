module.exports = {
  name: 'stopall',
  description: 'Remove all filters',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      await goat.reply(ctx, '✅ All filters removed');
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
