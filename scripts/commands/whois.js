module.exports = {
  name: 'whois',
  description: 'Get user information (alias for userinfo)',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const userInfoCmd = require('./userinfo.js');
    await userInfoCmd.execute(ctx, args, db, config, goat);
  }
};
