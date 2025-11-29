package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /ban
 * Description: Ban a user from chat
 * Usage: /ban <user_id> [reason]
 * Admin: true
 */
public class BanCommand implements ICommand {

    @Override
    public void execute(Message message, RoseBot bot) {
        String text = message.getText();
        String[] parts = text.split(" ");
        
        if (parts.length < 2) {
            bot.sendError(message.getChatId(), "Usage: /ban <user_id> [reason]");
            return;
        }

        String userId = parts[1];
        String reason = parts.length > 2 ? text.substring(text.indexOf(parts[2])) : "No reason provided";
        
        bot.sendSuccess(message.getChatId(), "User " + userId + " banned. Reason: " + reason);
    }

    @Override
    public String getName() {
        return "ban";
    }

    @Override
    public String getDescription() {
        return "Ban user from chat";
    }

    @Override
    public String getUsage() {
        return "/ban <user_id> [reason]";
    }

    @Override
    public boolean hasPermission(Message message) {
        return true; // TODO: Check admin permission
    }
}
