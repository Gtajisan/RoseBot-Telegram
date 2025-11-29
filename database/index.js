const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const DatabaseInit = require('./init');

class DB {
  constructor(dbPath = './database/rose.db') {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    this.dbPath = dbPath;
    this.db = new sqlite3.Database(dbPath);
    this.db.configure('busyTimeout', 5000);
    this.initTables();
  }

  initTables() {
    this.db.serialize(() => {
      // Users table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          user_id INTEGER PRIMARY KEY,
          username TEXT UNIQUE,
          first_name TEXT,
          last_name TEXT,
          is_admin BOOLEAN DEFAULT 0,
          is_banned BOOLEAN DEFAULT 0,
          warnings INTEGER DEFAULT 0,
          created_at INTEGER,
          updated_at INTEGER
        );
      `);

      // Chats table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS chats (
          chat_id INTEGER PRIMARY KEY,
          title TEXT,
          type TEXT,
          prefix TEXT DEFAULT '/',
          welcome_msg TEXT,
          goodbye_msg TEXT,
          created_at INTEGER,
          updated_at INTEGER
        );
      `);

      // Locks table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS locks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          chat_id INTEGER,
          lock_type TEXT,
          created_at INTEGER
        );
      `);

      // Filters table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS filters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          chat_id INTEGER,
          trigger TEXT,
          reply TEXT,
          created_at INTEGER
        );
      `);

      // Notes table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          name TEXT,
          content TEXT,
          created_at INTEGER
        );
      `);

      // Warnings table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS warnings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          chat_id INTEGER,
          reason TEXT,
          created_at INTEGER
        );
      `);

      // Command usage table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS command_usage (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          chat_id INTEGER,
          command TEXT,
          timestamp INTEGER
        );
      `);
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  // User operations
  addUser(userId, data) {
    return this.run(`
      INSERT OR REPLACE INTO users (user_id, username, first_name, last_name, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [userId, data.username || '', data.first_name || '', data.last_name || '', Date.now(), Date.now()]);
  }

  getUser(userId) {
    return this.get('SELECT * FROM users WHERE user_id = ?', [userId]);
  }

  // Chat operations
  addChat(chatId, data) {
    return this.run(`
      INSERT OR REPLACE INTO chats (chat_id, title, type, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `, [chatId, data.title || '', data.type || '', Date.now(), Date.now()]);
  }

  getChat(chatId) {
    return this.get('SELECT * FROM chats WHERE chat_id = ?', [chatId]);
  }

  // Warning operations
  addWarning(userId, chatId, reason) {
    return this.run('INSERT INTO warnings (user_id, chat_id, reason, created_at) VALUES (?, ?, ?, ?)',
      [userId, chatId, reason || '', Date.now()]);
  }

  async getWarnings(userId, chatId) {
    const row = await this.get('SELECT COUNT(*) as count FROM warnings WHERE user_id = ? AND chat_id = ?',
      [userId, chatId]);
    return row?.count || 0;
  }

  // Filter operations
  addFilter(chatId, trigger, reply) {
    return this.run('INSERT INTO filters (chat_id, trigger, reply, created_at) VALUES (?, ?, ?, ?)',
      [chatId, trigger, reply, Date.now()]);
  }

  getFilters(chatId) {
    return this.all('SELECT * FROM filters WHERE chat_id = ?', [chatId]);
  }

  // Lock operations
  addLock(chatId, lockType) {
    return this.run('INSERT INTO locks (chat_id, lock_type, created_at) VALUES (?, ?, ?)',
      [chatId, lockType, Date.now()]);
  }

  getLocks(chatId) {
    return this.all('SELECT DISTINCT lock_type FROM locks WHERE chat_id = ?', [chatId]);
  }

  // Note operations
  addNote(userId, name, content) {
    return this.run('INSERT INTO notes (user_id, name, content, created_at) VALUES (?, ?, ?, ?)',
      [userId, name, content, Date.now()]);
  }

  getNotes(userId) {
    return this.all('SELECT * FROM notes WHERE user_id = ?', [userId]);
  }

  // Command usage tracking
  addCommandUsage(userId, chatId, command) {
    return this.run('INSERT INTO command_usage (user_id, chat_id, command, timestamp) VALUES (?, ?, ?, ?)',
      [userId, chatId, command, Date.now()]);
  }

  // Statistics
  async getStats() {
    const users = await this.get('SELECT COUNT(*) as count FROM users');
    const chats = await this.get('SELECT COUNT(*) as count FROM chats');
    const commands = await this.get('SELECT COUNT(*) as count FROM command_usage');
    const warnings = await this.get('SELECT COUNT(*) as count FROM warnings');
    
    return {
      users: users?.count || 0,
      chats: chats?.count || 0,
      commands: commands?.count || 0,
      warnings: warnings?.count || 0
    };
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = DB;
