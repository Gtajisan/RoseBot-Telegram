module.exports = {
  name: 'notes',
  description: 'Show all notes',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    await goat.reply(ctx, '📝 <b>Your Notes</b>\n\nNo notes saved yet');
  }
};
