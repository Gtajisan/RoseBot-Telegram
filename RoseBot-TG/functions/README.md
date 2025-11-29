# 🛠️ Functions & Utilities

Utility functions organized like GoatBot-V2.

## Utilities

- **MessageUtils.java** - Message formatting (bold, italic, mentions, buttons)
- **FormatterUtils.java** - Data formatting (bytes, time, numbers)

## Methods

### MessageUtils
- `bold(text)` - Format bold text
- `mention(userId, name)` - Create mention link
- `createButton(text, callback)` - Create inline button
- `buildMessage(chatId, text)` - Build message

### FormatterUtils
- `formatBytes(bytes)` - Convert to human readable
- `formatDuration(millis)` - Format time duration
- `formatTime(timestamp)` - Format timestamp
- `progressBar(current, max)` - Create progress bar

## Usage

```java
MessageUtils.bold("Text")
FormatterUtils.formatBytes(1024 * 1024)
```
