module.exports = {
  name: 'start',
  description: 'Welcome message',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const user = ctx.from.first_name || 'User';
    const msg = `🌹 <b>Welcome ${user}!</b>\n\nI'm Rose Bot - Professional Telegram bot with:\n✅ Modular commands\n✅ Admin management\n✅ Statistics tracking\n✅ Anti-spam protection\n\nUse /help to explore!`;
    await goat.reply(ctx, msg);
  }
};
