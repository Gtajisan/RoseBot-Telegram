module.exports = {
  name: 'lock',
  description: 'Lock message types',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /lock <sticker|photo|video|link|etc>');
      return;
    }
    const item = args[0];
    await goat.reply(ctx, `✅ Locked: ${item}`);
  }
};
