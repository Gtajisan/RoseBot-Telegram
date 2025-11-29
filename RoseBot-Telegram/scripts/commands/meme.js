module.exports = {
  name: 'meme',
  description: 'Get random meme',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    await goat.reply(ctx, '😂 Here\'s a random meme...\n\n(Meme API loading...)');
  }
};
