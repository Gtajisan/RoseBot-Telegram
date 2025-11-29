
module.exports = {
  name: 'whitelist',
  description: 'Whitelist user management',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      await goat.reply(ctx, `✅ /whitelist command\n\nThis command is available but may need additional setup.\n\nUse /help for more commands.`, { parse_mode: 'Markdown' });
    } catch (error) {
      await commandHelper.handleError(ctx, goat, error, '/whitelist');
    }
  }
};
