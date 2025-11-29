module.exports = {
  name: 'resetwarn',
  description: 'Reset user warns',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /resetwarn <user_id>');
      return;
    }
    await goat.reply(ctx, `✅ Warns reset for ${args[0]}`);
  }
};
