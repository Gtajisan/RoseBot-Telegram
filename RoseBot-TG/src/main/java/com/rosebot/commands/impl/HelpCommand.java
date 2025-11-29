package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /help
 * Description: Show all available commands
 * Usage: /help [command]
 * Admin: false
 */
public class HelpCommand implements ICommand {

    @Override
    public void execute(Message message, RoseBot bot) {
        long chatId = message.getChatId();
        String[] args = message.getText().split(" ");
        
        if (args.length > 1) {
            String cmdName = args[1].toLowerCase();
            bot.sendMessage(chatId, "📖 Help for: " + cmdName);
        } else {
            String helpText = "<b>🌹 Rose Bot - Command List</b>\n\n" +
                    "<b>📌 Core Commands:</b>\n" +
                    "/start - Welcome message\n" +
                    "/help - Show this message\n" +
                    "/ping - Bot status & latency\n" +
                    "/info - Bot information\n" +
                    "/settings - Configure bot\n\n" +
                    "<b>🛡️ Moderation:</b>\n" +
                    "/admin - Admin panel\n" +
                    "/ban - Ban user\n" +
                    "/kick - Kick user\n" +
                    "/mod - Mod commands\n" +
                    "/users - User management\n\n" +
                    "<b>🎮 Fun & Utilities:</b>\n" +
                    "/utils - Utility commands\n" +
                    "/fun - Fun commands\n" +
                    "/joke - Random joke\n" +
                    "/meme - Meme collection\n" +
                    "/fact - Random fact\n\n" +
                    "<b>📊 Statistics:</b>\n" +
                    "/stats - Bot statistics\n" +
                    "/status - Bot status info\n\n" +
                    "Type /help <command> for detailed info.";
            
            bot.sendMessage(chatId, helpText);
        }
    }

    @Override
    public String getName() {
        return "help";
    }

    @Override
    public String getDescription() {
        return "Show all available commands";
    }

    @Override
    public String getUsage() {
        return "/help [command]";
    }

    @Override
    public boolean hasPermission(Message message) {
        return true;
    }
}
