module.exports = {
  name: 'welcome',
  description: 'Toggle welcome messages',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    const action = args[0]?.toLowerCase();
    if (!action || !['on', 'off'].includes(action)) {
      await goat.reply(ctx, '❌ Usage: /welcome <on|off>');
      return;
    }
    await goat.reply(ctx, `✅ Welcome messages turned ${action}`);
  }
};
