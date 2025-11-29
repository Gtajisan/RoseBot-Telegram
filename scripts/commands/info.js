module.exports = {
  name: 'info',
  description: 'Bot information',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const ver = require('../../versions.json');
    const info = `*🌹 Rose Bot*\n📌 v${ver.version} (Build ${ver.build})\n✨ Telegram Edition\n\n🚀 Framework: Telegraf\n💾 Database: SQLite\n⚡ Commands: 147+`;
    await goat.reply(ctx, info, { parse_mode: 'Markdown' });
  }
};
