# Autocarwellness Backend

## Setup

1. Copy `.env.example` to `.env` and update the database connection string.

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Run database migrations:

```bash
npm run prisma:migrate
```

5. Seed initial data:

```bash
npm run seed
```

6. Start the server in development mode:

```bash
npm run dev
```

## Available routes

- `GET /` — basic health response
- `GET /api/health` — API health status
- `POST /api/auth/signup` — signup placeholder
- `POST /api/auth/login` — login placeholder
- `GET /api/auth/verify` — verify token placeholder
- `POST /api/auth/logout` — logout placeholder
- `GET /api/cars` — list cars placeholder
- `POST /api/cars` — create car placeholder
- `GET /api/dealers` — list dealers placeholder

## Notes

The backend is currently scaffolded for Phase 1 with placeholder API implementations and Prisma schema setup.
