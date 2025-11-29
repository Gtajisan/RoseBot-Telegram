/**
 * Dashboard - Express.js API server
 * Placeholder for future web UI
 */

const express = require('express');

function createDashboard(db, logger) {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ dashboard: 'Rose Bot API v1' });
  });

  return app;
}

module.exports = { createDashboard };
