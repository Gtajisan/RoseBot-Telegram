# 📝 Logger

SLF4J logging configuration.

## Configuration

Using SLF4J with Logback backend:
- Set log levels in `application.conf`
- Logs appear in console and optional file output

## Log Levels

- **DEBUG** - Detailed debug information
- **INFO** - General information
- **WARN** - Warning messages
- **ERROR** - Error messages

## Usage

```java
private static final Logger logger = LoggerFactory.getLogger(ClassName.class);
logger.info("ℹ️ Message");
logger.error("❌ Error");
```

## Emojis in Logs

Using emojis for better readability:
- 🔧 Tools
- 📝 Operations
- ✅ Success
- ❌ Error
- 📡 Events
- 💾 Database
- 🤖 Bot
