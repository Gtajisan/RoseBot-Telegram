package com.rosebot.events;

/**
 * Base event class - event-driven architecture like GoatBot-V2
 */
public abstract class Event {
    private final long timestamp;
    private final long userId;

    public Event(long userId) {
        this.userId = userId;
        this.timestamp = System.currentTimeMillis();
    }

    public long getTimestamp() {
        return timestamp;
    }

    public long getUserId() {
        return userId;
    }

    public abstract String getEventType();
}
