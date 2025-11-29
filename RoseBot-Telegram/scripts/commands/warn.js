module.exports = {
  name: 'warn',
  description: 'Warn user',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /warn <user_id> [reason]');
      return;
    }
    const reason = args.slice(1).join(' ') || 'No reason';
    await goat.reply(ctx, `⚠️ User ${args[0]} warned.\nReason: ${reason}`);
  }
};
