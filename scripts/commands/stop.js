module.exports = {
  name: 'stop',
  description: 'Remove filter',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /stop <trigger>', { parse_mode: 'Markdown' });
        return;
      }
      await goat.reply(ctx, `✅ Filter "${args[0]}" removed`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
