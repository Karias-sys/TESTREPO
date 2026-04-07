const jwt = require('jsonwebtoken');

module.exports = (aql) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid Authorization header format' });
    const token = parts[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
      const user = aql.getUserById(decoded.id);
      if (!user) return res.status(401).json({ error: 'User not found' });
      delete user.password;
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
};
