const path = require('path');
const express = require('express');

function requireAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) return res.status(403).json({ error: 'Forbidden: admin access required' });
  next();
}

module.exports = (aql, authMiddleware) => {
  const router = express.Router();

  // Serve a simple admin dashboard page
  router.get('/', authMiddleware, requireAdmin, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/admin/index.html'));
  });

  // Basic stats endpoint for the dashboard
  router.get('/stats', authMiddleware, requireAdmin, (req, res) => {
    const users = aql.getAllUsers();
    res.json({ userCount: users.length, users });
  });

  return router;
};