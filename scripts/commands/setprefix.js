module.exports = {
  name: 'setprefix',
  description: 'Set command prefix',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /setprefix <prefix>\nExample: /setprefix !', { parse_mode: 'Markdown' });
        return;
      }
      const newPrefix = args[0];
      config.bot.prefix = newPrefix;
      await goat.reply(ctx, `✅ Prefix changed to: ${newPrefix}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
