const path = require('path');
const express = require('express');

function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ error: 'Forbidden: admin access required' });
}

module.exports = (aql, authMiddleware) => {
  const router = express.Router();

  // Serve a simple admin dashboard page
  router.get('/', authMiddleware, adminOnly, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/admin/index.html'));
  });

  // Basic stats endpoint for the dashboard
  router.get('/stats', authMiddleware, adminOnly, (req, res) => {
    const users = aql.getAllUsers();
    res.json({ currentUser: req.user.username, userCount: users.length, users });
  });

  return router;
};