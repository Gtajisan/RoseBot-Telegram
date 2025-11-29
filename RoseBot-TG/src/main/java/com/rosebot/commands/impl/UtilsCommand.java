package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import com.rosebot.utils.FormatterUtils;
import org.telegram.telegrambots.meta.api.objects.Message;

public class UtilsCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        String text = "<b>🛠️ Utility Commands</b>\n\n" +
                "/calc - Calculator\n" +
                "/weather - Get weather\n" +
                "/time - Current time\n" +
                "/user - User info\n" +
                "/translate - Translate text\n";
        bot.sendMessage(message.getChatId(), text);
    }
    @Override
    public String getName() { return "utils"; }
    @Override
    public String getDescription() { return "Show utility commands"; }
    @Override
    public String getUsage() { return "/utils"; }
}
