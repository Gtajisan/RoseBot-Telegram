module.exports = {
  name: 'quote',
  description: 'Get random quote',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const quotes = [
      '"The only way to do great work is to love what you do." - Steve Jobs',
      '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
      '"Life is what happens when you\'re busy making other plans." - John Lennon',
      '"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt'
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    await goat.reply(ctx, `💬 ${quote}`);
  }
};
