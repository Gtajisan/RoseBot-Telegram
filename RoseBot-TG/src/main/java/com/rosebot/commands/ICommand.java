package com.rosebot.commands;

import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * Interface for all commands - allows modular command implementation
 */
public interface ICommand {
    /**
     * Execute the command
     */
    void execute(Message message, RoseBot bot) throws Exception;

    /**
     * Get command name
     */
    String getName();

    /**
     * Get command description
     */
    String getDescription();

    /**
     * Get command usage
     */
    String getUsage();

    /**
     * Check if user has permission to execute
     */
    default boolean hasPermission(Message message) {
        return true;
    }
}
