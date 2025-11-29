package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;
import java.util.Random;

public class FactCommand implements ICommand {
    private static final String[] FACTS = {
        "🧠 Did you know? Honey never spoils - archaeologists found 3000-year-old honey that was still edible!",
        "🦖 Did you know? T-Rex arms were actually very muscular and could lift 400 pounds each!",
        "🌍 Did you know? A day on Venus is longer than a year on Venus!",
        "🐙 Did you know? Octopuses have three hearts!"
    };

    @Override
    public void execute(Message message, RoseBot bot) {
        String fact = FACTS[new Random().nextInt(FACTS.length)];
        bot.sendMessage(message.getChatId(), fact);
    }

    @Override
    public String getName() { return "fact"; }
    @Override
    public String getDescription() { return "Get random fact"; }
    @Override
    public String getUsage() { return "/fact"; }
}
