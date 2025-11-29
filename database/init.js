/**
 * Database Initialization Script
 * Creates and populates the SQLite database with proper schema
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class DatabaseInit {
  constructor(dbPath = './database/rose.db') {
    this.dbPath = dbPath;
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created database directory: ${dir}`);
    }
  }

  /**
   * Initialize fresh database with all tables
   */
  async init() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error('❌ Failed to open database:', err.message);
          reject(err);
          return;
        }

        console.log('✅ Database connected');

        // Create tables
        db.serialize(() => {
          // Users table
          db.run(`
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
            )
          `, (err) => {
            if (err) console.error('❌ Failed to create users table:', err.message);
            else console.log('✅ Users table ready');
          });

          // Chats table
          db.run(`
            CREATE TABLE IF NOT EXISTS chats (
              chat_id INTEGER PRIMARY KEY,
              title TEXT,
              type TEXT,
              prefix TEXT DEFAULT '/',
              welcome_msg TEXT,
              goodbye_msg TEXT,
              created_at INTEGER,
              updated_at INTEGER
            )
          `, (err) => {
            if (err) console.error('❌ Failed to create chats table:', err.message);
            else console.log('✅ Chats table ready');
          });

          // Locks table
          db.run(`
            CREATE TABLE IF NOT EXISTS locks (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              chat_id INTEGER NOT NULL,
              lock_type TEXT NOT NULL,
              created_at INTEGER,
              FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
            )
          `, (err) => {
            if (err) console.error('❌ Failed to create locks table:', err.message);
            else console.log('✅ Locks table ready');
          });

          // Filters table
          db.run(`
            CREATE TABLE IF NOT EXISTS filters (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              chat_id INTEGER NOT NULL,
              trigger TEXT NOT NULL,
              reply TEXT NOT NULL,
              created_at INTEGER,
              FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
            )
          `, (err) => {
            if (err) console.error('❌ Failed to create filters table:', err.message);
            else console.log('✅ Filters table ready');
          });

          // Notes table
          db.run(`
            CREATE TABLE IF NOT EXISTS notes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              name TEXT NOT NULL,
              content TEXT,
              created_at INTEGER,
              FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
          `, (err) => {
            if (err) console.error('❌ Failed to create notes table:', err.message);
            else console.log('✅ Notes table ready');
          });

          // Warnings table
          db.run(`
            CREATE TABLE IF NOT EXISTS warnings (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              chat_id INTEGER NOT NULL,
              reason TEXT,
              created_at INTEGER,
              FOREIGN KEY (user_id) REFERENCES users(user_id),
              FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
            )
          `, (err) => {
            if (err) console.error('❌ Failed to create warnings table:', err.message);
            else console.log('✅ Warnings table ready');
          });

          // Command usage table
          db.run(`
            CREATE TABLE IF NOT EXISTS command_usage (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER,
              chat_id INTEGER,
              command TEXT NOT NULL,
              timestamp INTEGER
            )
          `, (err) => {
            if (err) console.error('❌ Failed to create command_usage table:', err.message);
            else console.log('✅ Command usage table ready');
          });

          // Create indexes for better performance
          db.run(`CREATE INDEX IF NOT EXISTS idx_user_id ON users(user_id)`, (err) => {
            if (err) console.error('❌ Failed to create user index:', err.message);
            else console.log('✅ User index created');
          });

          db.run(`CREATE INDEX IF NOT EXISTS idx_chat_id ON chats(chat_id)`, (err) => {
            if (err) console.error('❌ Failed to create chat index:', err.message);
            else console.log('✅ Chat index created');
          });

          db.run(`CREATE INDEX IF NOT EXISTS idx_command_user ON command_usage(user_id)`, (err) => {
            if (err) console.error('❌ Failed to create command index:', err.message);
            else console.log('✅ Command index created');
          });

          // Verify database is working
          db.all(`SELECT name FROM sqlite_master WHERE type='table'`, (err, tables) => {
            if (err) {
              console.error('❌ Failed to verify tables:', err.message);
              reject(err);
            } else {
              console.log(`\n📊 Database initialized successfully!`);
              console.log(`📋 Tables created: ${tables.map(t => t.name).join(', ')}`);
              db.close();
              resolve(true);
            }
          });
        });
      });
    });
  }

  /**
   * Reset database (delete and recreate)
   */
  async reset() {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(this.dbPath)) {
        fs.unlinkSync(this.dbPath);
        console.log(`🗑️  Old database removed: ${this.dbPath}`);
      }
      this.init().then(resolve).catch(reject);
    });
  }
}

// Run if executed directly
if (require.main === module) {
  const initDb = new DatabaseInit();
  initDb.init()
    .then(() => {
      console.log('\n✅ Database ready for Rose Bot!');
      process.exit(0);
    })
    .catch(err => {
      console.error('\n❌ Database initialization failed:', err);
      process.exit(1);
    });
}

module.exports = DatabaseInit;
