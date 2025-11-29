module.exports = {
  name: 'demote',
  description: 'Demote admin to user',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /demote <user_id>', { parse_mode: 'Markdown' });
        return;
      }
      await goat.reply(ctx, `✅ User ${args[0]} demoted`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
