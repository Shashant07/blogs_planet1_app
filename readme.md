# MERN Blog Application

A full-stack blog app using **MongoDB, Express, React (Vite), Redux Toolkit + RTK Query**, and **Bootstrap**. Authentication uses a **central Auth service** with JWT in an HttpOnly cookie.

---

## Features
- Public: view posts without login.
- Authenticated users: like & comment.
- Admin: CRUD posts + manage dashboard.
- CSRF protection for write operations.

---

## Tech Stack
- **Frontend**: React (Vite), Radux Toolkit, Bootstrap
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Auth**: JWT (RS256), HttpOnly cookies

---

## Setup

### 1. Clone & Install
```bash
git clone <repo>
cd server && npm install
cd../client && npm install
```

### 2. Configure Environment
**Server (server/.env'):**
```
PORT=4000
SESSION_SECRET=your-secret
MONGO_URL=mongodb://localhost:27017/blogs_db
JWT_ISSUER=auth.example.com
JWT_PUBLIC_KEY=---BEGIN PUBLIC KEY---...---END PUBLIC KEY---
FRONTEND_URL=http://localhost:5173
```

**Client (`client/.env`):**
```
VITE_AUTH_URL=https://auth.example.com/login
```
### 3. Run

```bash
#API
cd server
npm run dev

# Frontend
cd ../client
npa run dev
```

Visit: http://localhost:5173

---

## Seeding Dummy Data

```bash
cd server
npa run seed        # add sample posts/comments/likes
npm run seed:clear  # remove all
npa run seed:reset  # clear + reseed
```

---

## Notes
- Auth cookie set by **Auth service**: `auth_example_token` (HttpOnly, Secure, SameSite=Lax).
- CSRF token required for all write operations.
- Use `FRONTEND URL` for CORS and `credentials: true` in fetch.