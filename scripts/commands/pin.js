module.exports = {
  name: 'pin',
  description: 'Pin message',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!ctx.message.reply_to_message) {
      await goat.reply(ctx, '❌ Reply to a message to pin it');
      return;
    }
    await goat.reply(ctx, '📌 Message pinned');
  }
};
