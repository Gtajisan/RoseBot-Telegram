module.exports = {
  name: 'welcome',
  description: 'Toggle welcome messages',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    const action = args[0]?.toLowerCase();
    if (!action || !['on', 'off'].includes(action)) {
      await goat.reply(ctx, '❌ Usage: /welcome <on|off>', { parse_mode: 'Markdown' });
      return;
    }
    await goat.reply(ctx, `✅ Welcome messages turned ${action}`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
