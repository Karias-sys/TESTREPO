require('dotenv').config();
const express = require('express');
const AQLite = require('./services/aqlite');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const authMiddlewareFactory = require('./middleware/auth');

const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.DB_FILE || './data/aqlite.json';

const aql = new AQLite(DB_FILE);
aql.init();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes(aql));
app.use('/users', usersRoutes(aql, authMiddlewareFactory(aql)));
app.use('/admin', adminRoutes(aql, authMiddlewareFactory(aql)));

app.get('/', (req, res) => res.json({ message: 'AQLite JWT Auth API' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
