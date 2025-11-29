module.exports = {
  name: 'menu',
  description: 'Show command menu',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
    const menu = `*🎯 Rose Bot Menu*\n\n*📖 Info*\n/info - Bot info\n/owner - Show owner\n/ping - Check speed\n\n*👥 Group*\n/admin - Admin panel\n/stats - Statistics\n/users - User list\n\n*🎮 Fun*\n/joke - Random joke\n/fact - Random fact\n\n*⚙️ System*\n/uptime - Bot uptime\n/help - All commands`;
    await goat.reply(ctx, menu);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
