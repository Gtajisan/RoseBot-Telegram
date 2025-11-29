module.exports = {
  name: 'pin',
  description: 'Pin message',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    if (!ctx.message.reply_to_message) {
      await goat.reply(ctx, '❌ Reply to a message to pin it', { parse_mode: 'Markdown' });
      return;
    }
    await goat.reply(ctx, '📌 Message pinned', { parse_mode: 'Markdown' });
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
