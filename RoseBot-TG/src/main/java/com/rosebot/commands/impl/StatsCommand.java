package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class StatsCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        bot.sendMessage(message.getChatId(), "📊 Bot statistics and metrics");
    }
    @Override
    public String getName() { return "stats"; }
    @Override
    public String getDescription() { return "Show bot stats"; }
    @Override
    public String getUsage() { return "/stats"; }
}
