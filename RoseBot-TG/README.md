# 🌹 Rose Bot - Telegram Version

A modular Telegram bot built with Java, combining the architecture of Rose-Bot and GoatBot-V2.

## Features

- 🤖 **Modular Command System** - Easy to add new commands
- 🔐 **Admin Management** - User ban/kick functionality  
- 📊 **Statistics & Monitoring** - Track bot usage
- ⚙️ **Configuration Management** - Environment-based config
- 📝 **Logging & Error Handling** - Comprehensive logging
- 💾 **Database Support** - SQLite/MySQL ready

## Requirements

- Java 11+
- Maven 3.6+
- Telegram Bot Token (from @BotFather)

## Setup

### 1. Clone & Build
```bash
mvn clean package
```

### 2. Configure
Set environment variables:
```bash
export BOT_TOKEN="your_telegram_bot_token"
export BOT_USERNAME="your_bot_username"
export BOT_OWNERS="your_user_id"
```

Or edit `src/main/resources/application.conf`

### 3. Run
```bash
mvn exec:java -Dexec.mainClass="com.rosebot.RoseBotMain"
```

Or with jar:
```bash
java -jar target/RoseBot-TG-1.0.0-jar-with-dependencies.jar
```

## Project Structure

```
RoseBot-TG/
├── src/main/java/com/rosebot/
│   ├── RoseBotMain.java          # Entry point
│   ├── core/
│   │   └── RoseBot.java          # Main bot class
│   ├── commands/
│   │   ├── ICommand.java         # Command interface
│   │   ├── CommandRouter.java    # Command routing
│   │   └── impl/                 # Command implementations
│   ├── handlers/
│   │   └── UpdateHandler.java    # Update routing
│   ├── config/
│   │   └── Config.java           # Configuration management
│   ├── database/                 # Database layer (TODO)
│   └── utils/                    # Utilities (TODO)
├── src/main/resources/
│   └── application.conf          # Configuration file
└── pom.xml                       # Maven configuration
```

## Available Commands

### Core
- `/start` - Welcome message
- `/help` - Show all commands
- `/ping` - Bot status

### Admin
- `/admin` - Admin panel
- `/ban <user_id>` - Ban user
- `/kick <user_id>` - Kick user

### Owner
- `/stats` - Bot statistics
- `/status` - Bot status & metrics

## Adding New Commands

1. Create command class implementing `ICommand` in `commands/impl/`
2. Register in `CommandRouter.registerCommands()`

Example:
```java
public class MyCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        bot.sendMessage(message.getChatId(), "Hello!");
    }
    // ... implement other methods
}
```

## Database (Coming Soon)

SQLite and MySQL support with ORM integration.

## Logging

Default log level: INFO
Change with `LOG_LEVEL` environment variable

## Error Handling

All errors are logged and user-friendly messages sent to chat.

## License

MIT License - See LICENSE file

## Author

Rose Bot - Telegram Version
Based on Rose-Bot and GoatBot-V2 architectures
