module.exports = {
  name: 'dwarn',
  description: 'Warn and delete message',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!ctx.message.reply_to_message) {
        await goat.reply(ctx, '❌ Reply to a message to warn user');
        return;
      }
      const userId = ctx.message.reply_to_message.from.id;
      const reason = args.join(' ') || 'No reason';
      
      await goat.deleteMessage(ctx.chat.id, ctx.message.reply_to_message.message_id);
      await goat.reply(ctx, `⚠️ User ${userId} warned for: ${reason}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
