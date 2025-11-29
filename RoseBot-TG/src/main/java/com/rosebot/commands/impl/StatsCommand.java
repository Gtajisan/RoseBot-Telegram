package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /stats
 * Description: Show bot statistics
 * Usage: /stats
 * Admin: true
 */
public class StatsCommand implements ICommand {

    @Override
    public void execute(Message message, RoseBot bot) {
        Runtime runtime = Runtime.getRuntime();
        long usedMemory = (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024);
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long processors = runtime.availableProcessors();
        
        String stats = "<b>📊 Rose Bot Statistics</b>\n\n" +
                "👥 Total Users: 0\n" +
                "💬 Total Messages: 0\n" +
                "👥 Active Chats: 0\n\n" +
                "<b>System Info:</b>\n" +
                "💾 Memory: " + usedMemory + "MB / " + maxMemory + "MB\n" +
                "⚙️ CPU Cores: " + processors + "\n" +
                "🆚 Java Version: " + System.getProperty("java.version") + "\n\n" +
                "✅ Bot Status: Online\n" +
                "🟢 Uptime: Fresh start";
        
        bot.sendMessage(message.getChatId(), stats);
    }

    @Override
    public String getName() {
        return "stats";
    }

    @Override
    public String getDescription() {
        return "Show bot statistics";
    }

    @Override
    public String getUsage() {
        return "/stats";
    }

    @Override
    public boolean hasPermission(Message message) {
        return true; // TODO: Check owner permission
    }
}
