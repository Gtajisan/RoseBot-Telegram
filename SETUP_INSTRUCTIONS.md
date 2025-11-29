# Rose Bot Telegram - Setup Instructions

## Project Created Successfully! 🎉

Your Java Telegram bot has been built combining Rose-Bot and GoatBot-V2 architectures.

## 🚀 Quick Start

### 1. Get Your Telegram Bot Token
1. Open Telegram and search for `@BotFather`
2. Use `/newbot` to create a new bot
3. Copy the API token provided

### 2. Configure the Bot
Create a `.env` file in the project root:
```
BOT_TOKEN=your_bot_token_here
BOT_USERNAME=your_bot_username
BOT_OWNERS=your_user_id_here
```

Or set environment variables:
```bash
export BOT_TOKEN="..."
export BOT_USERNAME="..."
export BOT_OWNERS="..."
```

### 3. Build & Run
```bash
cd RoseBot-TG
mvn clean package
java -jar target/RoseBot-TG-1.0.0-jar-with-dependencies.jar
```

Or with Maven directly:
```bash
mvn exec:java -Dexec.mainClass="com.rosebot.RoseBotMain"
```

## Project Structure

- **`RoseBotMain.java`** - Entry point
- **`core/RoseBot.java`** - Main bot class  
- **`commands/`** - Command system
- **`handlers/`** - Update routing
- **`config/`** - Configuration management
- **`database/`** - Database layer (ready for expansion)
- **`utils/`** - Utility functions (ready for expansion)

## Available Commands

```
/start    - Welcome
/help     - Show commands
/ping     - Bot status
/admin    - Admin panel
/ban      - Ban user
/kick     - Kick user
/stats    - Statistics
/status   - Bot info
```

## Adding New Commands

1. Create a class in `src/main/java/com/rosebot/commands/impl/`
2. Implement `ICommand` interface
3. Register in `CommandRouter.registerCommands()`

Example:
```java
public class GreetCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        bot.sendMessage(message.getChatId(), "Hello " + message.getFrom().getFirstName());
    }
    
    @Override
    public String getName() { return "greet"; }
    
    @Override
    public String getDescription() { return "Greet user"; }
    
    @Override
    public String getUsage() { return "/greet"; }
}
```

## Architecture Overview

### Modular Design (Rose-Bot style)
- Commands are modules that can be added/removed independently
- Clean separation of concerns
- Easy to test individual components

### Feature Set (GoatBot style)  
- Admin management
- User tracking
- Statistics & monitoring
- Extensible database layer

### Java Tech Stack
- **TelegramBots** - Telegram Bot API wrapper
- **Typesafe Config** - Configuration management
- **SLF4J + Logback** - Logging
- **SQLite** - Local database (ready to use)
- **Gson** - JSON processing
- **OkHttp** - HTTP requests

## Expansion Roadmap

### Database Layer
```
database/
├── DatabaseManager.java
├── models/
│   ├── User.java
│   └── Chat.java
└── repositories/
    ├── UserRepository.java
    └── ChatRepository.java
```

### Utilities
```
utils/
├── MessageUtils.java
├── FormatterUtils.java
├── ValidationUtils.java
└── ApiUtils.java
```

### Advanced Features
- User permission system
- Database user tracking
- Command permissions & aliases
- Multi-language support
- Inline buttons & keyboards
- File handling

## Logging

Set log level:
```bash
export LOG_LEVEL=DEBUG
```

Log output shows:
- `🌹` Bot initialization
- `⚙️` Command execution  
- `📨` Message received
- `❌` Errors
- `✅` Successful operations

## Environment Variables

```bash
BOT_TOKEN        - Telegram Bot API token (required)
BOT_USERNAME     - Bot's Telegram username
BOT_OWNERS       - Comma-separated owner user IDs
DB_PATH          - Database file path (default: data/rose.db)
LOG_LEVEL        - Logging level (default: INFO)
```

## Common Issues

### Bot Not Responding
- Check BOT_TOKEN is correct
- Verify internet connection
- Check logs for errors

### Maven Build Failed
- Ensure Java 11+ installed
- Run: `mvn clean install`
- Check Maven cache: `rm -rf ~/.m2/repository`

### Permission Denied
- Run with: `chmod +x ./run.sh`
- Or: `java -jar target/*.jar`

## Next Steps

1. ✅ Project created
2. ⏳ Configure bot token
3. ⏳ Add your first custom command
4. ⏳ Setup database (optional)
5. ⏳ Deploy to VPS or Replit

## Support

For issues:
- Check logs in console output
- Review command implementation
- Verify Telegram Bot API docs: https://core.telegram.org/bots

---

**Happy botting! 🤖🌹**
