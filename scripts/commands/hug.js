module.exports = {
  name: 'hug',
  description: 'Give hug',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
    const user = ctx.from.first_name;
    await goat.reply(ctx, `🤗 ${user} sends a warm hug!`);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
