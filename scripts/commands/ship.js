module.exports = {
  name: 'ship',
  description: 'Ship two people',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    if (args.length < 2) {
      await goat.reply(ctx, '❌ Usage: /ship <name1> <name2>');
      return;
    }
    const name1 = args[0];
    const name2 = args[1];
    const percent = Math.floor(Math.random() * 100) + 1;
    await goat.reply(ctx, `💕 ${name1} + ${name2}\nShip level: ${percent}%`);
  }
};
