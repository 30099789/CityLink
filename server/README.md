# CityLink API Server

Express.js REST API backend for the CityLink Smart Community Portal.

## Setup

```bash
cd server
npm install
npm run dev
```

Server runs at: `http://localhost:3001/api`

## Running the full project

Open **two terminals**:

```bash
# Terminal 1 — API server
cd CityLink/server
npm install
npm run dev

# Terminal 2 — React frontend
cd CityLink/client
npm run dev
```

Then open: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login |
| POST | /api/auth/register | Register new user |
| GET | /api/events | Get all events |
| POST | /api/events | Create event |
| PUT | /api/events/:id | Update event |
| DELETE | /api/events/:id | Delete event |
| GET | /api/announcements | Get announcements |
| POST | /api/announcements | Create announcement |
| PUT | /api/announcements/:id | Update announcement |
| DELETE | /api/announcements/:id | Delete announcement |
| GET | /api/feedback | Get all feedback |
| POST | /api/feedback | Submit feedback |
| PUT | /api/feedback/:id | Update feedback status |
| GET | /api/bookings | Get all bookings |
| POST | /api/bookings | Create booking |
| PUT | /api/bookings/:id | Update booking |
| DELETE | /api/bookings/:id | Delete booking |
| GET | /api/users | Get all users (admin) |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

## Data Storage

All data is stored in `server/data/db.json` (JSON file database).
No external database required.

## Fallback

If the server is not running, the frontend automatically falls back
to localStorage so the app still works without the backend.
