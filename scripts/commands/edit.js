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
      const fileLink = String(await goat.getInstance().telegram.getFileLink(photoId));
      
      console.log('📸 [EDIT] Image URL obtained:', fileLink.substring(0, 50) + '...');
      
      // Show processing status
      await goat.reply(ctx, '⏳ Processing image with Nano-Banana AI...', { parse_mode: 'Markdown' });

      // Call Nano-Banana API
      const apiUrl = `https://tawsif.is-a.dev/gemini/nano-banana?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(fileLink)}`;
      
      console.log('🔗 [EDIT] Calling API:', apiUrl.substring(0, 100) + '...');
      
      const response = await axios.get(apiUrl, { 
        timeout: 120000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      console.log('📝 [EDIT] API Response Status:', response.status);
      console.log('📝 [EDIT] API Response Data:', JSON.stringify(response.data).substring(0, 300));

      // Handle response - API returns imageUrl directly
      let imageUrl;
      
      if (response.status === 200) {
        // Check different possible response formats
        if (response.data?.imageUrl) {
          imageUrl = response.data.imageUrl;
        } else if (typeof response.data === 'string' && response.data.startsWith('http')) {
          imageUrl = response.data;
        } else if (response.data?.image) {
          imageUrl = response.data.image;
        } else if (response.data?.url) {
          imageUrl = response.data.url;
        } else {
          console.error('❌ [EDIT] Unexpected response format:', response.data);
          await goat.reply(ctx, '❌ API response format not recognized. Try again.', { parse_mode: 'Markdown' });
          return;
        }
      } else {
        console.error('❌ [EDIT] Unexpected status:', response.status);
        await goat.reply(ctx, `❌ API returned status ${response.status}`, { parse_mode: 'Markdown' });
        return;
      }

      if (!imageUrl) {
        await goat.reply(ctx, '❌ API did not return an image URL', { parse_mode: 'Markdown' });
        return;
      }

      console.log('🖼️ [EDIT] Generated image URL:', imageUrl.substring(0, 100) + '...');

      // Download and send processed image
      const imageBuffer = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 60000
      });

      console.log('✅ [EDIT] Image downloaded, size:', imageBuffer.data.length);

      await goat.getInstance().telegram.sendPhoto(
        ctx.chat.id,
        { source: Buffer.from(imageBuffer.data) },
        {
          caption: `✅ Image edited successfully\n\n🎨 Prompt: ${prompt}\n📸 Powered by Nano-Banana AI`,
          reply_to_message_id: ctx.message.message_id
        }
      );

    } catch (error) {
      console.error('❌ [EDIT] Error:', error.message);
      
      if (error.response) {
        console.error('📊 [EDIT] HTTP Status:', error.response.status);
        console.error('📄 [EDIT] Error Response:', JSON.stringify(error.response.data).substring(0, 300));
      } else if (error.code) {
        console.error('❌ [EDIT] Error Code:', error.code);
      }
      
      let errorMsg = '❌ Image processing failed';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMsg = '⏱️ API timeout - try again in a moment';
      } else if (error.code === 'ENOTFOUND') {
        errorMsg = '❌ API service unavailable';
      } else if (error.response?.status === 400) {
        errorMsg = '❌ Invalid image or prompt - try different input';
      } else if (error.response?.status === 404) {
        errorMsg = '❌ Image URL not accessible';
      } else if (error.response?.status === 429) {
        errorMsg = '⚠️ Rate limited - wait a moment and try again';
      } else if (error.response?.status === 500) {
        errorMsg = '⚠️ API server error - try again later';
      }
      
      await goat.reply(ctx, errorMsg, { parse_mode: 'Markdown' });
    }
  }
};
