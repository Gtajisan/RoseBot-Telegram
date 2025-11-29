module.exports = {
  name: 'unpin',
  description: 'Unpin message',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    await goat.reply(ctx, '📌 Message unpinned');
  }
};
