package com.rosebot.config;

import com.typesafe.config.ConfigFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Configuration management - Singleton pattern
 */
public class Config {
    private static final Logger logger = LoggerFactory.getLogger(Config.class);
    private static Config instance;
    private final com.typesafe.config.Config config;

    private Config() {
        this.config = ConfigFactory.load("application.conf");
        logger.info("✅ Configuration loaded");
    }

    public static Config getInstance() {
        if (instance == null) {
            instance = new Config();
        }
        return instance;
    }

    public String getBotToken() {
        String token = System.getenv("BOT_TOKEN");
        if (token == null) {
            token = config.getString("bot.token");
        }
        if (token.equals("YOUR_BOT_TOKEN_HERE")) {
            throw new RuntimeException("❌ BOT_TOKEN not configured! Set BOT_TOKEN environment variable.");
        }
        return token;
    }

    public String getBotUsername() {
        String username = System.getenv("BOT_USERNAME");
        if (username == null) {
            username = config.getString("bot.username");
        }
        return username;
    }

    public String[] getOwners() {
        String owners = System.getenv("BOT_OWNERS");
        if (owners == null) {
            owners = config.getString("bot.owners");
        }
        return owners.split(",");
    }

    public String getDatabasePath() {
        String path = System.getenv("DB_PATH");
        if (path == null) {
            path = config.getString("bot.database.path");
        }
        return path;
    }

    public int getConnectTimeout() {
        return config.getInt("bot.api.connect-timeout");
    }

    public int getReadTimeout() {
        return config.getInt("bot.api.read-timeout");
    }

    public String getLogLevel() {
        String level = System.getenv("LOG_LEVEL");
        if (level == null) {
            level = config.getString("logging.level");
        }
        return level;
    }
}
