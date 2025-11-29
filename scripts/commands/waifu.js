const axios = require('axios');

module.exports = {
  name: 'waifu',
  description: 'Get random waifu image',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      const loading = await goat.reply(ctx, '⏳ Fetching waifu...');
      
      const response = await axios.get('https://api.waifu.pics/random/waifu');
      if (response.data?.url) {
        await ctx.replyWithPhoto(response.data.url, { caption: '🌸 Random Waifu' });
        try { await goat.deleteMessage(ctx.chat.id, loading.message_id); } catch (e) {}
      } else {
        await goat.reply(ctx, '❌ Could not fetch waifu');
      }
    } catch (error) {
      await goat.reply(ctx, '❌ Error fetching waifu');
    }
  }
};
