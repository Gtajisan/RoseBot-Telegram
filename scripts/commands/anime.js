module.exports = {
  name: 'anime',
  description: 'Get anime info',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /anime <name>', { parse_mode: 'Markdown' });
        return;
      }
      const name = args.join(' ');
      await goat.reply(ctx, `🎬 Anime: ${name}\n\nInfo loading...`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
