# 📖 Complete Setup & Deployment Guide

## Table of Contents
1. [Local Setup](#local-setup)
2. [Replit Deployment](#replit-deployment)
3. [Render Deployment](#render-deployment)
4. [GitHub Upload](#github-upload)
5. [Usage Guide](#usage-guide)
6. [Troubleshooting](#troubleshooting)

---

## Local Setup

### Prerequisites
- **Node.js** 14+ (Check: `node --version`)
- **npm** (Check: `npm --version`)
- **Telegram Bot Token** from @BotFather

### Step 1: Clone Repository
```bash
git clone https://github.com/Gtajisan/RoseBot-Telegram.git
cd RoseBot-Telegram
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- `telegraf` - Telegram Bot API
- `express` - Web server
- `better-sqlite3` - Database
- `axios` - HTTP requests
- And 3 more...

### Step 3: Configure Bot

**Get Your Bot Token:**
1. Open Telegram
2. Search `@BotFather`
3. Send `/newbot`
4. Follow instructions
5. Copy token

**Edit config.json:**
```bash
nano config.json
```

Find and update:
```json
{
  "telegram": {
    "token": "YOUR_BOT_TOKEN_HERE"
  },
  "api": {
    "port": 3000
  }
}
```

**Edit configCommands.json:**
```json
{
  "owners": [YOUR_USER_ID]
}
```

Get your User ID by sending `/id` to the bot after starting it.

### Step 4: Start Bot
```bash
npm start
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║    🌹 ROSE BOT - Telegram Edition     ║
║     Version 2.0.0 (Build 001)          ║
╚════════════════════════════════════════╝

✅ Bot ONLINE!
📋 Commands: 68 | Events: 1
```

### Step 5: Test Bot
1. Open Telegram
2. Search for your bot
3. Send `/help`
4. See all 68 commands

**API Dashboard:** http://localhost:3000

---

## Replit Deployment

### Step 1: Create Replit Account
- Go to https://replit.com
- Sign up with GitHub or email

### Step 2: Import Repository
1. Click "Create" → "Import from GitHub"
2. Paste: `https://github.com/Gtajisan/RoseBot-Telegram`
3. Click "Import"

### Step 3: Set Secrets
1. Click "Secrets" (🔒)
2. Add environment variables:
   - `TELEGRAM_BOT_TOKEN` = your token
   - `BOT_ADMIN_ID` = your user ID

### Step 4: Update config.json
Click "Run App" or press Ctrl+Enter to see bot startup

Bot automatically reads from environment variables if you set them.

### Step 5: Keep Bot Running
By default, Replit stops your bot after inactivity.

**To keep it running:**
- Upgrade to Replit Core ($20/month)
- Or use external pinging service (UptimeRobot)

---

## Render Deployment

### Step 1: Create Render Account
- Go to https://render.com
- Sign up with GitHub

### Step 2: Create New Web Service
1. Dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Select branch: `main`

### Step 3: Configure Service
- **Name:** rose-bot (or any name)
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free (or paid)

### Step 4: Add Environment Variables
Click "Environment" and add:
```
TELEGRAM_BOT_TOKEN=your_token_here
BOT_PREFIX=/
BOT_ADMIN_ID=your_user_id
NODE_ENV=production
API_PORT=3000
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. When "Deploy successful" appears, bot is LIVE! 🎉

**Bot URL:** `https://your-app-name.onrender.com`

### Step 6: View Logs
Click "Logs" to see bot activity and debug errors

---

## GitHub Upload

### Step 1: Create GitHub Repository
1. Go to https://github.com
2. Sign in / Sign up
3. Click "New Repository"
4. Name: `RoseBot-Telegram`
5. Description: `Professional Telegram Bot with Rose + Baka-Chan commands`
6. Click "Create Repository"

### Step 2: Push Code to GitHub
```bash
# Initialize git (if not done)
git init

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/RoseBot-Telegram.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Rose Bot Telegram with 68 commands"

# Push
git branch -M main
git push -u origin main
```

### Step 3: Update GitHub Profile
In your README.md, GitHub will show:
- Project description
- Star count
- Installation instructions
- License

**Your profile now shows:** 👨‍💻 Gtajisan - Rose Bot Developer

---

## Usage Guide

### Basic Commands

**User Commands:**
```
/help          - List all commands
/ping          - Check latency
/stats         - Bot statistics
/id            - Get your user ID
/info          - Bot information
/uptime        - Bot uptime
```

**Moderation Commands:**
```
/ban <user_id>          - Ban user
/kick <user_id>         - Kick user
/mute <user_id>         - Mute user (restrict)
/unmute <user_id>       - Unmute user
/warn <user_id>         - Warn user
/warns <user_id>        - Check warnings
/rmwarn <user_id>       - Remove one warning
/tempban <user_id> <time> - Temporary ban
```

**Admin Commands:**
```
/promote <user_id>      - Make user admin
/demote <user_id>       - Remove admin status
/adminlist              - List all admins
/setprefix <char>       - Change command prefix (e.g., !)
/purge <number>         - Delete messages
```

**Welcome/Goodbye:**
```
/welcome on/off         - Toggle welcome messages
/goodbye on/off         - Toggle goodbye messages
/setwelcome <msg>       - Set custom welcome
/setgoodbye <msg>       - Set custom goodbye
/resetwelcome           - Reset to default
/resetgoodbye           - Reset to default
```

**Locks & Filters:**
```
/lock <type>            - Lock sticker/photo/link/etc
/unlock <type>          - Unlock type
/locks                  - Show locked items
/filter <trigger> <reply> - Add auto-reply
/filters                - List filters
/stop <trigger>         - Remove filter
/stopall                - Remove all filters
```

**Fun Commands:**
```
/anime <name>           - Get anime info
/manga <name>           - Get manga info
/waifu                  - Random waifu image
/meme                   - Random meme
/ship <name1> <name2>   - Ship two people
/slap <target>          - Slap action
/hug                    - Hug action
/kiss <target>          - Kiss action
/joke                   - Random joke
/fact                   - Random fact
/quote                  - Random quote
```

**AI/Image Commands:**
```
/edit <text>            - Edit message (reply to message)
/logo <text>            - Generate text logo
/translate <lang> <text> - Translate text
```

### In Groups

**Automatic Features:**
- Welcome messages on new member join
- Goodbye messages on member leave
- Auto-filters for banned words
- Lock enforcement
- Warning system
- Prefix customization per group

**Group Settings:**
Each group can have:
- Custom welcome message
- Custom goodbye message
- Custom prefix
- Locked content types
- Active filters
- Warning limit & timeout

---

## Troubleshooting

### Bot Not Responding

**Issue:** Commands don't work
**Fix:**
1. Check bot token in config.json
2. Check internet connection
3. Restart bot: `npm start`
4. Check bot is in Telegram group (if using in group)
5. Check command syntax: `/help`

### Database Errors

**Issue:** "database is locked" or "no such table"
**Fix:**
```bash
# Delete old database
rm database/rose.db

# Restart bot (creates new database)
npm start
```

### Port Already In Use

**Issue:** "EADDRINUSE: address already in use :::3000"
**Fix:**
```bash
# Change port in config.json
"port": 3001

# Or kill process on port 3000:
lsof -i :3000
kill -9 <PID>
```

### Render Bot Stops After Inactivity

**Issue:** Bot goes offline after not being used
**Fix:**
- Free tier on Render spins down after 15 min inactivity
- Upgrade to paid tier for 24/7 uptime
- Or use external pinging service

### Image Commands Fail

**Issue:** waifu/meme commands return errors
**Fix:**
1. Check internet connection
2. Verify axios installed: `npm install axios`
3. APIs might be down - try again later

### Permission Denied Errors

**Issue:** Commands fail with "permission denied"
**Fix:**
1. Make sure you're the bot owner (in configCommands.json)
2. Admin commands require group admin status
3. Check `/adminlist` to verify

---

## Support

**Issues or Questions?**
- Check this guide first
- Check `/help` in Telegram
- Review logs in console
- Check GitHub Issues

**Developer Contact:**
- **Name:** Gtajisan
- **Email:** ffjisan804@gmail.com
- **GitHub:** @Gtajisan

---

## Quick Deployment Checklist

- [ ] Node.js 14+ installed
- [ ] npm dependencies installed
- [ ] Bot token from @BotFather
- [ ] config.json updated with token
- [ ] configCommands.json updated with admin ID
- [ ] `npm start` runs without errors
- [ ] `/help` shows 68 commands in Telegram
- [ ] All 4 dependencies installed (telegraf, express, better-sqlite3, axios)
- [ ] Ready to deploy to Replit/Render
- [ ] GitHub repository created (optional)

---

**Status:** ✅ Ready to Deploy

**Version:** 2.0.0

**Last Updated:** November 2025

*Rose Bot - Professional Telegram Bot Framework*
