module.exports = {
  name: 'filter',
  description: 'Add auto-reply filter',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (args.length < 2) {
      await goat.reply(ctx, '❌ Usage: /filter <trigger> <reply>');
      return;
    }
    const trigger = args[0];
    const reply = args.slice(1).join(' ');
    await goat.reply(ctx, `✅ Filter added:\n"${trigger}" → "${reply}"`);
  }
};
