module.exports = {
  name: 'joke',
  description: 'Tell a joke',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const jokes = [
      'Why did the bot go to school? To improve its code! 😂',
      'What do you call a programmer from Finland? Nerdic! 🤓',
      'How many programmers does it take to change a lightbulb? None, that\'s a hardware problem! 💡',
      'Why do programmers prefer dark mode? Because light attracts bugs! 🐛'
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await goat.reply(ctx, `😂 ${joke}`);
  }
};
