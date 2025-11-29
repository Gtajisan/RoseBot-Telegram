package com.rosebot.models;

import java.util.Set;
import java.util.HashSet;

/**
 * User model for database operations
 */
public class User {
    private long telegramId;
    private String username;
    private String firstName;
    private String lastName;
    private boolean isAdmin;
    private boolean isBanned;
    private long createdAt;
    private long lastSeen;
    private int messageCount;
    private Set<String> permissions;

    public User(long telegramId) {
        this.telegramId = telegramId;
        this.createdAt = System.currentTimeMillis();
        this.permissions = new HashSet<>();
    }

    // Getters and Setters
    public long getTelegramId() { return telegramId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public boolean isAdmin() { return isAdmin; }
    public void setAdmin(boolean admin) { isAdmin = admin; }
    public boolean isBanned() { return isBanned; }
    public void setBanned(boolean banned) { isBanned = banned; }
    public long getCreatedAt() { return createdAt; }
    public long getLastSeen() { return lastSeen; }
    public void setLastSeen(long lastSeen) { this.lastSeen = lastSeen; }
    public int getMessageCount() { return messageCount; }
    public void incrementMessageCount() { messageCount++; }
    public Set<String> getPermissions() { return permissions; }
    public boolean hasPermission(String permission) { return permissions.contains(permission); }
    public void addPermission(String permission) { permissions.add(permission); }
}
