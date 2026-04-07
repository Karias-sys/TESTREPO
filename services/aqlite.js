const fs = require('fs');
const path = require('path');

class AQLite {
  constructor(dbFile) {
    // Use a JSON file as the local AQLite representation.
    // Accept either .db or .json paths; normalize to .json
    if (dbFile && dbFile.endsWith('.db')) dbFile = dbFile.replace(/\.db$/i, '.json');
    if (!dbFile) dbFile = './data/aqlite.json';
    this.dbFile = dbFile;
    const dir = path.dirname(this.dbFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.dbFile)) fs.writeFileSync(this.dbFile, JSON.stringify({ users: [], lastId: 0 }, null, 2));
    this._load();
  }

  _load() {
    try {
      this.data = JSON.parse(fs.readFileSync(this.dbFile, 'utf8'));
    } catch (err) {
      this.data = { users: [], lastId: 0 };
      this._persist();
    }
  }

  _persist() {
    fs.writeFileSync(this.dbFile, JSON.stringify(this.data, null, 2));
  }

  init() {
    if (!this.data) this.data = { users: [], lastId: 0 };
    if (!Array.isArray(this.data.users)) this.data.users = [];
    if (typeof this.data.lastId !== 'number') {
      this.data.lastId = this.data.users.reduce((m, u) => Math.max(m, u.id || 0), 0);
    }
    this._persist();
  }

  createUser({ username, email, password, isAdmin = false }) {
    this.data.lastId = (this.data.lastId || 0) + 1;
    const user = {
      id: this.data.lastId,
      username,
      email,
      password,
      isAdmin,
      created_at: new Date().toISOString(),
    };
    this.data.users.push(user);
    this._persist();
    return user;
  }

  getUserByEmail(email) {
    return this.data.users.find((u) => u.email === email) || null;
  }

  getUserById(id) {
    return this.data.users.find((u) => u.id === id) || null;
  }

  getAllUsers() {
    return this.data.users.map((u) => ({ id: u.id, username: u.username, email: u.email, created_at: u.created_at }));
  }
}

module.exports = AQLite;