package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /start
 * Description: Welcome message and bot introduction
 * Usage: /start
 * Admin: false
 */
public class StartCommand implements ICommand {
    
    public StartCommand() {}

    @Override
    public void execute(Message message, RoseBot bot) {
        long chatId = message.getChatId();
        String userName = message.getFrom().getFirstName();
        
        String text = "🌹 <b>Welcome to Rose Bot!</b>\n\n" +
                "Hello <b>" + userName + "</b>! I'm Rose, your personal Telegram assistant.\n\n" +
                "<b>🎯 Features:</b>\n" +
                "• Group moderation & management\n" +
                "• User tracking & statistics\n" +
                "• Admin commands & controls\n" +
                "• Fun & utility functions\n" +
                "• Event-driven architecture\n\n" +
                "Use /help to see all commands.";
        
        bot.sendMessage(chatId, text);
    }

    @Override
    public String getName() {
        return "start";
    }

    @Override
    public String getDescription() {
        return "Welcome to Rose Bot";
    }

    @Override
    public String getUsage() {
        return "/start";
    }

    @Override
    public boolean hasPermission(Message message) {
        return true;
    }
}
