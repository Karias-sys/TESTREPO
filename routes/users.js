const express = require('express');

module.exports = (aql, authMiddleware) => {
  const router = express.Router();

  router.get('/me', authMiddleware, (req, res) => {
    res.json({ user: req.user });
  });

  router.get('/', (req, res) => {
    const users = aql.getAllUsers();
    res.json({ users });
  });

  return router;
};
