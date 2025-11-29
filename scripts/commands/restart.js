module.exports = {
  name: 'restart',
  description: 'Command',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    await goat.reply(ctx, `✅ /restart command\n\nThis command is available but may need additional setup.\n\nUse /help for more commands.`, { parse_mode: 'Markdown' });
  }
};