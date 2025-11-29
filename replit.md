# Rose Bot - Telegram Edition

## Overview

Rose Bot is a professional, modular Telegram bot built in Java that combines architectural patterns from Rose-Bot and GoatBot-V2. The bot provides a foundation for building feature-rich Telegram applications with admin management, user moderation, and extensible command handling. It's designed as a Maven project with clear separation of concerns and a plugin-style command system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Bot Framework
- **Telegram Integration**: Uses TelegramBots API v6.8.0 (org.telegram.telegrambots library) for long-polling based message handling
- **Entry Point**: `RoseBotMain.java` serves as the application bootstrap, initializing the bot instance and registering it with the Telegram Bot API
- **Bot Core**: `RoseBot.java` extends `TelegramLongPollingBot` and implements the main update processing loop

### Command System Architecture
The bot uses a modular command pattern that allows easy extension:

- **Command Interface**: `ICommand.java` defines the contract for all commands (execute method, name, description, admin-only flag)
- **Command Router**: `CommandRouter.java` acts as a registry and dispatcher, mapping command names to their implementations
- **Command Implementations**: Individual command classes in `commands/impl/` package each handle a specific bot function
- **Plugin-Style Design**: Commands are self-contained and registered centrally, making it trivial to add new features without modifying core code

**Why this approach**: Separates command logic from routing logic, enables easy testing, and follows the open/closed principle (open for extension, closed for modification).

### Update Handling
- **Update Router**: `UpdateHandler.java` processes incoming Telegram updates and routes them to appropriate handlers based on type (messages, callbacks, inline queries)
- **Type-Based Routing**: Different update types (text messages, callback queries, inline queries) can be handled differently
- **Command Extraction**: Text messages are parsed for command patterns (messages starting with "/") and routed to the command system

**Rationale**: Centralizes update processing logic and allows for future expansion to handle callbacks, inline queries, and other Telegram features beyond simple commands.

### Configuration Management
- **Config Singleton**: `Config.java` provides centralized configuration access
- **Environment-Based**: Supports both environment variables and configuration files
- **Key Settings**: Bot token, username, owner user IDs, database paths
- **Config File**: `application.conf` serves as the default configuration source

**Design Decision**: Environment variables take precedence over config files, enabling easy deployment across different environments (development, staging, production) without code changes.

### Data Storage
- **Database Layer**: `DatabaseManager.java` provides abstraction over database operations
- **SQLite Default**: Uses SQLite for local storage (suitable for small to medium deployments)
- **Schema Management**: Handles table creation and basic CRUD operations
- **Extensibility**: Designed to support migration to MySQL/PostgreSQL for larger deployments

**Alternatives Considered**: 
- Pure in-memory storage (rejected due to data loss on restart)
- Direct JDBC calls throughout code (rejected to maintain separation of concerns)

### Logging & Error Handling
- **SLF4J Framework**: Uses industry-standard logging abstraction
- **Log Levels**: Structured logging for different severity levels (info, debug, error)
- **Error Recovery**: Bot continues operation even if individual command processing fails

### Build System
- **Maven**: Standard Java build tool for dependency management and packaging
- **Executable JAR**: Configured to build a fat JAR with all dependencies bundled
- **Version**: 1.0.0 following semantic versioning

## External Dependencies

### Third-Party Libraries
- **TelegramBots API (v6.8.0)**: Core library for Telegram Bot API integration
  - Provides `TelegramLongPollingBot` base class
  - Handles HTTP communication with Telegram servers
  - Includes models for all Telegram entities (messages, users, chats)

- **SLF4J**: Logging facade for Java applications
  - Allows switching logging implementations without code changes
  - Used throughout the application for consistent logging

### External Services
- **Telegram Bot API**: Primary external service dependency
  - Requires bot token from @BotFather
  - Uses long-polling to receive updates
  - Sends messages and commands back to Telegram servers

### Database
- **SQLite**: Embedded database (no external server required)
  - File-based storage (`rosebot.db` in project directory)
  - No additional setup or services needed
  - Ready to migrate to PostgreSQL/MySQL if needed

### Configuration Sources
- **Environment Variables**: 
  - `BOT_TOKEN`: Telegram bot authentication token
  - `BOT_USERNAME`: Bot's username (for mention detection)
  - `BOT_OWNERS`: Comma-separated user IDs with admin privileges

- **application.conf**: Fallback configuration file for local development

### Deployment Considerations
- No external runtime dependencies beyond Java 11+
- Can run on: local machines, VPS, Replit, or any Java-capable hosting
- Stateful (maintains database), so requires persistent storage
- Single-instance design (not horizontally scalable without architectural changes)