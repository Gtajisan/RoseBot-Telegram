package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /admin
 * Description: Admin control panel
 * Usage: /admin [action]
 * Admin: true
 */
public class AdminCommand implements ICommand {

    @Override
    public void execute(Message message, RoseBot bot) {
        if (!hasPermission(message)) {
            bot.sendError(message.getChatId(), "You don't have permission to use this command");
            return;
        }

        String adminPanel = "<b>🔐 Admin Panel</b>\n\n" +
                "Available actions:\n" +
                "/admin ban - Ban users\n" +
                "/admin kick - Kick users\n" +
                "/admin warn - Warn users\n" +
                "/admin logs - View admin logs\n" +
                "/admin settings - Admin settings\n";
        
        bot.sendMessage(message.getChatId(), adminPanel);
    }

    @Override
    public String getName() {
        return "admin";
    }

    @Override
    public String getDescription() {
        return "Admin control panel";
    }

    @Override
    public String getUsage() {
        return "/admin [action]";
    }

    @Override
    public boolean hasPermission(Message message) {
        return true; // TODO: Check user permissions
    }
}
