module.exports = {
  name: 'locks',
  description: 'Show locked items',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
    const msg = `*🔒 Locked items*\n\nCurrently locked:\n• None\n\nUse /lock to add restrictions`;
    await goat.reply(ctx, msg);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
