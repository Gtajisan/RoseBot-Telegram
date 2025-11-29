module.exports = {
  name: 'slap',
  description: 'Slap someone',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const target = args[0] || 'you';
    await goat.reply(ctx, `🤚 ${ctx.from.first_name} slaps ${target}!`);
  }
};
