module.exports = {
  name: 'setwelcome',
  description: 'Set custom welcome message',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    if (!args.length) {
      await goat.reply(ctx, '❌ Usage: /setwelcome <message>\n\nPlaceholders: {first}, {username}, {chatname}', { parse_mode: 'Markdown' });
      return;
    }
    const msg = args.join(' ');
    await goat.reply(ctx, `✅ Welcome message set to:\n${msg}`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
