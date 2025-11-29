module.exports = {
  name: 'unpin',
  description: 'Unpin message',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    await goat.reply(ctx, '📌 Message unpinned');
  }
};
