module.exports = {
  name: 'mute',
  description: 'Mute user',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /mute <user_id> [time]');
      return;
    }
    const time = args[1] || 'indefinitely';
    await goat.reply(ctx, `✅ User ${args[0]} muted for ${time}`);
  }
};
