const express = require('express');
const path = require('path');

function createDashboard(db, commandHandler, logger) {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  // Dashboard Home
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // API: Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'online', timestamp: Date.now() });
  });

  // API: Statistics
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await db.getStats();
      res.json({
        status: 'online',
        bot: 'Rose Bot v2.0.0',
        uptime: Math.floor(process.uptime()),
        memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        ...stats
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // API: Commands List
  app.get('/api/commands', (req, res) => {
    try {
      const cmds = commandHandler.getAll();
      res.json({
        count: cmds.length,
        commands: cmds.map(c => ({
          name: c.name,
          description: c.description || 'No description',
          adminOnly: c.adminOnly || false,
          author: c.author || 'Unknown'
        }))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // API: Connected Groups
  app.get('/api/groups', async (req, res) => {
    try {
      const groups = await db.all('SELECT * FROM chats ORDER BY created_at DESC LIMIT 50');
      res.json({ groups: groups || [], count: groups?.length || 0 });
    } catch (error) {
      res.status(500).json({ error: error.message, groups: [] });
    }
  });

  // API: Users
  app.get('/api/users', async (req, res) => {
    try {
      const users = await db.all('SELECT user_id, username, first_name, is_admin, warnings FROM users ORDER BY created_at DESC LIMIT 50');
      res.json({ users: users || [], count: users?.length || 0 });
    } catch (error) {
      res.status(500).json({ error: error.message, users: [] });
    }
  });

  // API: Command Usage
  app.get('/api/usage', async (req, res) => {
    try {
      const usage = await db.all(`
        SELECT command, COUNT(*) as count 
        FROM command_usage 
        GROUP BY command 
        ORDER BY count DESC 
        LIMIT 20
      `);
      res.json({ usage: usage || [] });
    } catch (error) {
      res.status(500).json({ error: error.message, usage: [] });
    }
  });

  // API: Warnings
  app.get('/api/warnings', async (req, res) => {
    try {
      const warnings = await db.all(`
        SELECT user_id, COUNT(*) as count 
        FROM warnings 
        GROUP BY user_id 
        ORDER BY count DESC 
        LIMIT 20
      `);
      res.json({ warnings: warnings || [] });
    } catch (error) {
      res.status(500).json({ error: error.message, warnings: [] });
    }
  });

  // Error handler
  app.use((err, req, res, next) => {
    logger.error('Dashboard error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = { createDashboard };
