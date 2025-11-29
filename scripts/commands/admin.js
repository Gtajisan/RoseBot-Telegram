module.exports = {
  name: 'admin',
  description: 'Admin panel',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    const panel = `<b>🔐 Admin Panel</b>\n\n/ban - Ban user\n/kick - Kick user\n/users - User list\n/stats - Statistics\n/logs - Admin logs`;
    await goat.reply(ctx, panel);
  }
};
