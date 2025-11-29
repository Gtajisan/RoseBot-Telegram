package com.rosebot.languages;

/**
 * Language support interface
 */
public interface Language {
    String getWelcome();
    String getHelp();
    String getError(String message);
    String getSuccess(String message);
    String getBotName();
    String getVersion();
    String getAuthor();
}
