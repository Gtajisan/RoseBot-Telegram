module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const start = Date.now();
    const msg = await goat.reply(ctx, '🏓 Pong!');
    const latency = Date.now() - start;
    await goat.getInstance().telegram.editMessageText(ctx.chat.id, msg.message_id, null, `🏓 *Pong!*\n⏱️ Latency: \`${latency}ms\``, { parse_mode: 'Markdown' }).catch(() => {});
  }
};
