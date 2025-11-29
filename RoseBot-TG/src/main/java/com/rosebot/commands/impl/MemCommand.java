package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class MemCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        String mem = "🎲 Coming soon - Meme command feature";
        bot.sendMessage(message.getChatId(), mem);
    }

    @Override
    public String getName() { return "meme"; }
    @Override
    public String getDescription() { return "Get random meme"; }
    @Override
    public String getUsage() { return "/meme"; }
}
