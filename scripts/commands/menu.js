module.exports = {
  name: 'menu',
  description: 'Show command menu',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const menu = `<b>🎯 Rose Bot Menu</b>\n\n<b>📖 Info</b>\n/info - Bot info\n/owner - Show owner\n/ping - Check speed\n\n<b>👥 Group</b>\n/admin - Admin panel\n/stats - Statistics\n/users - User list\n\n<b>🎮 Fun</b>\n/joke - Random joke\n/fact - Random fact\n\n<b>⚙️ System</b>\n/uptime - Bot uptime\n/help - All commands`;
    await goat.reply(ctx, menu);
  }
};
