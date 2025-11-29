module.exports = {
  event: 'group_join',
  description: 'Handle bot added to group',

  async execute(ctx, goat, db, config) {
    if (ctx.chat) {
      await db.addChat(ctx.chat.id, {
        title: ctx.chat.title || 'Unknown',
        type: ctx.chat.type
      });

      await goat.sendMessage(ctx.chat.id, '🌹 <b>Welcome!</b>\n\nType /help for commands.');
    }
  }
};
