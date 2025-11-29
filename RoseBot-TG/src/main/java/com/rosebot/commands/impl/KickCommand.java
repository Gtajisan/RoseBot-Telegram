package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class KickCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        bot.sendMessage(message.getChatId(), "👢 Kick user functionality");
    }
    @Override
    public String getName() { return "kick"; }
    @Override
    public String getDescription() { return "Kick user"; }
    @Override
    public String getUsage() { return "/kick <user_id>"; }
}
