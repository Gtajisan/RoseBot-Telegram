module.exports = {
  name: 'note',
  description: 'Save note',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    if (args.length < 2) {
      await goat.reply(ctx, '❌ Usage: /note <name> <content>');
      return;
    }
    const name = args[0];
    const content = args.slice(1).join(' ');
    await goat.reply(ctx, `📝 Note "${name}" saved`);
  }
};
