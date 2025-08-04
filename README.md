# RealTimeTask – Collaborative To-Do App

This is a fullstack real-time collaborative task app developed as a technical challenge.  
It consists of a **React Native mobile frontend** and a **NestJS backend** with real-time communication using Socket.IO.

---

## Project Structure

```
/frontend   → React Native app (Expo)
/backend    → NestJS API with Prisma and PostgreSQL
```

---

## Tech Stack

### Frontend:
- React Native (Expo)
- Context API or Zustand
- Socket.IO Client
- Axios (for HTTP requests)
- React Navigation
- AsyncStorage (for JWT)

### Backend:
- NestJS
- Prisma ORM + PostgreSQL
- JWT + Passport
- Socket.IO (WebSockets)
- Docker-ready configuration

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or Docker)
- Expo CLI (`npm install -g expo-cli`)

---

### Run the backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

Optional: use Docker  
```bash
docker-compose up -d
```

---

### Run the frontend

```bash
cd frontend
npm install
npx expo start
```

---

## Authentication

- JWT-based login system
- Secured protected routes with guards
- Access token stored in app via `AsyncStorage`

---

## Real-Time Features

- All task changes (create/edit/delete) are broadcasted in real-time to other users using Socket.IO.
- A WebSocket gateway in NestJS emits events upon database updates.

---

## API Endpoints (summary)

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | /auth/register   | Create a new user     |
| POST   | /auth/login      | Authenticate user     |
| GET    | /tasks           | Get all tasks         |
| POST   | /tasks           | Create new task       |
| PATCH  | /tasks/:id       | Update a task         |
| DELETE | /tasks/:id       | Delete a task         |

---

## Developer Notes

- Fully typed with TypeScript
- Clean architecture using SOLID principles
- Data validation via `class-validator`
- Easily extensible for user-specific task lists, themes, etc.

---

## Optional Enhancements

- Dark/light theme toggle
- Sharing tasks via invitation
- Unit tests with Jest (backend)

---

## Author

Developed by Ronald Brito as part of a technical assessment.  
Feel free to reach out!