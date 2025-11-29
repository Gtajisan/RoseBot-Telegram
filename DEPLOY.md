# 🌹 ROSE BOT - Telegram Edition

## ✅ Production Ready - Deploy Now

### 🚀 Quick Start

```bash
# 1. Set your Telegram bot token
# Edit config.json and replace:
# "token": "YOUR_BOT_TOKEN_HERE"
# with your actual bot token from @BotFather

# 2. Install dependencies (if needed)
npm install

# 3. Start the bot
npm start
```

### 📋 Bot Features

**56 Total Commands:**
- ✅ 20 Rose Bot commands (admin, moderation, welcome, locks, filters, warns)
- ✅ 20 Baka-Chan commands (anime, edit, ship, translate, calc, meme, waifu)
- ✅ 16 Core commands (help, ping, info, stats, id, whois, etc.)

**Architecture:**
- ✅ Telegram polling with Telegraf
- ✅ SQLite database (user & chat tracking)
- ✅ Command cooldowns & permission checks
- ✅ Express API dashboard on port 3000
- ✅ Professional logging
- ✅ Auto-loading from `/scripts/commands/`
- ✅ Global error handling
- ✅ Image commands with loading indicators (waifu, meme)

### 📁 Project Structure

```
/
├── index.js              ← Main bot entry point
├── Goat.js               ← Telegram API gateway
├── config.json           ← Bot configuration
├── package.json          ← Dependencies
├── scripts/
│   ├── commands/         ← 56 auto-loaded commands
│   └── events/           ← Event handlers
├── bot/
│   ├── handlers/         ← Command & Event loaders
│   └── api/telegram/     ← Telegram API wrapper
├── database/             ← SQLite storage
├── logger/               ← Logging system
└── dashboard/            ← REST API
```

### ⚙️ Configuration

Edit `config.json`:
```json
{
  "bot": {
    "prefix": "/"
  },
  "telegram": {
    "token": "YOUR_BOT_TOKEN_HERE"
  },
  "api": {
    "port": 3000
  }
}
```

### 🎮 Commands Available

**Admin:** `/promote`, `/demote`, `/adminlist`, `/ban`, `/kick`, `/mute`, `/unmute`

**Moderation:** `/warn`, `/warns`, `/rmwarn`, `/lock`, `/unlock`, `/filter`

**Welcome:** `/welcome`, `/goodbye`, `/setwelcome`, `/setgoodbye`

**Fun:** `/anime`, `/manga`, `/waifu`, `/ship`, `/slap`, `/hug`, `/kiss`, `/meme`, `/quote`

**Utilities:** `/id`, `/chatinfo`, `/whois`, `/calc`, `/translate`, `/edit`, `/pin`, `/purge`

**Core:** `/help`, `/menu`, `/ping`, `/info`, `/stats`, `/uptime`, `/start`

### 🔍 Testing

Test bot startup:
```bash
node -c index.js        # Check syntax
npm start               # Start bot
```

Check API:
```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/stats
curl http://localhost:3000/api/commands
```

### 📊 Dashboard API

- `GET /` - Health check
- `GET /api/health` - API status
- `GET /api/stats` - Bot statistics
- `GET /api/commands` - List all commands

### 🐛 Error Handling

✅ Global unhandled rejections caught
✅ Uncaught exceptions logged
✅ Command errors wrapped in try/catch
✅ API errors handled gracefully
✅ Image commands with fallback errors

### 📦 Dependencies

- `telegraf` - Telegram Bot API
- `express` - REST API
- `better-sqlite3` - Database
- `axios` - HTTP client (image commands)
- `dotenv` - Environment variables
- `node-fetch` - Fallback HTTP
- `chalk` - Console colors

### 🚀 Deploy to Replit

1. Click "Run App" button in Replit
2. Bot will start with polling enabled
3. API dashboard on http://localhost:3000
4. All commands auto-loaded and ready

### ✅ Production Checklist

- ✅ All 56 commands syntax validated
- ✅ Telegram API wrapper complete
- ✅ Error handling in place
- ✅ Database initialized
- ✅ Logging configured
- ✅ Cooldowns & permissions working
- ✅ Image commands with APIs
- ✅ Ready for deployment

---

**Bot Status:** 🟢 READY TO DEPLOY

Questions? Check `/help` command in Telegram.
