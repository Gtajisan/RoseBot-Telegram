module.exports = {
  name: 'setgoodbye',
  description: 'Set custom goodbye message',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    if (!args.length) {
      await goat.reply(ctx, '❌ Usage: /setgoodbye <message>', { parse_mode: 'Markdown' });
      return;
    }
    const msg = args.join(' ');
    await goat.reply(ctx, `✅ Goodbye message set to:\n${msg}`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
