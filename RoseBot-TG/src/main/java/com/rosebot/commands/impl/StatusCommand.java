package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /status
 * Description: Show bot status information
 * Usage: /status
 * Admin: false
 */
public class StatusCommand implements ICommand {

    @Override
    public void execute(Message message, RoseBot bot) {
        Runtime runtime = Runtime.getRuntime();
        long memory = (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024);
        
        String status = "<b>🤖 Rose Bot Status</b>\n\n" +
                "🟢 Status: <b>Online</b>\n" +
                "📍 Version: <b>2.0.0</b>\n" +
                "⏱️ Response Time: <b>Fast</b>\n" +
                "💾 Memory Usage: <b>" + memory + " MB</b>\n" +
                "📊 Uptime: <b>Stable</b>\n\n" +
                "✅ All systems operational";
        
        bot.sendMessage(message.getChatId(), status);
    }

    @Override
    public String getName() {
        return "status";
    }

    @Override
    public String getDescription() {
        return "Show bot status";
    }

    @Override
    public String getUsage() {
        return "/status";
    }

    @Override
    public boolean hasPermission(Message message) {
        return true;
    }
}
