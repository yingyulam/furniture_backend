# Once Upon A Furniture — Backend API

REST API for **Once Upon A Furniture**, an online marketplace for buying and
selling used furniture. Built with Node.js, Express, and MongoDB.

- **Live API:** https://furniture-backend-255g.onrender.com
- **Web app:** https://furniture-frontend-weld.vercel.app
- **Frontend repo:** https://github.com/yingyulam/furniture_frontend

## Features

- Listings CRUD (create, read, update, delete)
- Full-text search by name; filtering by category and condition
- Pagination
- User favorites / wishlist
- Public seller profile (nickname, contact, photo)
- Listing history by user

## Tech stack

- **Runtime:** Node.js (ES modules)
- **Framework:** Express
- **Database:** MongoDB (MongoDB Atlas)
- **Hosting:** Render

## Project structure

```
furniture_backend/
├── api/
│   ├── furniture.route.js        # Route definitions
│   ├── furniture.controller.js   # Listing request handlers
│   └── favorites.controller.js   # Favorites & profile handlers
├── dao/
│   ├── furnitureDAO.js           # Listing data access (MongoDB)
│   └── favoritesDAO.js           # Favorites & profile data access
├── index.js                      # Entry point: connect to DB, start server
├── server.js                     # Express app, middleware, route mounting
├── package.json
└── .env.example
```

## API endpoints

Base path: `/api/v1/furniture`

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | List / search listings (`title`, `category`, `condition`, `page`, `furniturePerPage`) |
| GET | `/id/:id` | Get a listing by id |
| GET | `/categories` | Distinct categories |
| GET | `/conditions` | Distinct conditions |
| GET | `/history/:userId` | Listings created by a user |
| POST | `/upload` | Create a listing |
| PUT | `/update` | Update a listing |
| DELETE | `/delete` | Delete a listing |
| PUT | `/favorite` | Update a user's favorites |
| GET | `/favorite/:userId` | Get a user's favorites / profile |
| PUT | `/profile` | Update a user's profile |

Health check: `GET /` → `{ "status": "ok", "service": "furniture-backend" }`

## Getting started

### Prerequisites
- Node.js 18+
- A MongoDB database (MongoDB Atlas or local)

### Setup
```bash
npm install
cp .env.example .env    # copy the template, then fill in your values
npm start               # http://localhost:8000
```

### Environment variables

| Variable | Description |
| --- | --- |
| `FURNITURE_DB_URI` | MongoDB connection string |
| `FURNITURE_NS` | Database name (e.g. `furniture_db`) |
| `PORT` | Server port (optional; hosts inject their own) |

`.env` is gitignored — never commit real secrets.

## Deployment (Render)

1. Create a Render **Web Service** from this repository.
2. Build command: `npm install` · Start command: `node index.js`.
3. Add environment variables `FURNITURE_DB_URI` and `FURNITURE_NS`
   (`PORT` is provided by Render automatically).

The frontend is deployed separately on Vercel.
