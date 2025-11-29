module.exports = {
  name: 'notes',
  description: 'Show all notes',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      await goat.reply(ctx, '📝 *Your Notes*\n\nNo notes saved yet', { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
