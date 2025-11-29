# 🚀 Installation Step-by-Step

## Step 1: Get Your Bot Token

1. Open Telegram app
2. Search for `@BotFather`
3. Send `/newbot`
4. Choose a name (e.g., "Rose Bot")
5. Choose username (e.g., "rose_bot_official")
6. Copy your token (looks like: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

## Step 2: Install Node.js

Check if installed:
```bash
node --version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org)

## Step 3: Download Project

```bash
cd RoseBot-Telegram
```

## Step 4: Install Dependencies

```bash
npm install
```

This installs:
- telegraf (Telegram API)
- express (API server)
- better-sqlite3 (Database)

## Step 5: Configure Bot

### Option 1: Edit config.json (Recommended)

Open `config.json` and replace:
```json
"token": "YOUR_BOT_TOKEN_HERE"
```

With your actual token.

### Option 2: Use .env

```bash
cp .env.example .env
```

Edit `.env` and add:
```
BOT_TOKEN=your_actual_token_here
```

## Step 6: Add Your User ID

### Get Your ID

1. In Telegram, search for `@getmyid_bot`
2. Send any message
3. Bot replies with your ID (number)

### Add to configCommands.json

Open `configCommands.json` and change:
```json
"owners": ["123456789"]
```

Replace `123456789` with your actual ID.

## Step 7: Start Bot

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║    🌹 ROSE BOT - Telegram Edition     ║
║     Version 2.0.0 (Build 001)          ║
╚════════════════════════════════════════╝

ℹ️ Rose Bot starting...
✅ Command loaded: /help
✅ Command loaded: /ping
✅ Command loaded: /info
✅ Command loaded: /owner
✅ Command loaded: /stats
✅ Command loaded: /uptime
📋 Total commands: 6
✅ Event loaded: message
✅ Event loaded: group_join
📡 Total events: 2
📊 Dashboard API on port 3000
✅ Bot polling started
✅ Rose Bot ONLINE!
```

## Step 8: Test Bot

1. Open Telegram
2. Find your bot (search for the username you created)
3. Send `/help`
4. Bot responds with list of commands

## Step 9 (Optional): Add to Group

1. Create a Telegram group
2. Add your bot to the group (or search for it)
3. Send `/help` in group
4. Bot responds

## Troubleshooting

### Bot doesn't respond
- Check token is correct in config.json
- Check bot token starts with numbers and contains `:`
- Make sure `npm start` shows "Bot polling started"

### "Bot token is invalid"
- Go back to @BotFather
- Delete the old bot: `/deletebot`
- Create new bot: `/newbot`
- Copy new token carefully

### Port 3000 already in use
- Change `api.port` in config.json to different port (e.g., 3001, 8000)
- Or kill process using port 3000

### Database error
- Delete `database/rose.db` file
- Run bot again (database auto-creates)

### npm install fails
- Try `npm install --legacy-peer-deps`
- Or update Node.js to latest version

## Next Steps

1. ✅ Explore commands in `scripts/commands/`
2. ✅ Try adding custom commands (see README.md)
3. ✅ Check API at `http://localhost:3000/api/stats`
4. ✅ Read DOCS.md for advanced features

## Getting Help

- Type `/help` in Telegram
- Read README.md
- Check DOCS.md
- Look at example commands

---

**Your Rose Bot is now running! 🎉**

Start with `/help` and explore! 🌹
