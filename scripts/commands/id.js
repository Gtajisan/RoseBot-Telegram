module.exports = {
  name: 'id',
  description: 'Get your Telegram ID',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const msg = `*🆔 IDs*\n\n*Your ID:* \`${ctx.from.id}\`\n*Chat ID:* \`${ctx.chat.id}\``;
    await goat.reply(ctx, msg, { parse_mode: 'Markdown' });
  }
};
