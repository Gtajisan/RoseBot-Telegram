module.exports = {
  name: 'uptime',
  description: 'Show bot uptime',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const uptime = Math.floor(process.uptime());
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = uptime % 60;

    const str = days > 0 ? `${days}d ${hours}h ${mins}m ${secs}s` : `${hours}h ${mins}m ${secs}s`;
    await goat.reply(ctx, `⏱️ Uptime: <b>${str}</b>`);
  }
};
