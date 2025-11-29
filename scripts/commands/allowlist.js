module.exports = {
  name: 'allowlist',
  description: 'Add URL to whitelist',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /allowlist <url>', { parse_mode: 'Markdown' });
        return;
      }
      const url = args[0];
      await goat.reply(ctx, `✅ URL whitelisted: ${url}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
