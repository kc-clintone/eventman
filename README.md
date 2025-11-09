# EventMan - Event Management API

EventMan is a simple event management REST API built with `Node.js`, `Express.js`, and `Sequelize`.  
It allows organizers to create and manage events while attendees can RSVP and get approvals for participation.

---

## Features

- User authentication (JWT)
- Organizer & attendee roles
- Create, update, and delete events
- Event listing with pagination and filters
- RSVP system with capacity checks and approval workflow

---

## Tech Stack

- Node.js / Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- dotenv - for environment management

---

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/kc-clintone/eventman.git
cd eventman
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```bash
PORT=5000
USR=the_username_from_supabase_database_connection_config
PASSWD=your_database_password
DATABASE_URL=pg.yourpostgressurlgoeshere.co
JWT_SECRET=your_secret_key
```

> Make sure PostgreSQL is running and the database exists before starting the app.

### 4. Run database migrations

If you’re using Sequelize CLI:

```bash
npx sequelize-cli db:migrate
```

Or manually sync models in your `server.js` (if configured to do so).

### 5. Start the server

```bash
npm run dev
```

By default, the API runs at:
[http://localhost:5000](http://localhost:5000)
So after successfully executing `npm run dev` you will see a json response with a message "welcome to event management api"

---

## API Overview

### Auth

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |

### Events

| Method | Endpoint          | Description                                    |
| ------ | ----------------- | ---------------------------------------------- |
| GET    | `/api/events`     | List all events (supports pagination, filters) |
| GET    | `/api/events/:id` | Get single event                               |
| POST   | `/api/events`     | Create new event (Organizer only)              |
| PUT    | `/api/events/:id` | Update event (Organizer only)                  |
| DELETE | `/api/events/:id` | Delete event (Organizer only)                  |

### RSVP

| Method | Endpoint                                     | Description                           |
| ------ | -------------------------------------------- | ------------------------------------- |
| POST   | `/api/events/:eventId/rsvp`                  | RSVP to an event (Attendee)           |
| GET    | `/api/events/:eventId/rsvps`                 | View RSVPs for event (Organizer only) |
| PATCH  | `/api/events/:eventId/rsvps/:rsvpId/approve` | Approve RSVP (Organizer only)         |

---

## Notes

* JWT token is required for all routes except `/register` and `/login`.
* Organizers can only modify their own events.
* RSVP approvals are limited to the event’s `maxAttendees`.

---

## Project Structure

```
src/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   └── rsvpController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── user.model.js
│   ├── events.model.js
│   └── rsvp.model.js
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── rsvpRoutes.js
└── server.js
```
---

## License

MIT License
