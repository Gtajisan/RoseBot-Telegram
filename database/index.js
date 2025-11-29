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
        warnings INTEGER DEFAULT 0,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS chats (
        chat_id INTEGER PRIMARY KEY,
        title TEXT,
        type TEXT,
        prefix TEXT DEFAULT '/',
        welcome_msg TEXT,
        goodbye_msg TEXT,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS locks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER,
        lock_type TEXT,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS filters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER,
        trigger TEXT,
        reply TEXT,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        content TEXT,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS warnings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        chat_id INTEGER,
        reason TEXT,
        created_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS command_usage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        chat_id INTEGER,
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

  getChat(chatId) {
    return this.db.prepare('SELECT * FROM chats WHERE chat_id = ?').get(chatId);
  }

  addWarning(userId, chatId, reason) {
    return this.db.prepare('INSERT INTO warnings (user_id, chat_id, reason, created_at) VALUES (?, ?, ?, ?)')
      .run(userId, chatId, reason, Date.now());
  }

  getWarnings(userId, chatId) {
    return this.db.prepare('SELECT COUNT(*) as count FROM warnings WHERE user_id = ? AND chat_id = ?')
      .get(userId, chatId).count;
  }

  addFilter(chatId, trigger, reply) {
    return this.db.prepare('INSERT INTO filters (chat_id, trigger, reply, created_at) VALUES (?, ?, ?, ?)')
      .run(chatId, trigger, reply, Date.now());
  }

  getFilters(chatId) {
    return this.db.prepare('SELECT * FROM filters WHERE chat_id = ?').all(chatId);
  }

  addLock(chatId, lockType) {
    return this.db.prepare('INSERT INTO locks (chat_id, lock_type, created_at) VALUES (?, ?, ?)')
      .run(chatId, lockType, Date.now());
  }

  getLocks(chatId) {
    return this.db.prepare('SELECT DISTINCT lock_type FROM locks WHERE chat_id = ?').all(chatId);
  }

  addNote(userId, name, content) {
    return this.db.prepare('INSERT INTO notes (user_id, name, content, created_at) VALUES (?, ?, ?, ?)')
      .run(userId, name, content, Date.now());
  }

  getNotes(userId) {
    return this.db.prepare('SELECT * FROM notes WHERE user_id = ?').all(userId);
  }

  addCommandUsage(userId, chatId, command) {
    return this.db.prepare('INSERT INTO command_usage (user_id, chat_id, command, timestamp) VALUES (?, ?, ?, ?)')
      .run(userId, chatId, command, Date.now());
  }

  getStats() {
    const users = this.db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const chats = this.db.prepare('SELECT COUNT(*) as count FROM chats').get().count;
    const commands = this.db.prepare('SELECT COUNT(*) as count FROM command_usage').get().count;
    const warnings = this.db.prepare('SELECT COUNT(*) as count FROM warnings').get().count;
    return { users, chats, commands, warnings };
  }

  close() {
    this.db.close();
  }
}

module.exports = DB;
