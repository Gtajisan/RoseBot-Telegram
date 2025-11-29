package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class ModCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        String text = "<b>🛡️ Moderation Commands</b>\n\n" +
                "/mute - Mute user\n" +
                "/unmute - Unmute user\n" +
                "/warn - Warn user\n" +
                "/mute_all - Mute everyone\n" +
                "/logs - Admin logs\n";
        bot.sendMessage(message.getChatId(), text);
    }
    @Override
    public String getName() { return "mod"; }
    @Override
    public String getDescription() { return "Show moderation commands"; }
    @Override
    public String getUsage() { return "/mod"; }
}
