module.exports = {
  name: 'resetwelcome',
  description: 'Reset welcome message',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      const defaultMsg = 'Welcome to {chatname}! 👋\nHello {first}, nice to meet you!';
      await goat.reply(ctx, `✅ Welcome message reset to default:\n${defaultMsg}`);
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
