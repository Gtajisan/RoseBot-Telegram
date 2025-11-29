# 🌹 Rose Bot - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Get Bot Token
```
1. Open Telegram → Search @BotFather
2. Send /newbot
3. Copy the token
```

### 2. Configure
```bash
cd RoseBot-TG
export BOT_TOKEN="your_token_here"
export BOT_USERNAME="your_bot_name"
export BOT_OWNERS="your_user_id"
```

### 3. Build
```bash
mvn clean package
```

### 4. Run
```bash
java -jar target/RoseBot-TG-1.0.0-jar-with-dependencies.jar
```

## ✅ What You Get

✅ Modular command system (add commands easily)
✅ Admin functions (ban, kick, stats)
✅ Database ready (SQLite included)
✅ Professional logging & error handling
✅ Configuration management
✅ 8 example commands included

## 📚 Next Steps

1. **Add your first command** - See `src/main/java/com/rosebot/commands/impl/`
2. **Setup database** - Uncomment database init in RoseBotMain.java
3. **Deploy** - Use Replit, VPS, or local machine
4. **Customize** - Edit application.conf for your settings

## 🔧 Architecture

```
RoseBot (Telegram API) 
  ↓
RoseBot.java (Main bot class)
  ↓
UpdateHandler (Route updates)
  ├─ Message → CommandRouter → Commands
  ├─ Callback → Button handlers
  └─ Inline → Search handlers
  ↓
Database (SQLite/MySQL)
```

## 📝 Key Files

| File | Purpose |
|------|---------|
| `RoseBotMain.java` | Entry point |
| `core/RoseBot.java` | Main bot class |
| `commands/CommandRouter.java` | Command routing |
| `handlers/UpdateHandler.java` | Update handling |
| `config/Config.java` | Configuration |
| `database/DatabaseManager.java` | Database layer |

## 🎯 Common Tasks

### Add a new command
```java
// 1. Create file in commands/impl/
public class MyCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        bot.sendMessage(message.getChatId(), "Hello!");
    }
    // ... implement methods
}

// 2. Register in CommandRouter
commands.put("mycommand", new MyCommand());
```

### Send formatted message
```java
bot.sendSuccess(chatId, "Operation successful!");
bot.sendError(chatId, "Something went wrong!");
bot.sendMessage(chatId, "Custom message with <b>HTML</b>");
```

### Access user info
```java
long userId = message.getFrom().getId();
String userName = message.getFrom().getUserName();
String firstName = message.getFrom().getFirstName();
```

## 🚀 Deployment

### Replit
1. Upload project
2. Set BOT_TOKEN in Secrets
3. Run `./run.sh`

### VPS/Linux
```bash
java -jar target/RoseBot-TG-1.0.0-jar-with-dependencies.jar &
```

### Docker (Optional)
Create `Dockerfile`:
```dockerfile
FROM maven:3.8-openjdk-11
WORKDIR /app
COPY . .
RUN mvn clean package
CMD ["java", "-jar", "target/RoseBot-TG-1.0.0-jar-with-dependencies.jar"]
```

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| Bot not responding | Check BOT_TOKEN, verify internet |
| Build fails | Install Java 11+, run `mvn clean install` |
| Database error | Check `data/` directory exists |
| Permission denied | Run: `chmod +x run.sh` |

## 📞 Support

- Check logs for errors
- Review command implementations  
- See full docs in `README.md`
- Telegram Bot API: https://core.telegram.org/bots

---

**You're all set! Your bot is ready. 🎉**
