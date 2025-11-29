module.exports = {
  name: 'resetgoodbye',
  description: 'Reset goodbye message',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      const defaultMsg = 'Goodbye {first}! 👋';
      await goat.reply(ctx, `✅ Goodbye message reset to default:\n${defaultMsg}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
