# 🌹 Rose Bot - Telegram Edition

Professional modular Telegram bot built with GoatBot-V2 architecture in Node.js.

**👨‍💻 Developer:** Gtajisan  
**📧 Email:** ffjisan804@gmail.com  
**📝 Based on:** GoatBot-V2, Rose Bot, Baka-Chan-v1

## 🚀 Quick Start

### 1. Get Bot Token
- Open Telegram → Search `@BotFather`
- Send `/newbot` and follow prompts
- Copy your token

### 2. Install
```bash
npm install
```

### 3. Configure
Edit `config.json` and add your token:
```json
{
  "telegram": {
    "token": "YOUR_BOT_TOKEN_HERE"
  }
}
```

Add your ID to `configCommands.json`:
```json
{
  "owners": ["YOUR_USER_ID"]
}
```

### 4. Run
```bash
npm start
```

### 5. Test
Open your bot in Telegram and type `/help`

## 📁 Project Structure

```
RoseBot-Telegram/
├── bot/
│   ├── api/telegram/      # Telegram API wrapper
│   ├── handlers/          # Command & event handlers
│   ├── events/            # Event listeners
│   └── cache/             # Caching layer
├── scripts/
│   ├── commands/          # Command implementations
│   └── events/            # Event implementations
├── database/              # SQLite storage
├── dashboard/             # Express.js API
├── func/                  # Utility functions
├── languages/             # i18n support
├── logger/                # Logging system
├── Goat.js                # Main bot class
├── index.js               # Entry point
├── config.json            # Configuration
├── configCommands.json    # Command config
└── versions.json          # Version info
```

## ✨ Features

✅ **Auto-loading Commands** - Drop .js in `scripts/commands/`
✅ **Event System** - Auto-loads from `scripts/events/`
✅ **Cooldowns** - Per-user command cooldown
✅ **Admin System** - Owner/admin permissions
✅ **Database** - SQLite for users, chats, stats
✅ **REST API** - Express.js dashboard
✅ **Logging** - Colored emoji logs
✅ **Multi-language** - i18n structure

## 📝 Commands

### Built-in Commands
- `/help` - Show all commands
- `/ping` - Check latency
- `/info` - Bot information  
- `/owner` - Show owner
- `/stats` - Bot statistics (admin)
- `/uptime` - Show uptime

### Add New Command

Create file in `scripts/commands/`:

```javascript
module.exports = {
  name: 'hello',
  description: 'Say hello',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    const name = ctx.from.first_name;
    await goat.reply(ctx, `👋 Hello ${name}!`);
  }
};
```

## 📡 Events

### Built-in Events
- `message` - Incoming message
- `group_join` - Bot added to group

### Add New Event

Create file in `scripts/events/`:

```javascript
module.exports = {
  event: 'mention',
  description: 'Bot mentioned',

  async execute(ctx, goat, db, config) {
    await goat.reply(ctx, 'Yes?');
  }
};
```

## 💾 Database

### Methods
```javascript
db.addUser(userId, data)
db.getUser(userId)
db.addChat(chatId, data)
db.getStats()
```

## 🔌 API Endpoints

Base URL: `http://localhost:3000`

- `GET /` - Status
- `GET /api/health` - Health check
- `GET /api/stats` - Statistics
- `GET /api/commands` - All commands

## ⚙️ Configuration

### config.json
```json
{
  "bot": {
    "name": "Rose Bot",
    "prefix": "/"
  },
  "telegram": {
    "token": "YOUR_TOKEN",
    "polling": {
      "timeout": 30
    }
  },
  "api": {
    "port": 3000
  },
  "cooldown": {
    "default": 3000
  }
}
```

### configCommands.json
```json
{
  "owners": ["YOUR_ID"],
  "commands": {
    "help": {"enabled": true, "adminOnly": false},
    "stats": {"enabled": true, "adminOnly": true}
  }
}
```

## 🌐 Utilities

### Message Formatting
```javascript
const { bold, italic, code, mention } = require('./func/utils');

bold('text')
italic('text')
code('code')
mention(userId, 'name')
```

### Data Formatting
```javascript
const { formatBytes, formatDuration } = require('./func/utils');

formatBytes(1024 * 1024)  // 1 MB
formatDuration(60000)     // 1m 0s
```

## 🔒 Security

- User ban system
- Admin-only commands
- Cooldown anti-spam
- Trusted owner system
- Error handling

## 📊 Logging

Colored logs with emoji:
```
ℹ️ [INFO] Message
❌ [ERROR] Something failed
⚠️ [WARN] Warning
🔍 [DEBUG] Debug info
```

## 🚀 Deployment

### Replit
1. Create new Node.js project
2. Clone repository
3. `npm install`
4. Set `BOT_TOKEN` in Secrets
5. Run

### Local/VPS
```bash
npm install
npm start
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

## 📦 Dependencies

- `telegraf` - Telegram Bot API
- `express` - REST API
- `better-sqlite3` - Database

## 🔄 Auto-reload

Commands and events auto-load on restart. No need to restart bot to add commands!

## 📞 Support

- Check `/help` in Telegram
- Read `DOCS.md` for detailed documentation
- Check command descriptions

## 📝 Version

Current version: **2.0.0** (Build 001)

See `CHANGELOG.md` for updates.

---

**Made with ❤️ by Rose Bot Team** 🌹

Built like GoatBot-V2, powered by Node.js and Telegram API
