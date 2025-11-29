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
      
      logger.info('EDIT', 'Image URL obtained');
      
      // Show processing status
      await goat.reply(ctx, '⏳ Processing image with Nano-Banana AI...', { parse_mode: 'Markdown' });

      // Call Nano-Banana API
      const apiUrl = `https://tawsif.is-a.dev/gemini/nano-banana?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(fileLink)}`;
      
      logger.debug('EDIT', 'API call', { apiUrl: apiUrl.substring(0, 80) });
      
      const response = await axios.get(apiUrl, { 
        timeout: 120000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        validateStatus: () => true
      });

      logger.info('EDIT', 'API Response received', { status: response.status });
      
      const fullResponse = response.data;
      logger.debug('EDIT', 'API response data', { response: JSON.stringify(fullResponse).substring(0, 200) });

      // Check if API returned a success flag
      if (fullResponse?.success === false) {
        logger.error('EDIT', new Error(fullResponse?.error || 'API returned success=false'), {});
        await goat.reply(ctx, `❌ Image processing failed: ${fullResponse?.error || 'Unknown error'}. Try with a clearer prompt or image.`, { parse_mode: 'Markdown' });
        return;
      }

      // Extract image URL from various possible response formats
      let imageUrl = null;

      if (response.status === 200) {
        // Method 1: Check for imageUrl property
        if (typeof fullResponse === 'object' && fullResponse?.imageUrl) {
          imageUrl = fullResponse.imageUrl;
          logger.debug('EDIT', 'Found URL in imageUrl property');
        }
        // Method 2: Check if entire response is a URL string
        else if (typeof fullResponse === 'string') {
          if (fullResponse.startsWith('http')) {
            imageUrl = fullResponse;
            logger.debug('EDIT', 'Response is direct URL');
          } else {
            try {
              const parsed = JSON.parse(fullResponse);
              imageUrl = parsed.imageUrl || parsed.image || parsed.url || parsed.data;
              logger.debug('EDIT', 'Parsed JSON string response');
            } catch (e) {
              logger.error('EDIT', e, {});
            }
          }
        }
        // Method 3: Check other common property names
        else if (typeof fullResponse === 'object') {
          imageUrl = fullResponse.image || fullResponse.url || fullResponse.result || fullResponse.data?.imageUrl || fullResponse.data?.image || fullResponse.data?.url;
          if (imageUrl) {
            logger.debug('EDIT', 'Found URL in alternative property');
          }
        }
        // Method 4: Regex extraction from entire response
        if (!imageUrl) {
          const jsonStr = JSON.stringify(fullResponse);
          const urlMatch = jsonStr.match(/https?:\/\/[^\s"<>]+/);
          if (urlMatch) {
            imageUrl = urlMatch[0];
            logger.debug('EDIT', 'Extracted URL from response string');
          }
        }
      }

      if (!imageUrl) {
        logger.error('EDIT', new Error('No image URL found in response'), { response: JSON.stringify(fullResponse).substring(0, 300) });
        await goat.reply(ctx, '❌ API did not return an image. Try a different prompt or image.', { parse_mode: 'Markdown' });
        return;
      }

      // Validate URL format
      if (!imageUrl.startsWith('http')) {
        logger.error('EDIT', new Error('Invalid image URL format'), { imageUrl });
        await goat.reply(ctx, '❌ Received invalid image URL from API.', { parse_mode: 'Markdown' });
        return;
      }

      logger.info('EDIT', 'Downloading image', { urlLength: imageUrl.length });

      // Download and send processed image
      const imageBuffer = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 60000
      });

      logger.info('EDIT', 'Image downloaded successfully', { size: imageBuffer.data.length });

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
      } else if (error.response?.status === 400) {
        errorMsg = '❌ Invalid image or prompt - try different input';
      } else if (error.response?.status === 404) {
        errorMsg = '❌ Image URL not accessible';
      } else if (error.response?.status === 429) {
        errorMsg = '⚠️ Rate limited - wait a moment and try again';
      } else if (error.response?.status === 500) {
        errorMsg = '⚠️ API server error - try again later';
      } else if (error.message.includes('arraybuffer')) {
        errorMsg = '❌ Failed to download processed image';
      }
      
      await goat.reply(ctx, errorMsg, { parse_mode: 'Markdown' });
    }
  }
};
