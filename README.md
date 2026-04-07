# AQLite JWT Auth API

Simple Express REST API with JWT authentication and a local AQLite (SQLite) database.

Quick start

1. Copy `.env.example` to `.env` and set `JWT_SECRET`.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

Endpoints

- `POST /auth/register` — body: `username`, `email`, `password`.
- `POST /auth/login` — body: `email`, `password` → returns `token`.
- `GET /users/me` — protected, requires `Authorization: Bearer <token>` header.

Example curl

Register:

```bash
curl -s -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret"}'
```

Login:

```bash
curl -s -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

Get profile (replace <token>):

```bash
curl -s http://localhost:3000/users/me -H "Authorization: Bearer <token>"
```
