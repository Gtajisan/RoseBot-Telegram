module.exports = {
  event: 'message',
  description: 'Handle messages',

  async execute(ctx, goat, db, config) {
    const user = ctx.from;
    if (user) {
      db.addUser(user.id, {
        username: user.username || 'unknown',
        first_name: user.first_name || ''
      });
    }
  }
};
