package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class BanCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        bot.sendMessage(message.getChatId(), "🚫 Ban user functionality");
    }
    @Override
    public String getName() { return "ban"; }
    @Override
    public String getDescription() { return "Ban user"; }
    @Override
    public String getUsage() { return "/ban <user_id>"; }
}
