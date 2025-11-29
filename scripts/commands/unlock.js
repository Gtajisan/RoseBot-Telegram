module.exports = {
  name: 'unlock',
  description: 'Unlock message types',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /unlock <sticker|photo|video|link|etc>', { parse_mode: 'Markdown' });
        return;
      }
      await goat.reply(ctx, `✅ Unlocked: ${args[0]}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
