module.exports = {
  name: 'unmute',
  description: 'Unmute user',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /unmute <user_id>');
      return;
    }
    await goat.reply(ctx, `✅ User ${args[0]} unmuted`);
  }
};
