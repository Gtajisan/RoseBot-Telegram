package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;
import java.util.Random;

public class JokeCommand implements ICommand {
    private static final String[] JOKES = {
        "Why did the coffee file a police report? It got mugged!",
        "What do you call a bot that tells jokes? A pun-ction!",
        "Why did the programmer go broke? Because he used up all his cache!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!"
    };

    @Override
    public void execute(Message message, RoseBot bot) {
        String joke = JOKES[new Random().nextInt(JOKES.length)];
        bot.sendMessage(message.getChatId(), "😂 " + joke);
    }

    @Override
    public String getName() { return "joke"; }
    @Override
    public String getDescription() { return "Tell a random joke"; }
    @Override
    public String getUsage() { return "/joke"; }
}
