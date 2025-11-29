module.exports = {
  name: 'id',
  description: 'Get ID',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const msg = `<b>🆔 IDs</b>\n\nYour ID: <code>${ctx.from.id}</code>\nChat ID: <code>${ctx.chat.id}</code>`;
    await goat.reply(ctx, msg);
  }
};
