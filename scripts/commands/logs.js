module.exports = {
  name: 'logs',
  description: 'Show admin logs',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    const msg = `*📋 Admin Logs*\n\nNo logs available yet.\n\nLogs track:\n• Ban/kick actions\n• User changes\n• Admin commands`;
    await goat.reply(ctx, msg);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
