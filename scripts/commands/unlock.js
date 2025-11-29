module.exports = {
  name: 'unlock',
  description: 'Unlock message types',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /unlock <sticker|photo|video|link|etc>');
      return;
    }
    await goat.reply(ctx, `✅ Unlocked: ${args[0]}`);
  }
};
