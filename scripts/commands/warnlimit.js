module.exports = {
  name: 'warnlimit',
  description: 'Set warn limit',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /warnlimit <number>\nExample: /warnlimit 5');
        return;
      }
      const limit = parseInt(args[0]);
      if (isNaN(limit) || limit < 1) {
        await goat.reply(ctx, '❌ Warn limit must be a positive number');
        return;
      }
      await goat.reply(ctx, `✅ Warn limit set to: ${limit} warns`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
