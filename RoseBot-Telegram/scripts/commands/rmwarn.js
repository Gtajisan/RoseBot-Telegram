module.exports = {
  name: 'rmwarn',
  description: 'Remove one warn',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /rmwarn <user_id>');
      return;
    }
    await goat.reply(ctx, `✅ One warn removed from ${args[0]}`);
  }
};
