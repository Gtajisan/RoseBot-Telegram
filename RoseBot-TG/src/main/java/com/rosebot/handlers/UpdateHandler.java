package com.rosebot.handlers;

import com.rosebot.config.Config;
import com.rosebot.core.RoseBot;
import com.rosebot.commands.CommandRouter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.telegram.telegrambots.meta.api.objects.Update;

/**
 * Central update handler - routes updates to appropriate handlers
 * Modular design inspired by Rose-Bot's handler system
 */
public class UpdateHandler {
    private static final Logger logger = LoggerFactory.getLogger(UpdateHandler.class);
    private final Config config;
    private final CommandRouter commandRouter;

    public UpdateHandler(Config config) {
        this.config = config;
        this.commandRouter = new CommandRouter(config);
    }

    /**
     * Main update routing method
     */
    public void handleUpdate(Update update, RoseBot bot) {
        try {
            // Handle messages
            if (update.hasMessage()) {
                handleMessage(update, bot);
            }
            // Handle callback queries
            else if (update.hasCallbackQuery()) {
                handleCallbackQuery(update, bot);
            }
            // Handle inline queries
            else if (update.hasInlineQuery()) {
                handleInlineQuery(update, bot);
            }
            // Handle other update types
            else {
                logger.debug("⏭️ Unhandled update type: {}", update.getUpdateId());
            }
        } catch (Exception e) {
            logger.error("❌ Error in update handler", e);
        }
    }

    /**
     * Handle message updates
     */
    private void handleMessage(Update update, RoseBot bot) {
        var message = update.getMessage();
        long chatId = message.getChatId();
        long userId = message.getFrom().getId();
        
        logger.info("📨 Message from {} in chat {}: {}", userId, chatId, message.getText());

        try {
            // Handle commands
            if (message.isCommand()) {
                commandRouter.handleCommand(message, bot);
            }
            // Handle text messages
            else if (message.hasText()) {
                handleTextMessage(message, bot);
            }
            // Handle other message types
            else {
                logger.debug("⏭️ Unhandled message type");
            }
        } catch (Exception e) {
            logger.error("❌ Error handling message", e);
            bot.sendError(chatId, "An error occurred processing your message");
        }
    }

    /**
     * Handle text messages (non-command)
     */
    private void handleTextMessage(org.telegram.telegrambots.meta.api.objects.Message message, RoseBot bot) {
        long chatId = message.getChatId();
        String text = message.getText();
        
        // Add text message handlers here
        logger.debug("💬 Text message: {}", text);
    }

    /**
     * Handle callback queries (button clicks)
     */
    private void handleCallbackQuery(Update update, RoseBot bot) {
        var callbackQuery = update.getCallbackQuery();
        String callbackData = callbackQuery.getData();
        long userId = callbackQuery.getFrom().getId();
        
        logger.info("🔘 Callback from user {}: {}", userId, callbackData);
        
        // Add callback handlers here
    }

    /**
     * Handle inline queries
     */
    private void handleInlineQuery(Update update, RoseBot bot) {
        var inlineQuery = update.getInlineQuery();
        String query = inlineQuery.getQuery();
        
        logger.debug("🔍 Inline query: {}", query);
        
        // Add inline query handlers here
    }
}
