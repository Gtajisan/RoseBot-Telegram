package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * /start command - welcome message
 */
public class StartCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        long chatId = message.getChatId();
        String userName = message.getFrom().getFirstName();
        
        String response = "🌹 <b>Welcome to Rose Bot!</b>\n\n" +
                "Hello " + userName + "! I'm Rose, your personal Telegram assistant.\n\n" +
                "<b>Features:</b>\n" +
                "• Group moderation\n" +
                "• User management\n" +
                "• Custom commands\n" +
                "• And much more!\n\n" +
                "Use /help to see all available commands.";
        
        bot.sendMessage(chatId, response);
    }

    @Override
    public String getName() {
        return "start";
    }

    @Override
    public String getDescription() {
        return "Welcome message";
    }

    @Override
    public String getUsage() {
        return "/start";
    }
}
