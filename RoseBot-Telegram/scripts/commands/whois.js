module.exports = {
  name: 'whois',
  description: 'Get user info',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const userId = args[0] || ctx.from.id;
    const user = db.getUser(userId);
    const msg = `👤 <b>User Info</b>\n\nID: <code>${userId}</code>\nName: ${ctx.from.first_name}\nUsername: @${ctx.from.username || 'none'}`;
    await goat.reply(ctx, msg);
  }
};
