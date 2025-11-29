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
      
      console.log('📸 Image URL obtained:', fileLink.substring(0, 50) + '...');
      
      // Show processing status
      await goat.reply(ctx, '⏳ Processing image with Nano-Banana AI...', { parse_mode: 'Markdown' });

      // Call Nano-Banana API
      const apiUrl = `https://tawsif.is-a.dev/gemini/nano-banana?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(fileLink)}`;
      
      console.log('🔗 API URL:', apiUrl.substring(0, 80) + '...');
      
      const response = await axios.get(apiUrl, { 
        timeout: 60000,
        headers: {
          'User-Agent': 'RoseBot-Telegram'
        }
      });

      console.log('📝 API Response:', JSON.stringify(response.data).substring(0, 200));

      // Check response - handle different formats
      let imageUrl;
      if (response.data && response.data.imageUrl) {
        imageUrl = response.data.imageUrl;
      } else if (response.data && typeof response.data === 'string' && response.data.includes('http')) {
        imageUrl = response.data;
      } else {
        console.error('❌ Invalid response format:', response.data);
        await goat.reply(ctx, '❌ API returned invalid response format', { parse_mode: 'Markdown' });
        return;
      }

      console.log('🖼️ Generated image URL:', imageUrl.substring(0, 80) + '...');

      // Download and send processed image
      const imageBuffer = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });

      console.log('✅ Image downloaded, size:', imageBuffer.data.length);

      await goat.getInstance().telegram.sendPhoto(
        ctx.chat.id,
        { source: Buffer.from(imageBuffer.data) },
        {
          caption: `✅ Image edited successfully\n\n🎨 Prompt: ${prompt}\n📸 Powered by Nano-Banana AI`,
          reply_to_message_id: ctx.message.message_id
        }
      );

    } catch (error) {
      console.error('❌ Edit command error:', error.message);
      
      if (error.response) {
        console.error('📊 API Status:', error.response.status);
        console.error('📄 API Response:', JSON.stringify(error.response.data).substring(0, 200));
      }
      
      let errorMsg = '❌ Image processing failed';
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMsg = '⏱️ Request timed out - API is slow. Try again in a moment.';
      } else if (error.response?.status === 404) {
        errorMsg = '❌ Image URL invalid';
      } else if (error.response?.status === 500) {
        errorMsg = '⚠️ AI service error - try again later';
      }
      
      await goat.reply(ctx, errorMsg, { parse_mode: 'Markdown' });
    }
  }
};
