module.exports = {
  name: 'stop',
  description: 'Remove filter',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /stop <trigger>');
      return;
    }
    await goat.reply(ctx, `✅ Filter "${args[0]}" removed`);
  }
};
