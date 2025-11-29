const axios = require('axios');
const { OpenAI } = require('openai');

module.exports = {
  name: 'edit',
  description: 'Generate AI images using DALL-E',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const prompt = args.join(' ');
    const repliedMsg = ctx.message.reply_to_message;

    // Validate reply to image
    if (!repliedMsg) {
      await goat.reply(ctx, '❌ Reply to an image to edit it\n\n📝 Usage: /edit <prompt>', { parse_mode: 'Markdown' });
      return;
    }

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
      // Show processing status
      const processingMsg = await goat.reply(ctx, '⏳ Generating image with DALL-E...', { parse_mode: 'Markdown' });

      // Check if OpenAI API key is set
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        await goat.reply(ctx, '❌ OpenAI API key not configured', { parse_mode: 'Markdown' });
        return;
      }

      // Initialize OpenAI client
      const client = new OpenAI({ apiKey });

      // Generate image using DALL-E 3
      const imageResponse = await client.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url'
      });

      if (!imageResponse.data || !imageResponse.data[0] || !imageResponse.data[0].url) {
        await goat.reply(ctx, '❌ Failed to generate image', { parse_mode: 'Markdown' });
        return;
      }

      // Get the generated image URL
      const generatedImageUrl = imageResponse.data[0].url;

      // Download the image
      const imageBuffer = await axios.get(generatedImageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });

      // Send the generated image to Telegram
      await goat.getInstance().telegram.sendPhoto(
        ctx.chat.id,
        { source: Buffer.from(imageBuffer.data) },
        {
          caption: `✅ Image generated successfully\n\n🎨 *Prompt:* ${prompt}\n📸 Powered by DALL-E 3`,
          reply_to_message_id: ctx.message.message_id,
          parse_mode: 'Markdown'
        }
      );

    } catch (error) {
      console.error('Edit command error:', error.message);
      
      // Provide helpful error messages
      let errorMsg = '❌ Image generation failed';
      if (error.message.includes('400')) {
        errorMsg = '❌ Invalid prompt - try a different description';
      } else if (error.message.includes('429')) {
        errorMsg = '⏱️ Rate limited - please try again in a moment';
      } else if (error.message.includes('timeout')) {
        errorMsg = '⏱️ Request timed out - try again';
      }
      
      await goat.reply(ctx, errorMsg, { parse_mode: 'Markdown' });
    }
  }
};
