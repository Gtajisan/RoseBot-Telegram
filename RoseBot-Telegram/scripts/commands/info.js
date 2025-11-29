module.exports = {
  name: 'info',
  description: 'Bot information',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const ver = require('../../versions.json');
    const info = `<b>🌹 Rose Bot</b>\n📌 v${ver.version} (Build ${ver.build})\n✨ Telegram Edition`;
    await goat.reply(ctx, info);
  }
};
