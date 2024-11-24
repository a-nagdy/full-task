# Todo Application

A full-stack Todo application with TypeScript, Next.js frontend and Express.js backend.

## Frontend

### Technologies
- Next.js 15
- TypeScript
- Tailwind CSS
- Jest for testing

### Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. Start development server:
```bash
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Project Structure
```
frontend/
├── app/
│   ├── components/
│   │   └── TodoList/
│   ├── services/
│   ├── types/
│   └── layout.tsx
├── public/
└── tests/
```

## Backend

### Technologies
- Express.js
- TypeScript
- Jest for testing
- UUID for ID generation

### Setup
1. Install dependencies:
```bash
cd backend
npm install
```

2. Start development server:
```bash
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

### API Endpoints

#### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

#### Request/Response Examples
```json
// GET /tasks
[
  {
    "id": "uuid",
    "title": "Task title",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]

// POST /tasks
{
  "title": "New task"
}

// PUT /tasks/:id
{
  "title": "Updated title",
  "completed": true
}
```

### Project Structure
```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── types/
│   ├── app.ts
│   └── server.ts
└── tests/
```

## Quick Start

1. Install all dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

2. Start both servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Testing

Run tests for both applications:
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## License
MIT
