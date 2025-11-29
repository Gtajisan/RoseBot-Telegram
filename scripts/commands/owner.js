module.exports = {
  name: 'owner',
  description: 'Show bot owner',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      const ownerId = config.configCommands?.owners?.[0] || 'Unknown';
      await goat.reply(ctx, `👤 Owner: *${ownerId}*`, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
