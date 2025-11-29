package com.rosebot;

import com.rosebot.core.RoseBot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

/**
 * Main entry point for Rose Bot Telegram application
 */
public class RoseBotMain {
    private static final Logger logger = LoggerFactory.getLogger(RoseBotMain.class);

    public static void main(String[] args) {
        try {
            logger.info("🌹 Starting Rose Bot for Telegram...");
            
            // Initialize TelegramBots API
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            
            // Register bot
            RoseBot bot = new RoseBot();
            botsApi.registerBot(bot);
            
            logger.info("✅ Rose Bot started successfully!");
            logger.info("🤖 Bot is now listening for updates...");
            
        } catch (TelegramApiException e) {
            logger.error("❌ Failed to start Rose Bot", e);
            System.exit(1);
        }
    }
}
