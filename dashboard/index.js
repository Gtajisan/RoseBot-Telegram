const express = require('express');

function createDashboard(db, commandHandler, logger) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const stats = db.getStats();
    res.json({ 
      status: 'online',
      bot: 'Rose Bot v2.0.0',
      stats,
      uptime: Math.floor(process.uptime())
    });
  });

  router.get('/api/stats', (req, res) => {
    res.json(db.getStats());
  });

  router.get('/api/commands', (req, res) => {
    res.json({ count: commandHandler.count() });
  });

  router.get('/api/groups', (req, res) => {
    try {
      const groups = db.db.prepare('SELECT * FROM chats LIMIT 100').all();
      res.json({ groups: groups || [] });
    } catch (e) {
      res.json({ groups: [] });
    }
  });

  return router;
}

module.exports = { createDashboard };
