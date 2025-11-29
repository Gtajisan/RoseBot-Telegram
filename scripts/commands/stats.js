module.exports = {
  name: 'stats',
  description: 'Bot statistics',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    const stats = await db.getStats();
    const uptime = Math.floor(process.uptime());
    const memory = process.memoryUsage();

    const info = `<b>📊 Statistics</b>\n\n👥 Users: ${stats.users}\n💬 Chats: ${stats.chats}\n⚙️ Commands: ${stats.commands}\n⏱️ Uptime: ${uptime}s\n💾 Memory: ${Math.round(memory.heapUsed / 1024 / 1024)}MB`;

    await goat.reply(ctx, info);
  }
};
