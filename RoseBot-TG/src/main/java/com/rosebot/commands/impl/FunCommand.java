package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

public class FunCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        String text = "<b>🎮 Fun Commands</b>\n\n" +
                "/joke - Random joke\n" +
                "/meme - Random meme\n" +
                "/fact - Random fact\n" +
                "/dice - Roll dice\n" +
                "/flip - Flip coin\n";
        bot.sendMessage(message.getChatId(), text);
    }
    @Override
    public String getName() { return "fun"; }
    @Override
    public String getDescription() { return "Show fun commands"; }
    @Override
    public String getUsage() { return "/fun"; }
}
