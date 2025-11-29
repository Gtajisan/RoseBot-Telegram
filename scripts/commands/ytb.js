
module.exports = {
  name: 'ytb',
  description: 'YouTube related commands',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      await goat.reply(ctx, `✅ /ytb command\n\nThis command is available but may need additional setup.\n\nUse /help for more commands.`, { parse_mode: 'Markdown' });
    } catch (error) {
      await commandHelper.handleError(ctx, goat, error, '/ytb');
    }
  }
};
