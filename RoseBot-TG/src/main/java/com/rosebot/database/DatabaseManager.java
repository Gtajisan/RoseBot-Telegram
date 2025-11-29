package com.rosebot.database;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.sql.*;

/**
 * Database manager for SQLite/MySQL operations
 * Handles connection pooling and queries
 */
public class DatabaseManager {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseManager.class);
    private static DatabaseManager instance;
    private Connection connection;

    public static synchronized DatabaseManager getInstance() {
        if (instance == null) {
            instance = new DatabaseManager();
        }
        return instance;
    }

    public DatabaseManager() {
        try {
            Class.forName("org.sqlite.JDBC");
            logger.info("✅ SQLite driver loaded");
        } catch (ClassNotFoundException e) {
            logger.error("❌ SQLite driver not found", e);
        }
    }

    /**
     * Initialize database connection
     */
    public void initialize(String dbPath) {
        try {
            connection = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
            logger.info("✅ Database connected: {}", dbPath);
            createTables();
        } catch (SQLException e) {
            logger.error("❌ Database connection failed", e);
        }
    }

    /**
     * Create necessary tables
     */
    private void createTables() {
        try (Statement stmt = connection.createStatement()) {
            // Users table
            stmt.execute("CREATE TABLE IF NOT EXISTS users (" +
                    "id INTEGER PRIMARY KEY," +
                    "telegram_id LONG UNIQUE," +
                    "username TEXT," +
                    "first_name TEXT," +
                    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                    ")");

            // Chats table
            stmt.execute("CREATE TABLE IF NOT EXISTS chats (" +
                    "id INTEGER PRIMARY KEY," +
                    "chat_id LONG UNIQUE," +
                    "title TEXT," +
                    "type TEXT," +
                    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                    ")");

            // Admin logs table
            stmt.execute("CREATE TABLE IF NOT EXISTS admin_logs (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "admin_id LONG," +
                    "action TEXT," +
                    "target_id LONG," +
                    "reason TEXT," +
                    "timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                    ")");

            logger.info("✅ Database tables created");
        } catch (SQLException e) {
            logger.error("❌ Error creating tables", e);
        }
    }

    /**
     * Close database connection
     */
    public void close() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                logger.info("✅ Database closed");
            }
        } catch (SQLException e) {
            logger.error("❌ Error closing database", e);
        }
    }

    public Connection getConnection() {
        return connection;
    }
}
