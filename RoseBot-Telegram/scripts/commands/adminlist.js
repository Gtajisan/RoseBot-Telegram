module.exports = {
  name: 'adminlist',
  description: 'List all admins',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const msg = `<b>👨‍💼 Admins in this chat</b>\n\nOwners: ${config.configCommands?.owners?.join(', ') || 'None'}\n\nUse /promote to add admins`;
    await goat.reply(ctx, msg);
  }
};
