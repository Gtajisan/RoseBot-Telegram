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
    const bar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10));
    const msg = `💕 *Ship Compatibility*\n\n${name1} + ${name2}\n\n${bar} ${percent}%`;
    await goat.reply(ctx, msg, { parse_mode: 'Markdown' });
  }
};
