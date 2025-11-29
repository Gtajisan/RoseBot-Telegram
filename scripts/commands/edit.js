const axios = require('axios');

module.exports = {
  name: 'edit',
  description: 'Edit images using Nano-Banana AI',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const prompt = args.join(' ');
    const repliedMsg = ctx.message.reply_to_message;

    // Validate reply
    if (!repliedMsg) {
      await goat.reply(ctx, '❌ Reply to an image to edit it\n\n📝 Usage: /edit <prompt>', { parse_mode: 'Markdown' });
      return;
    }

    // Check if reply is image
    if (!repliedMsg.photo) {
      await goat.reply(ctx, '❌ Reply to an image', { parse_mode: 'Markdown' });
      return;
    }

    // Check if prompt provided
    if (!prompt) {
      await goat.reply(ctx, '❌ Provide a prompt\n\n📝 Usage: /edit <prompt>', { parse_mode: 'Markdown' });
      return;
    }

    try {
      // Get image URL
      const photoId = repliedMsg.photo[repliedMsg.photo.length - 1].file_id;
      const fileLink = await goat.getInstance().telegram.getFileLink(photoId);
      
      // Show processing status
      await goat.reply(ctx, '⏳ Processing image with Nano-Banana AI...', { parse_mode: 'Markdown' });

      // Call Nano-Banana API
      const apiUrl = `https://tawsif.is-a.dev/gemini/nano-banana?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(fileLink)}`;
      
      const response = await axios.get(apiUrl, { 
        timeout: 60000,
        headers: {
          'User-Agent': 'RoseBot-Telegram'
        }
      });

      if (!response.data || !response.data.imageUrl) {
        await goat.reply(ctx, '❌ Failed to process image', { parse_mode: 'Markdown' });
        return;
      }

      // Download and send processed image
      const imageBuffer = await axios.get(response.data.imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });

      await goat.getInstance().telegram.sendPhoto(
        ctx.chat.id,
        { source: Buffer.from(imageBuffer.data) },
        {
          caption: `✅ Image edited successfully\n\n🎨 Prompt: ${prompt}\n📸 Powered by Nano-Banana AI`,
          reply_to_message_id: ctx.message.message_id
        }
      );

    } catch (error) {
      console.error('Edit command error:', error.message);
      
      let errorMsg = '❌ Image processing failed';
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMsg = '⏱️ Request timed out - API is slow. Try again in a moment.';
      } else if (error.message.includes('404')) {
        errorMsg = '❌ Image URL invalid';
      } else if (error.message.includes('500')) {
        errorMsg = '⚠️ AI service error - try again later';
      }
      
      await goat.reply(ctx, errorMsg, { parse_mode: 'Markdown' });
    }
  }
};
