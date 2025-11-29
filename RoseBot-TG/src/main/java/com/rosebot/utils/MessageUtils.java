package com.rosebot.utils;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import java.util.ArrayList;
import java.util.List;

/**
 * Message formatting utilities - enhanced like GoatBot-V2
 */
public class MessageUtils {
    
    /**
     * Build formatted message with buttons
     */
    public static SendMessage buildMessage(long chatId, String text) {
        return SendMessage.builder()
                .chatId(chatId)
                .text(text)
                .parseMode("HTML")
                .build();
    }

    /**
     * Build message with inline buttons
     */
    public static SendMessage buildMessageWithButtons(long chatId, String text, List<List<InlineKeyboardButton>> buttons) {
        SendMessage msg = buildMessage(chatId, text);
        msg.setReplyMarkup(new InlineKeyboardMarkup(buttons));
        return msg;
    }

    /**
     * Create inline button
     */
    public static InlineKeyboardButton createButton(String text, String callbackData) {
        return InlineKeyboardButton.builder()
                .text(text)
                .callbackData(callbackData)
                .build();
    }

    /**
     * Create URL button
     */
    public static InlineKeyboardButton createUrlButton(String text, String url) {
        return InlineKeyboardButton.builder()
                .text(text)
                .url(url)
                .build();
    }

    /**
     * Escape HTML special characters
     */
    public static String escapeHtml(String text) {
        return text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }

    /**
     * Format user mention
     */
    public static String mention(long userId, String name) {
        return "<a href=\"tg://user?id=" + userId + "\">" + escapeHtml(name) + "</a>";
    }

    /**
     * Format bold text
     */
    public static String bold(String text) {
        return "<b>" + escapeHtml(text) + "</b>";
    }

    /**
     * Format italic text
     */
    public static String italic(String text) {
        return "<i>" + escapeHtml(text) + "</i>";
    }

    /**
     * Format code
     */
    public static String code(String text) {
        return "<code>" + escapeHtml(text) + "</code>";
    }

    /**
     * Format code block
     */
    public static String codeBlock(String text) {
        return "<pre>" + escapeHtml(text) + "</pre>";
    }
}
