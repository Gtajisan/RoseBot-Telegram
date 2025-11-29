package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /ping
 * Description: Check bot status and latency
 * Usage: /ping
 * Admin: false
 */
public class PingCommand implements ICommand {

    @Override
    public void execute(Message message, RoseBot bot) {
        long startTime = System.currentTimeMillis();
        bot.sendSuccess(message.getChatId(), "Pong! ⚡ Latency: " + (System.currentTimeMillis() - startTime) + "ms");
    }

    @Override
    public String getName() {
        return "ping";
    }

    @Override
    public String getDescription() {
        return "Check bot status and latency";
    }

    @Override
    public String getUsage() {
        return "/ping";
    }

    @Override
    public boolean hasPermission(Message message) {
        return true;
    }
}
