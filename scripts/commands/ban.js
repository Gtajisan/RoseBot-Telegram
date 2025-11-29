module.exports = {
  name: 'ban',
  description: 'Ban user',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    if (!args[0]) {
      await goat.reply(ctx, '❌ Usage: /ban <user_id> [reason]');
      return;
    }
    const userId = args[0];
    const reason = args.slice(1).join(' ') || 'No reason';
    await goat.reply(ctx, `✅ User ${userId} banned. Reason: ${reason}`);
  }
};
