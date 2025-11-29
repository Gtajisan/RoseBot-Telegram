module.exports = {
  name: 'afk',
  description: 'Set AFK status',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
    const reason = args.join(' ') || 'AFK';
    const msg = `💤 ${ctx.from.first_name} is now AFK\nReason: ${reason}`;
    await goat.reply(ctx, msg);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
