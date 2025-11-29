module.exports = {
  name: 'kick',
  description: 'Kick user',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /kick <user_id> [reason]');
      return;
    }
    const userId = args[0];
    const reason = args.slice(1).join(' ') || 'No reason';
    await goat.reply(ctx, `✅ User ${userId} kicked. Reason: ${reason}`);
  }
};
