# 📚 Rose Bot Documentation

## Table of Contents
1. [Quick Start](#quick-start)
2. [Commands](#commands)
3. [Creating Commands](#creating-commands)
4. [Events](#events)
5. [Database](#database)
6. [API](#api)
7. [Configuration](#configuration)

## Quick Start

### Installation
```bash
npm install
```

### Configuration
1. Copy `.env.example` to `.env` and add your bot token
2. Edit `configCommands.json` to add owner ID
3. Start: `npm start`

### First Run
```bash
npm start
```

You should see:
```
✅ Rose Bot ONLINE!
📋 Commands: 6 | Events: 2
```

## Commands

### Built-in Commands
- `/help` - Show all commands
- `/ping` - Check latency
- `/info` - Bot information
- `/owner` - Show bot owner
- `/stats` - Bot statistics (admin)
- `/uptime` - Show uptime

## Creating Commands

### Create new command in `/scripts/commands/`

```javascript
module.exports = {
  name: 'mycommand',
  description: 'What it does',
  adminOnly: false,

  async execute(ctx, args, db, config, goat) {
    await goat.reply(ctx, 'Response');
  }
};
```

### Command Properties
- `name` - Command name (without /)
- `description` - Command description
- `adminOnly` - Requires admin permission
- `execute` - Function to run

## Events

### Built-in Events
- `message` - Incoming message
- `group_join` - Bot added to group

### Create new event in `/scripts/events/`

```javascript
module.exports = {
  event: 'myevent',
  description: 'Event description',

  async execute(ctx, goat, db, config) {
    // Handle event
  }
};
```

## Database

### Methods
```javascript
db.addUser(userId, data)
db.getUser(userId)
db.addChat(chatId, data)
db.getStats()
```

### Schema
- `users` - User data
- `chats` - Chat information
- `command_usage` - Command tracking

## API

### Endpoints
- `GET /` - Status
- `GET /api/health` - Health check
- `GET /api/stats` - Statistics
- `GET /api/commands` - All commands

### Response Example
```json
{
  "bot": {
    "version": "2.0.0",
    "uptime": 3600,
    "stats": {
      "users": 10,
      "chats": 5,
      "commands": 100
    }
  }
}
```

## Configuration

### config.json
```json
{
  "bot": {
    "name": "Rose Bot",
    "prefix": "/"
  },
  "telegram": {
    "token": "YOUR_TOKEN"
  },
  "api": {
    "port": 3000
  }
}
```

### configCommands.json
```json
{
  "owners": ["YOUR_ID"],
  "commands": {
    "help": {
      "enabled": true,
      "adminOnly": false
    }
  }
}
```

---

**For more help, type `/help` in Telegram!**
