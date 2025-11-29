const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

class DB {
  constructor(dbPath = './database/rose.db') {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    this.dbPath = dbPath;
    this.db = new sqlite3.Database(dbPath);
    this.db.configure('busyTimeout', 5000);
    this.initTables();
    logger.database('CONNECT', { path: dbPath }, true);
  }

  initTables() {
    this.db.serialize(() => {
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
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          logger.error('DATABASE', err, { sql, params });
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          logger.error('DATABASE', err, { sql });
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          logger.error('DATABASE', err, { sql });
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  // User operations
  async addUser(userId, data) {
    try {
      const result = await this.run(`
        INSERT OR REPLACE INTO users (user_id, username, first_name, last_name, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [userId, data.username || '', data.first_name || '', data.last_name || '', Date.now(), Date.now()]);
      logger.database('ADD_USER', { userId, username: data.username }, true);
      return result;
    } catch (error) {
      logger.database('ADD_USER', { userId, error: error.message }, false);
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await this.get('SELECT * FROM users WHERE user_id = ?', [userId]);
      logger.debug('DATABASE', 'GET_USER', { userId, found: !!user });
      return user;
    } catch (error) {
      logger.error('DATABASE', error, { userId });
      throw error;
    }
  }

  // Chat operations
  async addChat(chatId, data) {
    try {
      const result = await this.run(`
        INSERT OR REPLACE INTO chats (chat_id, title, type, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `, [chatId, data.title || '', data.type || '', Date.now(), Date.now()]);
      logger.database('ADD_CHAT', { chatId, title: data.title }, true);
      return result;
    } catch (error) {
      logger.database('ADD_CHAT', { chatId, error: error.message }, false);
      throw error;
    }
  }

  async getChat(chatId) {
    try {
      const chat = await this.get('SELECT * FROM chats WHERE chat_id = ?', [chatId]);
      logger.debug('DATABASE', 'GET_CHAT', { chatId, found: !!chat });
      return chat;
    } catch (error) {
      logger.error('DATABASE', error, { chatId });
      throw error;
    }
  }

  // Warning operations
  async addWarning(userId, chatId, reason) {
    try {
      const result = await this.run('INSERT INTO warnings (user_id, chat_id, reason, created_at) VALUES (?, ?, ?, ?)',
        [userId, chatId, reason || '', Date.now()]);
      logger.database('ADD_WARNING', { userId, chatId, reason }, true);
      return result;
    } catch (error) {
      logger.database('ADD_WARNING', { userId, chatId, error: error.message }, false);
      throw error;
    }
  }

  async getWarnings(userId, chatId) {
    try {
      const row = await this.get('SELECT COUNT(*) as count FROM warnings WHERE user_id = ? AND chat_id = ?',
        [userId, chatId]);
      logger.debug('DATABASE', 'GET_WARNINGS', { userId, chatId, count: row?.count || 0 });
      return row?.count || 0;
    } catch (error) {
      logger.error('DATABASE', error, { userId, chatId });
      throw error;
    }
  }

  // Filter operations
  async addFilter(chatId, trigger, reply) {
    try {
      const result = await this.run('INSERT INTO filters (chat_id, trigger, reply, created_at) VALUES (?, ?, ?, ?)',
        [chatId, trigger, reply, Date.now()]);
      logger.database('ADD_FILTER', { chatId, trigger }, true);
      return result;
    } catch (error) {
      logger.database('ADD_FILTER', { chatId, error: error.message }, false);
      throw error;
    }
  }

  async getFilters(chatId) {
    try {
      const filters = await this.all('SELECT * FROM filters WHERE chat_id = ?', [chatId]);
      logger.debug('DATABASE', 'GET_FILTERS', { chatId, count: filters.length });
      return filters;
    } catch (error) {
      logger.error('DATABASE', error, { chatId });
      throw error;
    }
  }

  // Lock operations
  async addLock(chatId, lockType) {
    try {
      const result = await this.run('INSERT INTO locks (chat_id, lock_type, created_at) VALUES (?, ?, ?)',
        [chatId, lockType, Date.now()]);
      logger.database('ADD_LOCK', { chatId, lockType }, true);
      return result;
    } catch (error) {
      logger.database('ADD_LOCK', { chatId, error: error.message }, false);
      throw error;
    }
  }

  async getLocks(chatId) {
    try {
      const locks = await this.all('SELECT DISTINCT lock_type FROM locks WHERE chat_id = ?', [chatId]);
      logger.debug('DATABASE', 'GET_LOCKS', { chatId, count: locks.length });
      return locks;
    } catch (error) {
      logger.error('DATABASE', error, { chatId });
      throw error;
    }
  }

  // Note operations
  async addNote(userId, name, content) {
    try {
      const result = await this.run('INSERT INTO notes (user_id, name, content, created_at) VALUES (?, ?, ?, ?)',
        [userId, name, content, Date.now()]);
      logger.database('ADD_NOTE', { userId, name }, true);
      return result;
    } catch (error) {
      logger.database('ADD_NOTE', { userId, error: error.message }, false);
      throw error;
    }
  }

  async getNotes(userId) {
    try {
      const notes = await this.all('SELECT * FROM notes WHERE user_id = ?', [userId]);
      logger.debug('DATABASE', 'GET_NOTES', { userId, count: notes.length });
      return notes;
    } catch (error) {
      logger.error('DATABASE', error, { userId });
      throw error;
    }
  }

  // Command usage tracking
  async addCommandUsage(userId, chatId, command) {
    try {
      const result = await this.run('INSERT INTO command_usage (user_id, chat_id, command, timestamp) VALUES (?, ?, ?, ?)',
        [userId, chatId, command, Date.now()]);
      return result;
    } catch (error) {
      logger.error('DATABASE', error, { userId, command });
      throw error;
    }
  }

  // Statistics
  async getStats() {
    try {
      const users = await this.get('SELECT COUNT(*) as count FROM users');
      const chats = await this.get('SELECT COUNT(*) as count FROM chats');
      const commands = await this.get('SELECT COUNT(*) as count FROM command_usage');
      const warnings = await this.get('SELECT COUNT(*) as count FROM warnings');
      
      const stats = {
        users: users?.count || 0,
        chats: chats?.count || 0,
        commands: commands?.count || 0,
        warnings: warnings?.count || 0
      };
      
      logger.info('DATABASE', 'Statistics retrieved', stats);
      return stats;
    } catch (error) {
      logger.error('DATABASE', error, {});
      throw error;
    }
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          logger.error('DATABASE', err, { action: 'close' });
          reject(err);
        } else {
          logger.database('DISCONNECT', { path: this.dbPath }, true);
          resolve();
        }
      });
    });
  }
}

module.exports = DB;
