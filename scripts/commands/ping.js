module.exports = {
  name: 'ping',
  description: 'Check latency',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const start = Date.now();
    const msg = await goat.reply(ctx, '🏓 Pong!');
    const latency = Date.now() - start;
    await goat.editMessage(ctx.chat.id, msg.message_id, `🏓 Pong! ${latency}ms`);
  }
};
