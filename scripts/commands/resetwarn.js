module.exports = {
  name: 'resetwarn',
  description: 'Reset user warns',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /resetwarn <user_id>', { parse_mode: 'Markdown' });
        return;
      }
      await goat.reply(ctx, `✅ Warns reset for ${args[0]}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
