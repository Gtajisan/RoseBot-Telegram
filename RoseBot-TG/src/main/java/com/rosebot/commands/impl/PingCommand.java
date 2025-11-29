package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * /ping command - bot status
 */
public class PingCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        long chatId = message.getChatId();
        long startTime = System.currentTimeMillis();
        
        bot.sendSuccess(chatId, "Pong! Response time: " + (System.currentTimeMillis() - startTime) + "ms");
    }

    @Override
    public String getName() {
        return "ping";
    }

    @Override
    public String getDescription() {
        return "Check bot status";
    }

    @Override
    public String getUsage() {
        return "/ping";
    }
}
