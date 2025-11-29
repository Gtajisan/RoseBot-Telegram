# 💾 Database Layer

SQLite database integration for Rose Bot.

## Structure

- **DatabaseManager.java** - Main database interface
- **Tables:**
  - `users` - User data & permissions
  - `chats` - Chat information
  - `admin_logs` - Admin action logs

## Models

User, Stats, and other data models in `models/` package.

## Schema

```sql
CREATE TABLE users (
    telegram_id INTEGER PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    is_admin BOOLEAN,
    created_at INTEGER
);

CREATE TABLE chats (
    chat_id INTEGER PRIMARY KEY,
    title TEXT,
    type TEXT,
    created_at INTEGER
);

CREATE TABLE admin_logs (
    id INTEGER PRIMARY KEY,
    admin_id INTEGER,
    action TEXT,
    target_id INTEGER,
    reason TEXT,
    timestamp INTEGER
);
```
