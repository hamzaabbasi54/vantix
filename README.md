# Vantix — Real‑Time Chat App

Full‑stack real‑time chat application with custom JWT auth, Socket.io messaging, online presence, image uploads, welcome emails, and API protection (rate limiting / bot detection) via Arcjet.

- **Live**: `https://chatty-ga2yy.sevalla.app/`
- **Repo**: `https://github.com/hamzaabbasi54/vantix`

## Tech stack

- **Frontend**: React + Vite, Tailwind CSS, DaisyUI, Zustand, Socket.io Client
- **Backend**: Node.js + Express, MongoDB + Mongoose, Socket.io, JWT (cookies)
- **Integrations**: Cloudinary (images), Resend (emails), Arcjet (rate limiting / bot protection)

## Project structure

```txt
vantix-app/
  backend/     # Express API + Socket.io server
  frontend/    # React (Vite) client
  package.json # root scripts for build/start (production-style)
```

## Prerequisites

- **Node.js**: >= 20 (required by root `package.json`)
- **npm**: comes with Node
- **MongoDB**: local MongoDB or MongoDB Atlas connection string
- Accounts/keys for:
  - **Cloudinary** (image uploads)
  - **Resend** (welcome emails)
  - **Arcjet** (API rate limiting / bot detection)

## Get the code

```bash
git clone https://github.com/hamzaabbasi54/vantix.git
cd vantix
```

## Environment variables (required)

Create a file at **`backend/.env`** and fill in the values (the backend loads env via `dotenv` in `backend/server.js`).

```bash
# backend/.env

# IMPORTANT for local dev (cookie "secure" flag depends on this)
NODE_ENV=development # or: production

# Server
PORT=<your_port>

# Database
MONGO_URI=<your_mongodb_connection_string>

# Auth
JWT_SECRET=<your_jwt_secret>

# Arcjet (rate limiting / bot protection)
ARCJET_KEY=<your_arcjet_key>

# Resend (welcome emails)
RESEND_API_KEY=<your_resend_api_key>
EMAIL_FROM=<your_verified_sender_email>
EMAIL_FROM_NAME=Vantix

# Used in welcome email links
CLIENT_URL=<your_frontend_url>

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

### Generate a JWT secret (example)

Run this from any terminal (PowerShell / CMD / bash) and copy the output into `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Run locally (development)

You’ll run **backend** and **frontend** in two terminals.

### 1) Backend (API + Socket.io)

```bash
cd backend
npm install
npm run dev
```

Backend runs on:
- **API**: `http://localhost:3000/api`
- **Socket.io**: `http://localhost:3000`

### 2) Frontend (Vite)

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
- **App**: `http://localhost:5173`

## Run locally (production-style build)

This builds the frontend and serves it from the backend in production mode.

From the project root:

```bash
npm run build
npm start
```

Then open:
- `http://localhost:3000`

## Notes (CORS / cookies / sockets)

- **Allowed frontend origins are currently hard-coded** in:
  - `backend/server.js` (Express CORS)
  - `backend/config/socket.js` (Socket.io CORS)

If you run the frontend on a different URL/port, update those origin lists.

- For local development, keep **`NODE_ENV=development`** in `backend/.env` so the JWT cookie is not forced to `secure: true`.

## Troubleshooting

- **Login works but you’re not staying logged in**
  - Ensure `backend/.env` has `NODE_ENV=development`
  - Ensure frontend requests use cookies (this project uses `withCredentials: true`)

- **CORS error in browser**
  - Make sure you’re using `http://localhost:5173`
  - If not, add your origin to the CORS arrays in `backend/server.js` and `backend/config/socket.js`

- **Emails not sending**
  - Check `RESEND_API_KEY`, `EMAIL_FROM`, and that your sending domain/address is allowed in Resend

- **Image upload failing**
  - Verify Cloudinary env vars: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

- **Arcjet blocking / errors**
  - Confirm `ARCJET_KEY` is set
  - Arcjet rules are configured in `backend/config/arcjet.js` (currently `DRY_RUN` for logging-style behavior)

