module.exports = {
  name: 'translate',
  description: 'Translate text',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    if (args.length < 2) {
      await goat.reply(ctx, '❌ Usage: /translate <lang> <text>');
      return;
    }
    const lang = args[0];
    const text = args.slice(1).join(' ');
    const msg = `🌐 *Translation to ${lang}*\n\n\`${text}\`\n\n⏳ Translation service: Coming soon`;
    await goat.reply(ctx, msg, { parse_mode: 'Markdown' });
  }
};
