const axios = require('axios');

module.exports = {
  name: 'logo',
  description: 'Generate text logo',
  author: 'Gtajisan',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      if (!args[0]) {
        await goat.reply(ctx, '❌ Usage: /logo <text>');
        return;
      }
      const text = args.join(' ');
      const loading = await goat.reply(ctx, '⏳ Generating logo...');
      
      // Simple text-to-image API
      const encoded = encodeURIComponent(text);
      const logoUrl = `https://flamingtext.com/render.nsl?decoration=under&text=${encoded}&fontsize=80&font=bikers&textColor=FF0000`;
      
      await ctx.replyWithPhoto(logoUrl, { caption: `📝 Logo: ${text}` });
      try { await goat.deleteMessage(ctx.chat.id, loading.message_id); } catch (e) {}
    } catch (error) {
      await goat.reply(ctx, `❌ Error generating logo`);
    }
  }
};
