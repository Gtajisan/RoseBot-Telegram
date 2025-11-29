package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * Template for creating new commands
 * Copy this file and modify for your command
 */
public class TemplateCommand implements ICommand {
    
    @Override
    public void execute(Message message, RoseBot bot) {
        long chatId = message.getChatId();
        long userId = message.getFrom().getId();
        String[] args = message.getText().split(" ");
        
        // TODO: Implement command logic
        bot.sendMessage(chatId, "Command not yet implemented");
    }

    @Override
    public String getName() {
        return "template";
    }

    @Override
    public String getDescription() {
        return "This is a template command";
    }

    @Override
    public String getUsage() {
        return "/template [args]";
    }

    @Override
    public boolean hasPermission(Message message) {
        // Override if you want specific permissions
        return true;
    }
}
