const axios = require('axios');

module.exports = {
  name: 'prefix',
  description: 'Thay đổi dấu lệnh của bot trong box chat của bạn hoặc cả hệ thống bot (chỉ admin bot)',
  author: 'NTKhang & NeoKEX',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    try {
      // Converted from Goatbot command: prefix.js
      // Original author: NTKhang & NeoKEX
      
      // Migration Note: This command was auto-converted from Goatbot format.
      // Some features may need manual adjustment for Telegram.
      
      // Handle the command
      const senderID = ctx.from.id;
      const chatID = ctx.chat.id;
      const messageID = ctx.message.message_id;
      
      // Get user mentions
      const mentions = {};
      if (ctx.message.reply_to_message) {
        mentions[ctx.message.reply_to_message.from.id] = '@' + (ctx.message.reply_to_message.from.username || ctx.message.reply_to_message.from.first_name);
      }
      
      // Get target user
      let target = null;
      if (args[0] && !isNaN(args[0])) {
        target = args[0];
      } else if (ctx.message.reply_to_message) {
        target = ctx.message.reply_to_message.from.id;
      } else if (Object.keys(mentions).length > 0) {
        target = Object.keys(mentions)[0];
      }
      
      // Basic command response
      await goat.reply(ctx, `✅ Command '${ctx.message?.text?.split(' ')[0]?.slice(1) || 'command'}' executed
💡 This is an auto-converted Goatbot command
🔧 Developer may need to refine functionality`);
      
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};