module.exports = {
  name: 'waifu',
  description: 'Get random waifu',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    await goat.reply(ctx, '🌸 Here\'s a random waifu...\n\n(Image would load from API)');
  }
};
