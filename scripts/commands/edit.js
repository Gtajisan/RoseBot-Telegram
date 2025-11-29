const axios = require('axios');
const logger = require('../../utils/logger');

module.exports = {
  name: 'edit',
  description: 'Edit images using Nano-Banana AI',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const prompt = args.join(' ');
    const repliedMsg = ctx.message.reply_to_message;

    if (!repliedMsg) {
      await goat.reply(ctx, '❌ Reply to an image to edit it\n\n📝 Usage: /edit <prompt>', { parse_mode: 'Markdown' });
      return;
    }

    if (!repliedMsg.photo) {
      await goat.reply(ctx, '❌ Reply to an image', { parse_mode: 'Markdown' });
      return;
    }

    if (!prompt) {
      await goat.reply(ctx, '❌ Provide a prompt\n\n📝 Usage: /edit <prompt>', { parse_mode: 'Markdown' });
      return;
    }

    try {
      const photoId = repliedMsg.photo[repliedMsg.photo.length - 1].file_id;
      const fileLink = String(await goat.getInstance().telegram.getFileLink(photoId));
      
      await goat.reply(ctx, '⏳ Processing image with Nano-Banana AI...', { parse_mode: 'Markdown' });

      const apiUrl = `https://tawsif.is-a.dev/gemini/nano-banana?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(fileLink)}`;
      
      const response = await axios.get(apiUrl, { 
        timeout: 120000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        validateStatus: () => true
      });

      const data = response.data;
      logger.info('EDIT', 'API Response', { status: response.status, data: JSON.stringify(data).substring(0, 200) });

      // Check if API returned error
      if (data?.success === false || data?.error) {
        const errorMsg = data?.error || 'Image processing failed';
        logger.error('EDIT', new Error(errorMsg), {});
        await goat.reply(ctx, `❌ API Error: ${errorMsg}\n\nTry with a different image or prompt.`, { parse_mode: 'Markdown' });
        return;
      }

      // Extract image URL
      let imageUrl = null;

      if (typeof data === 'string' && data.startsWith('http')) {
        imageUrl = data;
      } else if (data?.imageUrl) {
        imageUrl = data.imageUrl;
      } else if (data?.image) {
        imageUrl = data.image;
      } else if (data?.url) {
        imageUrl = data.url;
      } else {
        const jsonStr = JSON.stringify(data);
        const match = jsonStr.match(/https?:\/\/[^\s"<>]+/);
        if (match) {
          imageUrl = match[0];
        }
      }

      if (!imageUrl) {
        logger.error('EDIT', new Error('No URL in response'), { response: JSON.stringify(data) });
        await goat.reply(ctx, '❌ API did not return an image URL. The service may be temporarily unavailable.', { parse_mode: 'Markdown' });
        return;
      }

      logger.info('EDIT', 'Image URL extracted', { url: imageUrl.substring(0, 80) });

      // Download image
      const imageBuffer = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 60000
      });

      logger.info('EDIT', 'Image downloaded', { size: imageBuffer.data.length });

      // Send to Telegram
      await goat.getInstance().telegram.sendPhoto(
        ctx.chat.id,
        { source: Buffer.from(imageBuffer.data) },
        {
          caption: `✅ Image edited successfully\n\n🎨 Prompt: ${prompt}\n📸 Powered by Nano-Banana AI`,
          reply_to_message_id: ctx.message.message_id
        }
      );

    } catch (error) {
      logger.error('EDIT', error, { message: error.message });
      
      let errorMsg = '❌ Image processing failed';
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMsg = '⏱️ API timeout - try again in a moment';
      } else if (error.code === 'ENOTFOUND') {
        errorMsg = '❌ API service unavailable';
      } else if (error.message.includes('404')) {
        errorMsg = '❌ Image not accessible';
      }
      
      await goat.reply(ctx, errorMsg, { parse_mode: 'Markdown' });
    }
  }
};
