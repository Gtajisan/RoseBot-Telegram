module.exports = {
  name: 'setwelcome',
  description: 'Set custom welcome message',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args.length) {
      await goat.reply(ctx, '❌ Usage: /setwelcome <message>\n\nPlaceholders: {first}, {username}, {chatname}');
      return;
    }
    const msg = args.join(' ');
    await goat.reply(ctx, `✅ Welcome message set to:\n${msg}`);
  }
};
