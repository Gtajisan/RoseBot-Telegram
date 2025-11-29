module.exports = {
  name: 'stats',
  description: 'Bot statistics',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      const stats = await db.getStats();
      const uptime = Math.floor(process.uptime());
      const memory = process.memoryUsage();

      const info = `*📊 Statistics*\n\n👥 Users: ${stats.users}\n💬 Chats: ${stats.chats}\n⚙️ Commands: ${stats.commands}\n⏱️ Uptime: ${uptime}s\n💾 Memory: ${Math.round(memory.heapUsed / 1024 / 1024)}MB`;

      await goat.reply(ctx, info);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
