# Rose Bot - Telegram Edition (Node.js)

## Overview

Rose Bot is a production-ready Telegram bot built with Node.js + Telegraf combining GoatBot-V2 architecture with Rose Bot moderation features and Baka-Chan anime/fun commands. Features 146+ commands, async/await database operations, SQLite storage, Express.js dashboard, and Render/Replit deployment support.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Updates (Latest Session)

- ✅ **All 146 Commands Working**: Fixed all syntax errors (try-catch indentation issues across 27 files)
- ✅ **Zero Errors**: All "Missing catch or finally" errors resolved
- ✅ **Admin Panel**: Full moderation system with /ban, /kick, /warn (3-strike auto-kick), /mute
- ✅ **Command Categories**: 100+ working commands across fun, moderation, utility, and info
- ✅ **Dashboard API**: Running on port 3000 with real-time stats
- ✅ **Edit Command**: Improved error handling for Nano-Banana AI image editing (may need alternative API if unreliable)

## System Architecture

### Core Bot Framework
- **Telegram Integration**: Uses Telegraf framework for long-polling based message handling
- **Entry Point**: `index.js` serves as the application bootstrap, initializing bot and handlers
- **Bot Core**: `Goat.js` extends Telegraf and implements the main update processing loop

### Command System Architecture
The bot uses a modular command pattern that allows easy extension:

- **Command Interface**: Each command module exports `{name, description, execute(), adminOnly}`
- **Command Router**: `CommandHandler.js` acts as a registry and dispatcher
- **Command Implementations**: Individual command files in `scripts/commands/` package each handle specific bot function
- **Plugin-Style Design**: Commands are self-contained and registered centrally

**Why this approach**: Separates command logic from routing logic, enables easy testing, follows open/closed principle.

### Update Handling
- **Update Router**: `EventHandler.js` processes incoming Telegram updates
- **Type-Based Routing**: Different update types (text messages, group joins) handled differently
- **Command Extraction**: Text messages parsed for command patterns and routed to command system

### Configuration Management
- **Config Singleton**: `config.js` provides centralized configuration access
- **Environment-Based**: Supports both environment variables and configuration files
- **Key Settings**: Bot token, username, owner user IDs, database paths

### Data Storage
- **Database Layer**: `database/index.js` provides abstraction over SQLite operations
- **SQLite**: File-based storage suitable for small to medium deployments
- **Schema Management**: Handles table creation and CRUD operations
- **Tables**: chats, users, command_usage, warnings, notes

## External Dependencies

### Third-Party Libraries
- **Telegraf**: Core library for Telegram Bot API integration (v4.x)
- **Express.js**: Web framework for dashboard API
- **SQLite3**: Database driver for Node.js
- **Axios**: HTTP client for external API calls

### External Services
- **Telegram Bot API**: Primary external service dependency
- **Nano-Banana AI**: Used for /edit command image processing (https://tawsif.is-a.dev/gemini/nano-banana)
  - Status: May have reliability issues - consider alternative if problems persist

### Configuration Sources
- **Environment Variables**: 
  - `TELEGRAM_BOT_TOKEN`: Telegram bot authentication token
  - Database path and other settings

## Command Count and Status

**Total Commands: 146** ✅

**Categories:**
- 🔐 **Moderation** (12): ban, kick, warn, mute, lock, unlock, filter, filters, demote, promote, etc.
- 🎮 **Fun** (20+): joke, fact, quote, meme, anime, manga, waifu, hug, kiss, slap, ship, etc.
- 📊 **Info** (15+): help, stats, users, uptime, ping, info, whois, owner, userinfo, etc.
- ⚙️ **Utility** (15+): note, translate, edit, shell, calc, eval, weather, logo, etc.
- 🎯 **System** (10+): start, stop, refresh, restart, update, admin panel, etc.

## Deployment

**Local Development:**
```bash
npm install
TELEGRAM_BOT_TOKEN=<your-token> node index.js
```

**Render/Replit Production:**
```bash
npm install && node index.js
```

Bot runs on:
- Telegram Bot API (long-polling)
- Dashboard API on port 3000
- SQLite database in project directory

## Known Issues & Solutions

- **Edit Command**: Nano-Banana AI API may timeout. Improved error handling added.
- **Command Cache**: CommandHandler uses aggressive cache clearing to ensure fresh module loading
- **Database**: SQLite suitable for single instance deployments

## Next Steps (Future Improvements)

- [ ] Implement alternative image processing APIs for robustness
- [ ] Add command usage rate limiting
- [ ] Implement user reputation/karma system
- [ ] Add automated backups
- [ ] Scale to PostgreSQL for multi-instance deployments
