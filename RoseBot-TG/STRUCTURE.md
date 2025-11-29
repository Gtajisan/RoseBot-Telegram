# 🌹 Rose Bot Project Structure (GoatBot-V2 Style)

```
RoseBot-TG/
├── 📁 .github/
│   └── workflows/
│       └── build.yml           # GitHub Actions CI/CD
│
├── 📁 bot/                     # Bot commands & handlers
│   ├── README.md
│   └── (Contains command documentation)
│
├── 📁 dashboard/               # REST API endpoints
│   └── README.md
│       (DashboardAPI.java)
│
├── 📁 database/                # Database layer
│   └── README.md
│       (DatabaseManager.java, SQLite schema)
│
├── 📁 functions/               # Utility functions
│   └── README.md
│       (MessageUtils.java, FormatterUtils.java)
│
├── 📁 languages/               # Multi-language support
│   └── README.md
│       (Language interface, LanguageManager)
│
├── 📁 logger/                  # Logging configuration
│   └── README.md
│       (SLF4J with Logback)
│
├── 📁 scripts/                 # Helper scripts
│   ├── build.sh               # Build script
│   ├── run.sh                 # Run script
│   ├── clean.sh               # Clean script
│   └── README.md
│
├── 📁 src/                     # Maven source code
│   └── main/java/com/rosebot/
│       ├── RoseBotMain.java
│       ├── core/               # RoseBot.java
│       ├── commands/           # Command system
│       ├── handlers/           # Message handlers
│       ├── events/             # EventBus system
│       ├── utils/              # Utilities
│       ├── models/             # Data models
│       ├── config/             # Config management
│       ├── database/           # Database layer
│       ├── languages/          # Language support
│       └── api/                # REST API
│
├── 📁 .vscode/                 # VSCode settings
│
├── 📄 config.json              # Bot configuration
├── 📄 package.json             # Project metadata
├── 📄 pom.xml                  # Maven configuration
├── 📄 .gitignore               # Git ignore rules
├── 📄 README.md                # Main documentation
├── 📄 STRUCTURE.md             # This file
├── 📄 COMMAND_STRUCTURE.md     # Command documentation
├── 📄 VERSION_2.0.md           # Version info
├── 📄 GOATBOT_FEATURES.md      # Feature comparison
└── 📄 FINAL_SUMMARY.md         # Project summary
```

## Directory Details

### 🤖 `bot/`
Command implementations and handlers
- See `bot/README.md` for details
- Commands in `src/main/java/com/rosebot/commands/impl/`

### 📊 `dashboard/`
REST API endpoints for monitoring
- `GET /api/stats` - Statistics
- `GET /api/health` - Health check
- `GET /api/status` - Status info

### 💾 `database/`
Database layer using SQLite + JDBC
- Users, Chats, Admin Logs tables
- Data models for each table

### 🛠️ `functions/`
Utility functions
- Message formatting (MessageUtils)
- Data formatting (FormatterUtils)

### 🌐 `languages/`
Multi-language support
- Language interface
- EnglishLanguage implementation
- Ready for more languages

### 📝 `logger/`
Logging configuration
- SLF4J + Logback
- Emoji-enhanced log messages

### 🚀 `scripts/`
Helper bash scripts
- `build.sh` - Build Maven project
- `run.sh` - Run the bot
- `clean.sh` - Clean artifacts

### 📁 `.github/`
GitHub repository configuration
- GitHub Actions workflows
- CI/CD automation

### 📁 `src/`
Maven project source code
- Java source in `src/main/java/`
- Organized by package

## File Organization

### Configuration Files
- `config.json` - Bot configuration
- `package.json` - Project metadata
- `pom.xml` - Maven build config

### Documentation
- `README.md` - Main documentation
- `STRUCTURE.md` - This file
- `COMMAND_STRUCTURE.md` - Command guide
- `VERSION_2.0.md` - Version details
- Individual `README.md` in each directory

## How It Matches GoatBot-V2

✅ Top-level functional directories (bot, dashboard, database, etc.)
✅ Scripts folder for helper tools
✅ Languages folder for i18n support
✅ Functions folder for utilities
✅ GitHub Actions for CI/CD
✅ Clear separation of concerns
✅ Consistent README in each folder
✅ Config files at root level

## Quick Navigation

- **Add command?** → `src/main/java/com/rosebot/commands/impl/` + register in CommandRouter
- **Add utility?** → `src/main/java/com/rosebot/utils/` + update FunctionUtils
- **Add language?** → `src/main/java/com/rosebot/languages/` + register in LanguageManager
- **Add API endpoint?** → `src/main/java/com/rosebot/api/DashboardAPI.java`
- **View docs?** → Check individual `README.md` files

---

**Rose Bot follows GoatBot-V2 directory structure for better organization!** 🌹
