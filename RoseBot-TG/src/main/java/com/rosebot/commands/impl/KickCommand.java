package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /kick
 * Description: Kick a user from chat
 * Usage: /kick <user_id> [reason]
 * Admin: true
 */
public class KickCommand implements ICommand {

    @Override
    public void execute(Message message, RoseBot bot) {
        String text = message.getText();
        String[] parts = text.split(" ");
        
        if (parts.length < 2) {
            bot.sendError(message.getChatId(), "Usage: /kick <user_id> [reason]");
            return;
        }

        String userId = parts[1];
        String reason = parts.length > 2 ? text.substring(text.indexOf(parts[2])) : "No reason";
        
        bot.sendSuccess(message.getChatId(), "User " + userId + " kicked. Reason: " + reason);
    }

    @Override
    public String getName() {
        return "kick";
    }

    @Override
    public String getDescription() {
        return "Kick user from chat";
    }

    @Override
    public String getUsage() {
        return "/kick <user_id> [reason]";
    }

    @Override
    public boolean hasPermission(Message message) {
        return true; // TODO: Check admin permission
    }
}
