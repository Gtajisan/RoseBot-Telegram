module.exports = {
  name: 'kickme',
  description: 'Kick yourself',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    await goat.reply(ctx, `👋 Goodbye ${ctx.from.first_name}!`);
  }
};
