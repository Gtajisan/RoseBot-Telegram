package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class StatusCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        Runtime runtime = Runtime.getRuntime();
        long usedMemory = (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024;
        long maxMemory = runtime.maxMemory() / 1024 / 1024;
        
        String status = "🤖 <b>Bot Status</b>\n\n" +
                "Memory: " + usedMemory + "MB / " + maxMemory + "MB\n" +
                "Runtime: " + (System.currentTimeMillis() / 1000) + "s\n" +
                "Status: 🟢 Online";
        
        bot.sendMessage(message.getChatId(), status);
    }
    @Override
    public String getName() { return "status"; }
    @Override
    public String getDescription() { return "Bot status info"; }
    @Override
    public String getUsage() { return "/status"; }
}
