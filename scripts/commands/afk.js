module.exports = {
  name: 'afk',
  description: 'Set AFK status',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const reason = args.join(' ') || 'AFK';
    const msg = `💤 ${ctx.from.first_name} is now AFK\nReason: ${reason}`;
    await goat.reply(ctx, msg);
  }
};
