module.exports = {
  name: 'filter',
  description: 'Add auto-reply filter',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    if (args.length < 2) {
      await goat.reply(ctx, '❌ Usage: /filter <trigger> <reply>', { parse_mode: 'Markdown' });
      return;
    }
    const trigger = args[0];
    const reply = args.slice(1).join(' ');
    await goat.reply(ctx, `✅ Filter added:\n"${trigger}" → "${reply}"`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
