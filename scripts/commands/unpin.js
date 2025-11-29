module.exports = {
  name: 'unpin',
  description: 'Unpin message',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      await goat.reply(ctx, '📌 Message unpinned', { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
