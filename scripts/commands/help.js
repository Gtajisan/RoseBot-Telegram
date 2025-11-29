module.exports = {
  name: 'help',
  description: 'Show all commands',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      // Get all commands from the handler (attached to ctx in index.js)
      const commandHandler = ctx.commandHandler || { getAll: () => [] };
      const allCommands = commandHandler.getAll?.() || [];
      
      if (allCommands.length === 0) {
        await goat.reply(ctx, '📖 Commands loading...', { parse_mode: 'Markdown' });
        return;
      }

      const isOwner = config.configCommands?.owners?.includes(ctx.from.id);
      let msg = `*📖 Commands (${allCommands.length} total)*\n\n`;
      
      // Split into chunks for readability
      const commands = allCommands
        .filter(c => !c.adminOnly || isOwner)
        .map(c => `*/${c.name}* - ${c.description || 'No description'}`)
        .slice(0, 50) // Limit to 50 per message
        .join('\n');

      msg += commands;
      if (allCommands.length > 50) {
        msg += `\n\n... and ${allCommands.length - 50} more commands. Use /search <keyword> to find specific commands.`;
      }

      await goat.reply(ctx, msg, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error loading commands: ${error.message}`, { parse_mode: 'Markdown' });
    }
  }
};
