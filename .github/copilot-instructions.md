# Copilot / Agent Instructions

Purpose
- Provide minimal, actionable guidance so Copilot Chat (and other workspace agents) can quickly contribute to this repository.

Quick Start (for humans)
- Copy environment example: `cp .env.example .env` and set `JWT_SECRET`.
- Install and start:

```bash
npm install
npm start
```

What this repo is
- Small Express REST API with JWT authentication.
- Entry point: [index.js](index.js)
- Auth routes: [routes/auth.js](routes/auth.js)
- User routes: [routes/users.js](routes/users.js)
- JWT middleware: [middleware/auth.js](middleware/auth.js)
- Simple local DB: [services/aqlite.js](services/aqlite.js) (JSON-file-backed storage at `data/aqlite.json` by default)
- App README: [README.md](README.md)
- Env example: [.env.example](.env.example)

Repository conventions
- Language: JavaScript (CommonJS). Keep edits consistent with the current style.
- Use `npm run dev` for iterative work (nodemon) and `npm start` for run.
- Tests: none currently — add tests under `test/` if needed.
- Data persistence: small JSON file (no native modules). Keep DB access via `services/aqlite.js`.

Agent workflow & constraints
- Prefer small, focused changes. Use `apply_patch` to create or modify files.
- Follow the "Link, don't embed" principle: reference existing docs rather than duplicating long content.
- Avoid adding native dependencies that require compilation on CI/workstations (we use a JSON-backed AQLite to avoid native build issues).

Suggested first tasks for an agent
- Improve authentication hardening (rotate/strengthen `JWT_SECRET`, add refresh tokens).
- Add unit tests for `routes/auth.js` and `services/aqlite.js`.
- Add input validation (e.g., `express-validator` or schema checks).
- Add logging and basic request tracing.

Example prompts for Copilot Chat
- "Create unit tests for `routes/auth.js` using Jest and supertest."
- "Add input validation to `POST /auth/register` and return helpful validation errors."
- "Create a migration to move from JSON DB to SQLite, updating `services/aqlite.js`."

Where to add more guidance
- If you want per-area guidance (backend, infra, tests), create small `AGENTS.md` or scoped instruction files in the relevant directories. See `AGENTS.md` suggestion below.

AGENTS.md (suggestion)
- Consider adding an `AGENTS.md` at the repo root describing specialized agent roles (e.g., `test-runner`, `security-reviewer`, `refactor-bot`) and the `applyTo` patterns they should act on.

Contact / next steps
- If something is unclear, ask for clarification and include file links to the area you intend to modify.
