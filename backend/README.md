# AuthSphere — Backend

This folder contains the Express.js backend for AuthSphere: a small authentication API using MongoDB, JWTs and bcrypt for password hashing.

## Contents

- `server.js` — app entry point, sets up middleware and routes, connects to MongoDB.
- `routes/authRoutes.js` — authentication routes (register, login, protected profile).
- `controllers/authController.js` — controller logic for register, login and profile.
- `middleware/authMiddleware.js` — JWT verification middleware that protects routes.
- `models/user.js` — Mongoose user model.
- `package.json` — dependencies and devDependencies.

## Quick start

1. Install dependencies

```powershell
cd backend
npm install
```

2. Create a `.env` file in `backend/` with the following variables:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-strong-secret>
PORT=5000   # optional
```

3. Run the server

Use Node directly:

```powershell
node server.js
```

Or use nodemon (dev dependency) for auto-reload during development:

```powershell
npx nodemon server.js
```

Tip: You can add scripts to `package.json` for convenience (example):

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Scripts

The repository now includes convenient npm scripts in `backend/package.json`:

```powershell
npm run start   # runs: node server.js
npm run dev     # runs: nodemon server.js (auto-restarts on changes)
```

Environment example

There's a `backend/.env.example` file you can copy to `.env` and fill in before running the server.

## How it works (flow)

- `server.js` loads environment variables, initializes Express middlewares (CORS, JSON parser, Helmet, morgan), connects to MongoDB, and mounts the auth router at `/api/auth`.
- Routes in `routes/authRoutes.js` call controller functions:
  - `POST /api/auth/register` -> `register` (creates a new user)
  - `POST /api/auth/login` -> `login` (verifies credentials and returns a JWT)
  - `GET /api/auth/profile` -> `profile` (protected by `authMiddleware`)
- `authController.register` hashes the password with bcrypt and saves a new `User` document.
- `authController.login` finds the user, verifies password with bcrypt, and signs a JWT with `JWT_SECRET` (expires in 1 hour). The response includes the token and basic user info.
- `authMiddleware` expects an `Authorization` header of the form `Bearer <token>`. It verifies the token and attaches the decoded payload to `req.user`.

## API examples

1) Register

Request

POST /api/auth/register
Content-Type: application/json

Body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "s3cret"
}
```

Response (201)

```json
{
  "message": "User registered",
  "id": "<mongodb-id>"
}
```

2) Login

Request

POST /api/auth/login
Content-Type: application/json

Body:
```json
{
  "email": "alice@example.com",
  "password": "s3cret"
}
```

Successful response (200):

```json
{
  "token": "<jwt-token>",
  "user": {
    "id": "<mongodb-id>",
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

3) Protected profile

Request

GET /api/auth/profile
Headers:
```
Authorization: Bearer <jwt-token>
```

Response (200)

```json
{
  "message": "Protected Route",
  "user": {
    "userId": "<mongodb-id>",
    "email": "alice@example.com",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

Note: `req.user` contains the decoded JWT payload (the controller returns that object in the profile response).

## Important environment variables

- `MONGO_URI` — MongoDB connection string (required).
- `JWT_SECRET` — secret used to sign and verify JWTs (required).
- `PORT` — optional port number (defaults to 5000).

## Dependencies (high level)

- express — web framework
- mongoose — MongoDB ORM
- dotenv — environment variables
- bcryptjs — password hashing
- jsonwebtoken — JWT creation/verification
- cors, helmet, morgan — common middleware

These are declared in `package.json` in this folder.

## Troubleshooting

- MongoDB connection errors:
  - Verify `MONGO_URI` is correct and reachable. If using MongoDB Atlas, ensure IP whitelist or allow access from anywhere (temporarily) while developing.
  - Check that the database user has the right credentials/permissions.

- Missing JWT_SECRET error / Invalid token:
  - Ensure `JWT_SECRET` exists in `.env` and the same secret is used when creating and verifying tokens.

- CORS issues when calling from the frontend:
  - The backend enables CORS by default. If you need to restrict origins, update the `cors()` configuration in `server.js`.

- Server doesn't start / wrong entrypoint:
  - This project uses `server.js` as the runtime entry. Run `node server.js`. Add `start`/`dev` scripts if you prefer `npm start`/`npm run dev`.

## Next steps (suggestions)

- Add `start` and `dev` scripts to `package.json` for convenience.
- Add validation to request bodies (e.g., `express-validator` or `joi`).
- Add tests (supertest + jest) for controllers and auth flow.
- Add Dockerfile and docker-compose for local reproducible development.

## Where to look in the code

- Entry point: `server.js`
- Routes: `routes/authRoutes.js`
- Controllers: `controllers/authController.js`
- Middleware: `middleware/authMiddleware.js`
- Model: `models/user.js`
si