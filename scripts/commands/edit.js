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
      await goat.reply(ctx, '❌ Reply to an image to edit it\n\n📝 Usage: /edit <prompt>');
      return;
    }

    // Check if reply is image
    if (!repliedMsg.photo) {
      await goat.reply(ctx, '❌ Reply to an image');
      return;
    }

    // Check if prompt provided
    if (!prompt) {
      await goat.reply(ctx, '❌ Provide a prompt\n\n📝 Usage: /edit <prompt>');
      return;
    }

    try {
      // Get image URL
      const photoId = repliedMsg.photo[repliedMsg.photo.length - 1].file_id;
      const fileLink = await goat.getInstance().telegram.getFileLink(photoId);
      
      // Show processing status
      await goat.reply(ctx, '⏳ Processing image with Nano-Banana AI...');

      // Call Nano-Banana API
      const response = await axios.get(
        `https://tawsif.is-a.dev/gemini/nano-banana?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(fileLink)}`,
        { timeout: 30000 }
      );

      if (!response.data.imageUrl) {
        await goat.reply(ctx, '❌ Failed to process image');
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
      const errorMsg = error.response?.data?.message || error.message;
      await goat.reply(ctx, `❌ Error: ${errorMsg}`);
    }
  }
};
