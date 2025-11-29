module.exports = {
  name: 'locks',
  description: 'Show locked items',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const msg = `<b>🔒 Locked items</b>\n\nCurrently locked:\n• None\n\nUse /lock to add restrictions`;
    await goat.reply(ctx, msg);
  }
};
