module.exports = {
  name: 'warntime',
  description: 'Set warn expire time',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /warntime <duration>\nExample: /warntime 7d', { parse_mode: 'Markdown' });
        return;
      }
      const time = args[0];
      await goat.reply(ctx, `✅ Warns will expire after: ${time}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
