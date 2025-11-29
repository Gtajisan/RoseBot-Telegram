package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class SettingsCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        String settings = "<b>⚙️ Bot Settings</b>\n\n" +
                "🌐 Language: 🇺🇸 English\n" +
                "📍 Prefix: /\n" +
                "🕐 Timezone: UTC\n" +
                "🔄 Auto-delete: OFF\n" +
                "📢 Announcements: ON\n" +
                "📝 Logging: ON\n";
        bot.sendMessage(message.getChatId(), settings);
    }
    @Override
    public String getName() { return "settings"; }
    @Override
    public String getDescription() { return "Bot settings"; }
    @Override
    public String getUsage() { return "/settings"; }
}
