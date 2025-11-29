package com.rosebot.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Text and data formatting utilities - GoatBot-V2 style
 */
public class FormatterUtils {
    
    /**
     * Format bytes to human readable
     */
    public static String formatBytes(long bytes) {
        if (bytes <= 0) return "0 B";
        final String[] units = new String[]{"B", "KB", "MB", "GB"};
        int digitGroups = (int) (Math.log10(bytes) / Math.log10(1024));
        return String.format("%.2f %s", bytes / Math.pow(1024, digitGroups), units[digitGroups]);
    }

    /**
     * Format time duration
     */
    public static String formatDuration(long millis) {
        long seconds = millis / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;

        if (days > 0) return days + "d " + (hours % 24) + "h";
        if (hours > 0) return hours + "h " + (minutes % 60) + "m";
        if (minutes > 0) return minutes + "m " + (seconds % 60) + "s";
        return seconds + "s";
    }

    /**
     * Format timestamp
     */
    public static String formatTime(long timestamp) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(new Date(timestamp));
    }

    /**
     * Format number with thousand separators
     */
    public static String formatNumber(long number) {
        return String.format("%,d", number);
    }

    /**
     * Create progress bar
     */
    public static String progressBar(int current, int max) {
        int filled = (int) ((current * 10.0) / max);
        StringBuilder bar = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            bar.append(i < filled ? "█" : "░");
        }
        return bar + " " + current + "/" + max;
    }

    /**
     * Create stats table
     */
    public static String statsTable(String... rows) {
        StringBuilder sb = new StringBuilder();
        for (String row : rows) {
            sb.append(row).append("\n");
        }
        return sb.toString();
    }
}
