package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * /help command - show available commands
 */
public class HelpCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        long chatId = message.getChatId();
        
        String response = "<b>🌹 Rose Bot Commands</b>\n\n" +
                "<b>📌 Core Commands:</b>\n" +
                "• /start - Welcome message\n" +
                "• /help - Show this message\n" +
                "• /ping - Bot status\n" +
                "• /info - Bot information\n" +
                "• /settings - Bot settings\n\n" +
                "<b>🛡️ Moderation:</b>\n" +
                "• /admin - Admin panel\n" +
                "• /ban - Ban user\n" +
                "• /kick - Kick user\n" +
                "• /mod - Mod commands\n" +
                "• /users - User management\n\n" +
                "<b>🛠️ Utilities:</b>\n" +
                "• /utils - Utility commands\n" +
                "• /fun - Fun commands\n\n" +
                "<b>📊 Statistics:</b>\n" +
                "• /stats - Bot statistics\n" +
                "• /status - Bot status info\n\n" +
                "Use /help <command> for more info on a specific command.";
        
        bot.sendMessage(chatId, response);
    }

    @Override
    public String getName() {
        return "help";
    }

    @Override
    public String getDescription() {
        return "Show all commands";
    }

    @Override
    public String getUsage() {
        return "/help [command]";
    }
}
