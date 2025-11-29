
module.exports = {
  name: 'weather',
  description: 'Get weather information',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      await goat.reply(ctx, `✅ /weather command\n\nThis command is available but may need additional setup.\n\nUse /help for more commands.`, { parse_mode: 'Markdown' });
    } catch (error) {
      await commandHelper.handleError(ctx, goat, error, '/weather');
    }
  }
};
