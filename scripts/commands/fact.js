module.exports = {
  name: 'fact',
  description: 'Random fact',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
    const facts = [
      '🧠 Honey never spoils - archaeologists found 3000-year-old honey still edible!',
      '🦖 T-Rex arms were actually very muscular and could lift 400 pounds each!',
      '🌍 A day on Venus is longer than a year on Venus!',
      '🐙 Octopuses have three hearts!',
      '🦑 Squids have rectangular pupils!'
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    await goat.reply(ctx, fact);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
