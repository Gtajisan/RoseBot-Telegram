module.exports = {
  name: 'owner',
  description: 'Show bot owner',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const ownerId = config.configCommands?.owners?.[0] || 'Unknown';
    await goat.reply(ctx, `👤 Owner: <b>${ownerId}</b>`);
  }
};
