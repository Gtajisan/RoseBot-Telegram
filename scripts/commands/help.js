module.exports = {
  name: 'help',
  description: 'Show all commands',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      // Get all commands from the handler
      const commandHandler = ctx.botInstance?.commandHandler || { getAll: () => [] };
      const allCommands = commandHandler.getAll?.() || [];
      
      if (allCommands.length === 0) {
        await goat.reply(ctx, '📖 Commands\n\n(Loading commands...)', { parse_mode: 'Markdown' });
        return;
      }

      const isOwner = config.configCommands?.owners?.includes(ctx.from.id);
      const commands = allCommands
        .filter(c => !c.adminOnly || isOwner)
        .map(c => `*/${c.name}* - ${c.description || 'No description'}`)
        .join('\n');

      const msg = `*📖 Commands*\n\n${commands}`;
      await goat.reply(ctx, msg, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error loading commands: ${error.message}`, { parse_mode: 'Markdown' });
    }
  }
};
