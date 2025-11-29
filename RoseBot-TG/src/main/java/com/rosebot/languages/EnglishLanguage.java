package com.rosebot.languages;

public class EnglishLanguage implements Language {
    @Override
    public String getWelcome() {
        return "🌹 Welcome to Rose Bot! Type /help to see available commands.";
    }

    @Override
    public String getHelp() {
        return "📖 Rose Bot Help\n\nUse /help <command> for more info.";
    }

    @Override
    public String getError(String message) {
        return "❌ Error: " + message;
    }

    @Override
    public String getSuccess(String message) {
        return "✅ " + message;
    }

    @Override
    public String getBotName() {
        return "Rose Bot";
    }

    @Override
    public String getVersion() {
        return "2.0.0";
    }

    @Override
    public String getAuthor() {
        return "Rose Bot Team";
    }
}
