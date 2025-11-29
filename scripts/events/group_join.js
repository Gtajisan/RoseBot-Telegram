module.exports = {
  event: 'group_join',
  description: 'Handle bot added to group',

  async execute(ctx, goat, db, config, logger) {
    try {
      if (ctx.chat) {
        await db.addChat(ctx.chat.id, {
          title: ctx.chat.title || 'Unknown',
          type: ctx.chat.type
        });

        const msg = '🌹 *Welcome!*\n\nType /help for commands.';
        await goat.getInstance().telegram.sendMessage(ctx.chat.id, msg, { parse_mode: 'Markdown' });
        logger?.info(`✅ Bot added to chat: ${ctx.chat.title} (${ctx.chat.type})`);
      }
    } catch (error) {
      logger?.error(`Group join error: ${error.message}`);
    }
  }
};
