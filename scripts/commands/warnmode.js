module.exports = {
  name: 'warnmode',
  description: 'Set warn mode (ban/kick/mute)',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /warnmode <ban|kick|mute>');
        return;
      }
      const mode = args[0].toLowerCase();
      if (!['ban', 'kick', 'mute'].includes(mode)) {
        await goat.reply(ctx, '❌ Invalid mode. Use: ban, kick, or mute');
        return;
      }
      await goat.reply(ctx, `✅ Warn mode set to: ${mode}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
