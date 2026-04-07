const path = require('path');
const express = require('express');

module.exports = (aql, authMiddleware) => {
  const router = express.Router();

  // Serve a simple admin dashboard page
  router.get('/', authMiddleware, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/admin/index.html'));
  });

  // Basic stats endpoint for the dashboard
  router.get('/stats', authMiddleware, (req, res) => {
    const users = aql.getAllUsers();
    res.json({ userCount: users.length, users });
  });

  return router;
};
