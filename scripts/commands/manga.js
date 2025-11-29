module.exports = {
  name: 'manga',
  description: 'Get manga info',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /manga <name>', { parse_mode: 'Markdown' });
      return;
    }
    const name = args.join(' ');
    await goat.reply(ctx, `📚 Manga: ${name}\n\nInfo loading...`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
