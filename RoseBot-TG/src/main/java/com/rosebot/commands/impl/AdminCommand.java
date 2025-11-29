package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class AdminCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        bot.sendMessage(message.getChatId(), "🔐 Admin panel");
    }
    @Override
    public String getName() { return "admin"; }
    @Override
    public String getDescription() { return "Admin settings"; }
    @Override
    public String getUsage() { return "/admin"; }
}
