module.exports = {
  name: 'admin',
  description: 'Admin panel',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      const panel = `*🔐 Admin Panel*\n\n/ban - Ban user\n/kick - Kick user\n/users - User list\n/stats - Statistics\n/logs - Admin logs`;
      await goat.reply(ctx, panel, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
