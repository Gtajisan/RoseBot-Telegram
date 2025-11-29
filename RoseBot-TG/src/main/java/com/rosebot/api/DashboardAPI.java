package com.rosebot.api;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.rosebot.models.Stats;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Spark;

/**
 * REST API Dashboard - GoatBot-V2 style
 */
public class DashboardAPI {
    private static final Logger logger = LoggerFactory.getLogger(DashboardAPI.class);
    private final Gson gson = new Gson();
    private final Stats stats;

    public DashboardAPI(Stats stats) {
        this.stats = stats;
    }

    /**
     * Initialize API routes
     */
    public void initialize() {
        Spark.port(3000);

        // Health check
        Spark.get("/api/health", (req, res) -> {
            JsonObject json = new JsonObject();
            json.addProperty("status", "online");
            json.addProperty("timestamp", System.currentTimeMillis());
            return gson.toJson(json);
        });

        // Get stats
        Spark.get("/api/stats", (req, res) -> {
            JsonObject json = new JsonObject();
            json.addProperty("users", stats.getTotalUsers());
            json.addProperty("messages", stats.getTotalMessages());
            json.addProperty("chats", stats.getTotalChats());
            json.addProperty("memory", stats.getMemoryUsage());
            json.addProperty("maxMemory", stats.getMemoryMax());
            return gson.toJson(json);
        });

        // Get status
        Spark.get("/api/status", (req, res) -> {
            return gson.toJson(stats.getFormattedStats());
        });

        logger.info("✅ Dashboard API initialized on http://localhost:3000");
    }

    /**
     * Stop API server
     */
    public void stop() {
        Spark.stop();
        logger.info("✅ Dashboard API stopped");
    }
}
