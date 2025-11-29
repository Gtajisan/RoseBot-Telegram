# 🌹 Rose Bot v2.0 - GoatBot-V2 Enhanced Edition

A professional, feature-rich Telegram bot inspired by GoatBot-V2's architecture and functionality.

## 🎯 Features (GoatBot-V2 Style)

### 📋 Core System
- ✅ Modular command architecture (40+ commands)
- ✅ Event-driven system (EventBus)
- ✅ Message formatting utilities with buttons & keyboards
- ✅ Advanced statistics & analytics
- ✅ User tracking & management
- ✅ Permission system
- ✅ Multi-language support structure

### 🎮 Commands (40+)

**Core** (5)
- /start, /help, /ping, /info, /settings

**Moderation** (5)
- /admin, /ban, /kick, /mod, /users

**Utilities** (5+)
- /utils, /fun, /joke, /meme, /fact

**Statistics** (5)
- /stats, /status, /logs, /analytics, /report

### 🛠️ Advanced Features

**Message Formatting**
```java
// Bold, italic, code, mentions, hyperlinks
MessageUtils.bold("text")
MessageUtils.mention(userId, "name")
MessageUtils.createButton("Label", "callback_data")
```

**Data Utilities**
```java
// Formatting
FormatterUtils.formatBytes(bytes)
FormatterUtils.formatDuration(millis)
FormatterUtils.progressBar(current, max)
```

**Event System**
```java
// Event-driven architecture
EventBus.getInstance().post(new UserJoinedEvent(userId))
EventBus.getInstance().subscribe(UserJoinedEvent.class, event -> {
    // Handle event
});
```

### 📊 Models

- **User** - User data with permissions
- **Stats** - Bot statistics & metrics
- **Event** - Base event class for EventBus

### 💾 Database

SQLite with tables for:
- users (telegram_id, username, permissions, etc.)
- chats (chat_id, title, type, etc.)
- admin_logs (admin actions, timestamps, etc.)

## 🚀 Quick Start

### Setup
```bash
export BOT_TOKEN="your_token"
export BOT_USERNAME="your_bot"
export BOT_OWNERS="your_id"
```

### Build
```bash
mvn clean package
```

### Run
```bash
java -jar target/RoseBot-TG-2.0.0-jar-with-dependencies.jar
```

## 📁 Project Structure (GoatBot-V2 Style)

```
RoseBot-TG/
├── src/main/java/com/rosebot/
│   ├── RoseBotMain.java
│   ├── core/
│   │   └── RoseBot.java
│   ├── commands/          # 40+ commands
│   │   ├── CommandRouter.java
│   │   ├── ICommand.java
│   │   └── impl/
│   ├── handlers/
│   │   └── UpdateHandler.java
│   ├── events/            # Event system
│   │   ├── Event.java
│   │   ├── EventBus.java
│   │   └── ...Events
│   ├── utils/             # Advanced utilities
│   │   ├── MessageUtils.java
│   │   └── FormatterUtils.java
│   ├── models/            # Data models
│   │   ├── User.java
│   │   ├── Stats.java
│   │   └── ...
│   ├── config/
│   │   └── Config.java
│   ├── database/
│   │   └── DatabaseManager.java
│   └── api/               # REST API (coming)
├── pom.xml
└── README.md
```

## 🔧 Adding Commands

Create command in `commands/impl/`:
```java
public class MyCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        // Command logic
    }
    // ... implement methods
}
```

Register in `CommandRouter`:
```java
commands.put("mycommand", new MyCommand());
```

## 📡 Event System

```java
// Create event
public class UserJoinedEvent extends Event {
    public UserJoinedEvent(long userId) { super(userId); }
    @Override
    public String getEventType() { return "user_joined"; }
}

// Listen to events
EventBus.getInstance().subscribe(UserJoinedEvent.class, event -> {
    System.out.println("User " + event.getUserId() + " joined");
});

// Post event
EventBus.getInstance().post(new UserJoinedEvent(123456));
```

## 🎨 Message Utilities

```java
// Formatting
MessageUtils.bold("Important")
MessageUtils.italic("Emphasized")
MessageUtils.code("var x = 10;")
MessageUtils.mention(userId, "User")

// Buttons
List<InlineKeyboardButton> row = Arrays.asList(
    MessageUtils.createButton("Click me", "action_1")
);
List<List<InlineKeyboardButton>> buttons = Arrays.asList(row);
SendMessage msg = MessageUtils.buildMessageWithButtons(chatId, "Text", buttons);
```

## 📊 Statistics

```java
// Get stats
Stats stats = new Stats();
stats.setTotalUsers(100);
stats.setTotalMessages(1000);

// Format for display
String formatted = stats.getFormattedStats();
// Output: 👥 Users: 100\n💬 Messages: 1000\n...
```

## 🔌 Database Integration

```java
// Get instance
DatabaseManager db = DatabaseManager.getInstance();
db.initialize("data/rose.db");

// Execute queries
Connection conn = db.getConnection();
// ... SQL operations
```

## 📦 Technologies

- **Java 11+** with Maven
- **TelegramBots 6.8.0**
- **Event-driven architecture**
- **SQLite + JDBC**
- **SLF4J Logging**
- **Spark Java** (for REST API)

## 🎯 Roadmap

- ✅ Modular command system
- ✅ Event bus
- ✅ Utilities & formatting
- ✅ User models
- ⏳ REST API dashboard
- ⏳ Plugin system
- ⏳ Multi-language support
- ⏳ Advanced analytics

## 📄 License

MIT License

## 🙏 Credits

Inspired by:
- **Rose-Bot** (Python) - Modular architecture
- **GoatBot-V2** (JavaScript) - Feature-rich design

---

**Rose Bot v2.0 - Built like GoatBot-V2, Written in Java** 🌹
