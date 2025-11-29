module.exports = {
  name: 'mute',
  description: 'Mute user (restrict messaging)',
  author: 'Gtajisan',
  adminOnly: true,

  async execute(ctx, args, db, config, goat) {
    try {
      let targetUserId = null;
      if (ctx.message?.reply_to_message?.from) {
        targetUserId = ctx.message.reply_to_message.from.id;
      } else if (args[0] && !isNaN(args[0])) {
        targetUserId = parseInt(args[0]);
      } else {
        await goat.reply(ctx, '❌ Usage: /mute <user_id|reply> [time_minutes]');
        return;
      }

      const timeMinutes = parseInt(args[1]) || 60;
      const untilDate = Math.floor(Date.now() / 1000) + (timeMinutes * 60);

      await goat.getInstance().telegram.restrictChatMember(ctx.chat.id, targetUserId, {
        can_send_messages: false,
        can_send_media_messages: false,
        can_send_polls: false,
        can_send_other_messages: false,
        can_add_web_page_previews: false
      }, { until_date: untilDate });

      const user = await db.getUser(targetUserId);
      const userName = user?.first_name || `User ${targetUserId}`;
      await goat.reply(ctx, `🔇 *Muted* ${userName}\n⏱️ Duration: ${timeMinutes} minutes`, { parse_mode: 'Markdown' });
    } catch (error) {
      await goat.reply(ctx, `❌ Error: ${error.message}`);
    }
  }
};
