const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class DB {
  constructor(dbPath = './database/rose.db') {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
    this.initTables();
  }

  initTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        username TEXT,
        first_name TEXT,
        is_admin BOOLEAN DEFAULT 0,
        is_banned BOOLEAN DEFAULT 0,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS chats (
        chat_id INTEGER PRIMARY KEY,
        title TEXT,
        type TEXT,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS command_usage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        command TEXT,
        timestamp INTEGER
      );
    `);
  }

  addUser(userId, data) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO users (user_id, username, first_name, created_at)
      VALUES (?, ?, ?, ?)
    `);
    return stmt.run(userId, data.username, data.first_name, Date.now());
  }

  getUser(userId) {
    return this.db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId);
  }

  addChat(chatId, data) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO chats (chat_id, title, type, created_at)
      VALUES (?, ?, ?, ?)
    `);
    return stmt.run(chatId, data.title, data.type, Date.now());
  }

  addCommandUsage(userId, command) {
    return this.db.prepare('INSERT INTO command_usage (user_id, command, timestamp) VALUES (?, ?, ?)')
      .run(userId, command, Date.now());
  }

  getStats() {
    const users = this.db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const chats = this.db.prepare('SELECT COUNT(*) as count FROM chats').get().count;
    const commands = this.db.prepare('SELECT COUNT(*) as count FROM command_usage').get().count;
    return { users, chats, commands };
  }

  close() {
    this.db.close();
  }
}

module.exports = DB;
