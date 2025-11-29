module.exports = {
  name: 'kiss',
  description: 'Send kiss',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
    const target = args[0] || 'everyone';
    await goat.reply(ctx, `😘 ${ctx.from.first_name} sends a kiss to ${target}!`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
