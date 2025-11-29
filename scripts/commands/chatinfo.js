module.exports = {
  name: 'chatinfo',
  description: 'Get chat info',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const msg = `💬 <b>Chat Info</b>\n\nChat ID: <code>${ctx.chat.id}</code>\nType: ${ctx.chat.type}\nTitle: ${ctx.chat.title || 'Private'}`;
    await goat.reply(ctx, msg);
  }
};
