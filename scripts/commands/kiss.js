module.exports = {
  name: 'kiss',
  description: 'Send kiss',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const target = args[0] || 'everyone';
    await goat.reply(ctx, `😘 ${ctx.from.first_name} sends a kiss to ${target}!`);
  }
};
