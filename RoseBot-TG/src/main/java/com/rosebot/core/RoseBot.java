package com.rosebot.core;

import com.rosebot.config.Config;
import com.rosebot.handlers.UpdateHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

/**
 * Main bot class - extends TelegramLongPollingBot for webhook-less polling
 * Modular architecture inspired by Rose-Bot Python version
 */
public class RoseBot extends TelegramLongPollingBot {
    private static final Logger logger = LoggerFactory.getLogger(RoseBot.class);
    private final UpdateHandler updateHandler;
    private final Config config;

    public RoseBot() {
        this.config = Config.getInstance();
        this.updateHandler = new UpdateHandler(config);
        logger.info("🌹 Rose Bot initialized");
    }

    @Override
    public String getBotToken() {
        return config.getBotToken();
    }

    @Override
    public String getBotUsername() {
        return config.getBotUsername();
    }

    @Override
    public void onUpdateReceived(Update update) {
        try {
            logger.debug("📨 Received update: {}", update.getUpdateId());
            
            // Route update to handler
            updateHandler.handleUpdate(update, this);
            
        } catch (Exception e) {
            logger.error("❌ Error processing update", e);
        }
    }

    /**
     * Send message helper method
     */
    public void sendMessage(long chatId, String text) {
        try {
            SendMessage message = SendMessage.builder()
                    .chatId(chatId)
                    .text(text)
                    .parseMode("HTML")
                    .build();
            
            execute(message);
        } catch (TelegramApiException e) {
            logger.error("❌ Error sending message", e);
        }
    }

    /**
     * Send formatted error message
     */
    public void sendError(long chatId, String error) {
        sendMessage(chatId, "❌ <b>Error:</b> " + error);
    }

    /**
     * Send success message
     */
    public void sendSuccess(long chatId, String message) {
        sendMessage(chatId, "✅ " + message);
    }
}
