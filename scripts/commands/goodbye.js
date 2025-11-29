module.exports = {
  name: 'goodbye',
  description: 'Toggle goodbye messages',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    const action = args[0]?.toLowerCase();
    if (!action || !['on', 'off'].includes(action)) {
      await goat.reply(ctx, '❌ Usage: /goodbye <on|off>');
      return;
    }
    await goat.reply(ctx, `✅ Goodbye messages turned ${action}`);
  }
};
