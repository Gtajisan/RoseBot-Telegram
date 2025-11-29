package com.rosebot.models;

/**
 * Bot statistics model
 */
public class Stats {
    private long totalUsers;
    private long totalMessages;
    private long totalChats;
    private long uptime;
    private double cpuUsage;
    private long memoryUsage;
    private long memoryMax;

    public Stats() {
        this.totalUsers = 0;
        this.totalMessages = 0;
        this.totalChats = 0;
    }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalMessages() { return totalMessages; }
    public void setTotalMessages(long totalMessages) { this.totalMessages = totalMessages; }

    public long getTotalChats() { return totalChats; }
    public void setTotalChats(long totalChats) { this.totalChats = totalChats; }

    public long getUptime() { return System.currentTimeMillis() - 0; }

    public double getCpuUsage() {
        return Runtime.getRuntime().totalMemory() / (1024 * 1024);
    }

    public long getMemoryUsage() {
        return (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / (1024 * 1024);
    }

    public long getMemoryMax() {
        return Runtime.getRuntime().maxMemory() / (1024 * 1024);
    }

    public String getFormattedStats() {
        return String.format("👥 Users: %d\n💬 Messages: %d\n👥 Chats: %d\n⏱️ Uptime: %dh\n💾 Memory: %dMB/%dMB",
                totalUsers, totalMessages, totalChats, getUptime() / 3600000, getMemoryUsage(), getMemoryMax());
    }
}
