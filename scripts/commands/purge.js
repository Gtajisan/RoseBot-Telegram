module.exports = {
  name: 'purge',
  description: 'Delete messages',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    const count = parseInt(args[0]) || 1;
    await goat.reply(ctx, `🗑️ Deleting last ${count} messages...`);
  }
};
