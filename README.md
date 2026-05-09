# Autocarwellness

Full-stack web platform for a used car dealership — browse and buy cars, sell your car, apply for finance/insurance, book services, and manage everything via an owner admin dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript 5, Vite, Tailwind CSS |
| State | Zustand (auth), TanStack Query v5 (server state) |
| Forms | React Hook Form + Zod |
| Routing | React Router v6 |
| HTTP | Axios |
| Icons | Lucide React |
| Backend | Node.js, Express, TypeScript |
| ORM | Prisma |
| Database | SQLite (dev) |
| Auth | JWT + OTP (customers), email/password (owner) |

---

## Project Structure

```
autocarwellness/
├── frontend/               # React SPA
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   └── OtpLoginModal.tsx
│   │   │   ├── common/
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   └── Modal.tsx
│   │   │   └── layout/
│   │   │       ├── AdminLayout.tsx
│   │   │       ├── Footer.tsx
│   │   │       ├── Header.tsx
│   │   │       └── PublicLayout.tsx
│   │   ├── hooks/
│   │   │   ├── useCars.ts
│   │   │   ├── useDealers.ts
│   │   │   └── useLeads.ts
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── queryClient.ts
│   │   │   └── types.ts
│   │   ├── pages/
│   │   │   ├── AuthPage.tsx
│   │   │   ├── admin/
│   │   │   │   ├── CarFormPage.tsx
│   │   │   │   ├── CarsPage.tsx
│   │   │   │   ├── DashboardPage.tsx
│   │   │   │   ├── DealersPage.tsx
│   │   │   │   └── LeadsPage.tsx
│   │   │   └── public/
│   │   │       ├── AboutPage.tsx
│   │   │       ├── CarDetailPage.tsx
│   │   │       ├── CarListPage.tsx
│   │   │       ├── ContactPage.tsx
│   │   │       ├── FinancePage.tsx
│   │   │       ├── HomePage.tsx
│   │   │       ├── InsurancePage.tsx
│   │   │       ├── SellCarPage.tsx
│   │   │       └── ServicesPage.tsx
│   │   └── stores/
│   │       └── authStore.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── backend/                # Express API
    ├── src/
    │   ├── app.ts
    │   ├── server.ts
    │   ├── config/
    │   │   ├── db.ts
    │   │   └── env.ts
    │   ├── middlewares/
    │   │   ├── auth.middleware.ts
    │   │   └── error.middleware.ts
    │   ├── modules/
    │   │   ├── auth/
    │   │   │   ├── auth.controller.ts
    │   │   │   └── auth.routes.ts
    │   │   ├── cars/
    │   │   │   ├── cars.controller.ts
    │   │   │   └── cars.routes.ts
    │   │   └── dealers/
    │   │       ├── dealers.controller.ts
    │   │       └── dealers.routes.ts
    │   ├── routes/
    │   │   └── api.ts
    │   └── scripts/
    │       └── seed.ts
    ├── prisma/
    │   └── schema.prisma
    └── tsconfig.json
```

---

## Features

### Public Website
- **Home** — Hero, services overview, featured cars, why-us stats, testimonials, CTA
- **Car Listings** — Filterable grid (fuel type, transmission, brand, price range)
- **Car Detail** — Image gallery with thumbnails, key specs, OTP-gated interest form, Call/WhatsApp CTAs, inspection report download, finance CTA, dealer info
- **Sell Your Car** — Validated form (brand, model, year, kms, fuel type, expected price)
- **Finance** — Loan application form with income and amount fields
- **Insurance** — Quote form with new/renewal/transfer type selector
- **Services** — Repair/maintenance/denting/painting booking with date picker
- **About & Contact** — Business info, contact form, WhatsApp CTA

### Authentication
- **Customers** — Mobile OTP login (6-digit, 60s resend cooldown, +91 prefix)
- **Owner** — Email + password login → redirects to admin dashboard
- JWT stored in httpOnly cookies; Zustand persists session state

### Admin Dashboard (owner-only)
- **Dashboard** — Summary stats (cars, leads, enquiries), quick actions, pending items
- **Cars** — Full table with status toggle (available/sold), edit, delete
- **Car Form** — Add/edit car with all fields including images, dealer assignment, registration and insurance details
- **Dealers** — Card grid with add/edit/delete modal
- **Leads** — Five separate views (Customer Interests, Sell Requests, Finance, Insurance, Service) with status update modal

---

## Database Models

| Model | Purpose |
|---|---|
| `User` | Customers (OTP) and owner (email/password) |
| `OtpVerification` | OTP records with expiry and attempt tracking |
| `Dealer` | Dealer profiles linked to cars |
| `Car` | Car listings with full spec fields |
| `CarImage` | Multiple images per car, one marked primary |
| `CustomerInterest` | Interest submissions from car detail page |
| `Favorite` | Customer saved cars |
| `SellCarRequest` | Sell-my-car form submissions |
| `FinanceEnquiry` | Loan application submissions |
| `InsuranceEnquiry` | Insurance quote submissions |
| `ServiceRequest` | Service booking submissions |

---

## API Routes

Base URL: `http://localhost:4000/api`

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/auth/request-otp` | Send OTP to mobile number |
| POST | `/auth/verify-otp` | Verify OTP and issue JWT |
| POST | `/auth/owner-login` | Owner email/password login |
| POST | `/auth/logout` | Clear session |
| GET | `/auth/me` | Get current user |
| GET | `/cars` | List cars with filters |
| GET | `/cars/:id` | Get car detail |
| POST | `/cars` | Create car (owner) |
| PUT | `/cars/:id` | Update car (owner) |
| DELETE | `/cars/:id` | Delete car (owner) |
| GET | `/dealers` | List dealers |
| POST | `/dealers` | Create dealer (owner) |
| PUT | `/dealers/:id` | Update dealer (owner) |
| DELETE | `/dealers/:id` | Delete dealer (owner) |

Full API spec: [`updated_swagger.json`](updated_swagger.json)

---

## Design Tokens

| Token | Value |
|---|---|
| Primary Orange | `#F47A20` |
| Deep Black | `#050505` |
| Error Red | `#E9342D` |
| Border Grey | `#E5E7EB` |
| Text Dark | `#111827` |
| Text Muted | `#6B7280` |
| Heading font | Poppins |
| Body font | Inter |
| Button radius | `rounded-[10px]`, height `h-11` (44px) |
| Card style | `rounded-2xl border border-[#E5E7EB] shadow-card` |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
cp .env.example .env        # set DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run seed                 # optional: seed sample data
npm run dev
```

Server runs on `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env        # set VITE_API_BASE_URL
npm run dev
```

App runs on `http://localhost:5173`.

### Environment Variables

**backend/.env**
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secure_secret"
PORT=4000
```

**frontend/.env**
```
VITE_API_BASE_URL=http://localhost:4000/api
```

---

## Scripts

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start dev server with nodemon |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled output |
| `npm run prisma:migrate` | Run database migrations |
| `npm run seed` | Seed initial data |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and bundle for production |
| `npm run preview` | Preview production build locally |

# Terminal 1 — start mock server
cd backend && npm run mock

# frontend/.env — point to mock
VITE_API_BASE_URL=http://localhost:4001/api
