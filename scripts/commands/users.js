module.exports = {
  name: 'users',
  description: 'Show user list',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
    const stats = await db.getStats();
    const msg = `*👥 Users*\n\nTotal users: ${stats.users}\nTotal chats: ${stats.chats}\nCommands used: ${stats.commands}`;
    await goat.reply(ctx, msg);
  }

    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
};
