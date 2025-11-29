package com.rosebot.languages;

import java.util.HashMap;
import java.util.Map;

/**
 * Language manager - support multiple languages
 */
public class LanguageManager {
    private static LanguageManager instance;
    private final Map<String, Language> languages = new HashMap<>();
    private String defaultLanguage = "en";

    private LanguageManager() {
        // Register languages
        languages.put("en", new EnglishLanguage());
        // Add more languages later
    }

    public static synchronized LanguageManager getInstance() {
        if (instance == null) {
            instance = new LanguageManager();
        }
        return instance;
    }

    public Language getLanguage(String code) {
        return languages.getOrDefault(code, languages.get(defaultLanguage));
    }

    public Language getDefaultLanguage() {
        return languages.get(defaultLanguage);
    }

    public void setDefaultLanguage(String code) {
        if (languages.containsKey(code)) {
            this.defaultLanguage = code;
        }
    }
}
