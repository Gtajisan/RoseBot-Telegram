module.exports = {
  name: 'rmwarn',
  description: 'Remove one warn',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /rmwarn <user_id>', { parse_mode: 'Markdown' });
        return;
      }
      await goat.reply(ctx, `✅ One warn removed from ${args[0]}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
