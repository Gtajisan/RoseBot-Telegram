package com.rosebot.commands;

import com.rosebot.config.Config;
import com.rosebot.core.RoseBot;
import com.rosebot.commands.impl.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.telegram.telegrambots.meta.api.objects.Message;

import java.util.HashMap;
import java.util.Map;

/**
 * Command router - maps command names to handlers
 * Modular system allowing easy addition of new commands
 */
public class CommandRouter {
    private static final Logger logger = LoggerFactory.getLogger(CommandRouter.class);
    private final Config config;
    private final Map<String, ICommand> commands;

    public CommandRouter(Config config) {
        this.config = config;
        this.commands = new HashMap<>();
        registerCommands();
    }

    /**
     * Register all available commands
     */
    private void registerCommands() {
        // Core commands
        commands.put("start", new StartCommand());
        commands.put("help", new HelpCommand());
        commands.put("ping", new PingCommand());
        
        // Admin commands
        commands.put("admin", new AdminCommand());
        commands.put("ban", new BanCommand());
        commands.put("kick", new KickCommand());
        
        // Owner commands
        commands.put("stats", new StatsCommand());
        commands.put("status", new StatusCommand());
        
        logger.info("📋 Registered {} commands", commands.size());
    }

    /**
     * Route and execute command
     */
    public void handleCommand(Message message, RoseBot bot) {
        String commandName = message.getText().substring(1).split(" ")[0].toLowerCase();
        long userId = message.getFrom().getId();
        long chatId = message.getChatId();

        logger.info("⚙️  Command '{}' from user {}", commandName, userId);

        ICommand command = commands.get(commandName);
        
        if (command == null) {
            bot.sendError(chatId, "Unknown command: /" + commandName);
            return;
        }

        try {
            command.execute(message, bot);
        } catch (Exception e) {
            logger.error("❌ Error executing command: {}", commandName, e);
            bot.sendError(chatId, "Error executing command: " + e.getMessage());
        }
    }

    /**
     * Get command by name
     */
    public ICommand getCommand(String name) {
        return commands.get(name.toLowerCase());
    }

    /**
     * Get all registered commands
     */
    public Map<String, ICommand> getAllCommands() {
        return new HashMap<>(commands);
    }
}
