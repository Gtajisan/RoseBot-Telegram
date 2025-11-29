module.exports = {
  name: 'anime',
  description: 'Get anime info',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /anime <name>');
      return;
    }
    const name = args.join(' ');
    await goat.reply(ctx, `🎬 Anime: ${name}\n\nInfo loading...`);
  }
};
