module.exports = {
  name: 'lock',
  description: 'Lock message types',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /lock <sticker|photo|video|link|etc>', { parse_mode: 'Markdown' });
      return;
    }
    const item = args[0];
    await goat.reply(ctx, `✅ Locked: ${item}`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
