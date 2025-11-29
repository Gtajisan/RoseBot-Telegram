module.exports = {
  name: 'setgoodbye',
  description: 'Set custom goodbye message',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args.length) {
      await goat.reply(ctx, '❌ Usage: /setgoodbye <message>');
      return;
    }
    const msg = args.join(' ');
    await goat.reply(ctx, `✅ Goodbye message set to:\n${msg}`);
  }
};
