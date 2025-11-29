module.exports = {
  name: 'adminlist',
  description: 'List all admins',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      const msg = `*👨‍💼 Admins in this chat*\n\nOwners: ${config.configCommands?.owners?.join(', ') || 'None'}\n\nUse /promote to add admins`;
      await goat.reply(ctx, msg, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
