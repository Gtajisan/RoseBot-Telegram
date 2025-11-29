const axios = require('axios');

module.exports = {
  name: 'meme',
  description: 'Get random meme image',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      const loading = await goat.reply(ctx, '⏳ Finding meme...');
      
      const response = await axios.get('https://api.imgflip.com/get_memes');
      if (response.data?.data?.memes && response.data.data.memes.length > 0) {
        const randomMeme = response.data.data.memes[Math.floor(Math.random() * response.data.data.memes.length)];
        await ctx.replyWithPhoto(randomMeme.url, { caption: `😂 ${randomMeme.name}` });
        try { await goat.deleteMessage(ctx.chat.id, loading.message_id); } catch (e) {}
      } else {
        await goat.reply(ctx, '❌ Could not fetch meme');
      }
    } catch (error) {
      await goat.reply(ctx, '❌ Error fetching meme');
    }
  }
};
