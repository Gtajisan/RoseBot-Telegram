package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class InfoCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        String info = "<b>ℹ️ Bot Information</b>\n\n" +
                "<b>Rose Bot v1.0.0</b>\n" +
                "🌹 Modular Telegram Bot\n\n" +
                "<b>Features:</b>\n" +
                "• Admin Management\n" +
                "• User Tracking\n" +
                "• Statistics & Analytics\n" +
                "• Utility Functions\n" +
                "• Fun Commands\n" +
                "• Event System\n" +
                "• Multi-Language Support\n\n" +
                "Use /help for all commands";
        bot.sendMessage(message.getChatId(), info);
    }
    @Override
    public String getName() { return "info"; }
    @Override
    public String getDescription() { return "Bot information"; }
    @Override
    public String getUsage() { return "/info"; }
}
