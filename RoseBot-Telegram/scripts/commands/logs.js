module.exports = {
  name: 'logs',
  description: 'Show admin logs',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    const msg = `<b>📋 Admin Logs</b>\n\nNo logs available yet.\n\nLogs track:\n• Ban/kick actions\n• User changes\n• Admin commands`;
    await goat.reply(ctx, msg);
  }
};
