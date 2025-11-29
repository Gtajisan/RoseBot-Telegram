module.exports = {
  name: 'kickme',
  description: 'Kick yourself',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
    await goat.reply(ctx, `👋 Goodbye ${ctx.from.first_name}!`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
