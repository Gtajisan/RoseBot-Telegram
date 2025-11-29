package com.rosebot.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Event bus for event-driven architecture
 */
public class EventBus {
    private static final Logger logger = LoggerFactory.getLogger(EventBus.class);
    private static EventBus instance;
    private final Map<Class<?>, List<EventListener<?>>> listeners = new HashMap<>();

    private EventBus() {}

    public static synchronized EventBus getInstance() {
        if (instance == null) {
            instance = new EventBus();
        }
        return instance;
    }

    /**
     * Register event listener
     */
    public <T extends Event> void subscribe(Class<T> eventType, EventListener<T> listener) {
        listeners.computeIfAbsent(eventType, k -> new CopyOnWriteArrayList<>()).add(listener);
        logger.debug("📡 Listener registered for {}", eventType.getSimpleName());
    }

    /**
     * Unregister event listener
     */
    public <T extends Event> void unsubscribe(Class<T> eventType, EventListener<T> listener) {
        List<EventListener<?>> list = listeners.get(eventType);
        if (list != null) {
            list.remove(listener);
        }
    }

    /**
     * Post event to all listeners
     */
    public void post(Event event) {
        List<EventListener<?>> eventListeners = listeners.get(event.getClass());
        if (eventListeners != null) {
            for (EventListener<?> listener : eventListeners) {
                try {
                    ((EventListener<Event>) listener).onEvent(event);
                } catch (Exception e) {
                    logger.error("❌ Error in event listener", e);
                }
            }
        }
    }

    /**
     * Event listener interface
     */
    public interface EventListener<T extends Event> {
        void onEvent(T event);
    }
}
