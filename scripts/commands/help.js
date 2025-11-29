module.exports = {
  name: 'help',
  description: 'Show all commands',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const commands = ctx.commandHandler.getAll()
      .filter(c => !c.adminOnly || config.configCommands?.owners?.includes(ctx.from.id))
      .map(c => `<b>/${c.name}</b> - ${c.description}`)
      .join('\n');

    await goat.reply(ctx, `<b>📖 Commands</b>\n\n${commands}`);
  }
};
