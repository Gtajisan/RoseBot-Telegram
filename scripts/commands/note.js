module.exports = {
  name: 'note',
  description: 'Save note',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      if (args.length < 2) {
        await goat.reply(ctx, '❌ Usage: /note <name> <content>');
        return;
      }
      
      const name = args[0];
      const content = args.slice(1).join(' ');
      
      // Save to database
      await db.run(`
        INSERT INTO notes (user_id, name, content, created_at)
        VALUES (?, ?, ?, ?)
      `, [ctx.from.id, name, content, Date.now()]);

      await goat.reply(ctx, `📝 *Note saved*\n📌 Name: \`${name}\`\n💬 Content: ${content}`, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
