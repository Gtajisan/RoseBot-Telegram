module.exports = {
  name: 'manga',
  description: 'Get manga info',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /manga <name>');
      return;
    }
    const name = args.join(' ');
    await goat.reply(ctx, `📚 Manga: ${name}\n\nInfo loading...`);
  }
};
