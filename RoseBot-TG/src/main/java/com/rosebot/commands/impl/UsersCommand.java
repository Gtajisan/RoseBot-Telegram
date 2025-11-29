package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class UsersCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        String users = "<b>👥 User Management</b>\n\n" +
                "/getuser - Get user info\n" +
                "/userlist - List all users\n" +
                "/banlist - Banned users\n" +
                "/addalias - Add user alias\n";
        bot.sendMessage(message.getChatId(), users);
    }
    @Override
    public String getName() { return "users"; }
    @Override
    public String getDescription() { return "User management"; }
    @Override
    public String getUsage() { return "/users"; }
}
