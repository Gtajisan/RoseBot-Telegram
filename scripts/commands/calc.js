module.exports = {
  name: 'calc',
  description: 'Calculator',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /calc <math expression>\n\nExample: /calc 2+2*5', { parse_mode: 'Markdown' });
      return;
    }
    try {
      const expr = args.join('');
      const result = eval(expr);
      await goat.reply(ctx, `🧮 ${expr} = *${result}*`);
    } catch (error) {
      await goat.reply(ctx, '❌ Invalid math expression', { parse_mode: 'Markdown' });
    }
  }
};
