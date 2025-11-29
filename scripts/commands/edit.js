module.exports = {
  name: 'edit',
  description: 'Edit bot message',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /edit <text>');
      return;
    }
    const text = args.join(' ');
    if (ctx.message.reply_to_message) {
      try {
        await goat.editMessage(ctx.chat.id, ctx.message.reply_to_message.message_id, text);
      } catch (error) {
        await goat.reply(ctx, '❌ Cannot edit this message');
      }
    } else {
      await goat.reply(ctx, '❌ Reply to a message to edit it');
    }
  }
};
