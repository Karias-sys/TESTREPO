const path = require('path');
const express = require('express');
const requireAdmin = require('../middleware/requireAdmin');

module.exports = (aql, authMiddleware) => {
  const router = express.Router();

  // Serve a simple admin dashboard page
  router.get('/', authMiddleware, requireAdmin, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/admin/index.html'));
  });

  // Basic stats endpoint for the dashboard
  router.get('/stats', authMiddleware, requireAdmin, (req, res) => {
    try {
      const users = aql.getAllUsers();
      res.json({ userCount: users.length, users });
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  });

  return router;
};