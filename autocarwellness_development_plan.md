# Autocarwellness Website Development Plan

## 1. Context

**Website name:** Autocarwellness  
**Tech stack:** React + Node.js  
**Roles:** Owner and Customer  
**Theme:** Orange, black, and white  
**Business focus:** Automobile sale, purchase, insurance, finance, denting/painting, repairing, and maintenance.

This plan is based on the provided Swagger API, logo/banner reference, and the English transcript of the Hindi audio instructions.

---

## 2. Product Understanding

Autocarwellness should be built as a two-sided automobile platform:

1. **Customer-facing website** where users can browse available cars, view car details, show interest, sell their car, and submit service/finance/insurance enquiries.
2. **Owner/admin dashboard** where the owner can manage cars, dealers, photos, reports, customer interests, and business leads.

The customer should be able to browse cars without login. Login should only be required when the customer performs an action such as showing interest, saving a car, or submitting a request.

---

## 3. User Roles

## 3.1 Customer

A customer should be able to:

- View the home page.
- Browse available cars without login.
- View car details without login.
- View enlarged car photos with left/right navigation.
- Login using mobile number and OTP.
- Show interest in a car after OTP login.
- Submit name, email, phone number, and location for car interest.
- Submit sell-car request.
- Submit finance enquiry.
- Submit insurance enquiry.
- Submit repair/service/denting/painting request.
- Save favourite cars.
- View own profile and submitted requests.

## 3.2 Owner

Owner is the admin of the application.

Owner should be able to:

- Login securely.
- Add cars.
- Edit cars.
- Delete cars.
- Upload car photos.
- Upload car report PDF.
- Mark cars as available or sold.
- Manage dealers.
- Add, edit, and delete dealer information.
- View customer interests.
- View sell-car leads.
- View finance enquiries.
- View insurance enquiries.
- View service requests.
- Manage homepage content, testimonials, and FAQs.
- View dashboard statistics.

---

## 4. Existing APIs from Swagger

The current Swagger already contains four main modules:

### 4.1 Cars

- `POST /cars`
- `GET /cars`
- `GET /cars/{car_id}`
- `PUT /cars/{car_id}`
- `DELETE /cars/{car_id}`
- `POST /cars/{car_id}/report`
- `GET /dealers/{dealer_id}/cars`

### 4.2 Dealers

- `GET /dealers`
- `POST /dealers`
- `GET /dealers/{dealer_id}`
- `PUT /dealers/{dealer_id}`
- `DELETE /dealers/{dealer_id}`

### 4.3 Customer Interest

- `POST /car-interest/{car_id}`
- `GET /car-interest/{car_id}`

### 4.4 Auth

- `POST /auth/signup`
- `POST /auth/create-owner`
- `POST /auth/login`
- `GET /auth/verify`
- `POST /auth/logout`

---

## 5. Updated Authentication Plan

## 5.1 Customer Login: Mobile Number + OTP

Customer login should not be email/password based.

Customer flow:

1. Customer enters mobile number.
2. Backend checks if the customer already exists.
3. If customer does not exist, backend auto-registers the customer using the mobile number.
4. OTP is generated.
5. OTP is sent to the customer mobile number.
6. Customer enters OTP.
7. Backend verifies OTP.
8. Customer gets logged in.
9. Customer can perform protected actions.

This creates a smooth login/signup experience.

### Recommended Customer Auth APIs

```txt
POST /auth/customer/request-otp
POST /auth/customer/verify-otp
POST /auth/logout
GET  /auth/verify
```

### Request OTP API

```txt
POST /auth/customer/request-otp
```

Request:

```json
{
  "mobile_number": "9999890667"
}
```

Backend behavior:

- Validate mobile number.
- Check if customer exists.
- If not, create a customer record.
- Generate OTP.
- Save hashed OTP in database.
- Set OTP expiry.
- Send OTP using SMS provider.
- Return success response.

Response:

```json
{
  "success": true,
  "message": "OTP sent successfully",
  "is_new_customer": true
}
```

### Verify OTP API

```txt
POST /auth/customer/verify-otp
```

Request:

```json
{
  "mobile_number": "9999890667",
  "otp": "123456"
}
```

Backend behavior:

- Validate mobile number and OTP.
- Check latest OTP.
- Check expiry.
- Check attempt count.
- If valid, create session/JWT.
- Send JWT in httpOnly cookie.
- Return customer profile.

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "mobile_number": "9999890667",
    "role": "CUSTOMER"
  }
}
```

## 5.2 Owner Login

Owner should use secure email/password login because this is admin access.

Recommended owner auth APIs:

```txt
POST /auth/owner/login
POST /auth/create-owner
POST /auth/logout
GET  /auth/verify
```

---

## 6. OTP Security Rules

Recommended production rules:

```txt
OTP length: 6 digits
OTP expiry: 5 minutes
Maximum verification attempts: 3
Resend OTP cooldown: 30 to 60 seconds
Maximum OTP requests per mobile number: 5 per hour
Store OTP as hash, not plain text
Invalidate OTP after successful verification
Use httpOnly Secure SameSite cookie for auth token
```

For local development, a fixed OTP like `123456` may be used, but only in development environment.

---

## 7. Customer Journey

## 7.1 Home Page

The home page should have:

- Logo.
- Navigation.
- Buy Car CTA.
- Sell Car CTA.
- Insurance CTA.
- Finance CTA.
- Denting/Painting CTA.
- Repairing/Maintenance CTA.
- Contact or WhatsApp CTA.

Suggested hero copy:

```txt
Buy, Sell & Maintain Your Car with Autocarwellness
Trusted automobile solutions for cars, finance, insurance and car care.
```

Main CTA buttons:

```txt
Buy a Car
Sell Your Car
Book a Service
```

## 7.2 Buy Car Flow

1. Customer clicks **Buy Car**.
2. Website opens car listing page.
3. Only available cars are shown.
4. Customer applies filters if required.
5. Customer clicks on a car.
6. Car detail page opens.
7. Customer sees large car photo, image gallery, car details, dealer details, report PDF, and interest button.
8. Customer clicks **I am Interested**.
9. If not logged in, OTP login modal opens.
10. After OTP verification, interest form opens.
11. Customer submits name, email, phone, and location.
12. Owner sees the lead in admin dashboard.

## 7.3 Sell Car Flow

1. Customer clicks **Sell Car**.
2. Customer fills car details.
3. If not logged in, OTP login is triggered.
4. Customer submits request.
5. Owner sees sell-car lead.
6. Owner contacts customer.

---

## 8. Suggested Website Pages

## 8.1 Public Customer Website

### Home Page

Sections:

- Hero section.
- Buy/Sell CTA.
- Featured cars.
- Services section.
- Why choose Autocarwellness.
- Finance and insurance CTA.
- Sell your car CTA.
- Testimonials.
- Contact CTA.

### Car Listing Page

Features:

- Grid/list view.
- Filters by brand, fuel type, price range, year, transmission, city, kms driven, ownership.
- Sort by price, newest, kms driven, and year.

### Car Detail Page

Sections:

- Image gallery.
- Car name and price.
- Key specifications.
- Dealer details.
- Inspection report download.
- Interest form CTA.
- Similar cars.

### Other Pages

- Sell Your Car Page.
- Finance Page.
- Insurance Page.
- Services Page.
- About Page.
- Contact Page.
- Customer Profile Page.
- Favourites Page.

## 8.2 Owner/Admin Dashboard

Pages:

- Admin Login.
- Dashboard Home.
- Manage Cars.
- Add/Edit Car.
- Manage Dealers.
- Customer Interests.
- Sell Car Requests.
- Finance Enquiries.
- Insurance Enquiries.
- Service Requests.
- Testimonials.
- Content Management.
- Settings.

---

## 9. Recommended Additional APIs

## 9.1 Public APIs

These should not require login:

```txt
GET  /cars
GET  /cars/{car_id}
GET  /dealers
GET  /testimonials
GET  /content/homepage
GET  /content/about
POST /auth/customer/request-otp
POST /auth/customer/verify-otp
POST /contact-us
```

## 9.2 Customer Protected APIs

These require customer login:

```txt
GET    /customers/me
PUT    /customers/me
POST   /car-interest/{car_id}
POST   /favorites/{car_id}
GET    /favorites
DELETE /favorites/{car_id}
POST   /sell-car-requests
GET    /sell-car-requests/me
POST   /finance-enquiries
GET    /finance-enquiries/me
POST   /insurance-enquiries
GET    /insurance-enquiries/me
POST   /service-requests
GET    /service-requests/me
```

## 9.3 Owner Protected APIs

These require owner role:

```txt
POST   /cars
PUT    /cars/{car_id}
DELETE /cars/{car_id}
POST   /cars/{car_id}/report
POST   /cars/{car_id}/images
DELETE /cars/{car_id}/images/{image_id}
PUT    /cars/{car_id}/images/{image_id}/primary

POST   /dealers
PUT    /dealers/{dealer_id}
DELETE /dealers/{dealer_id}

GET    /car-interest/{car_id}
GET    /admin/customer-interests
GET    /admin/dashboard/summary

GET    /sell-car-requests
GET    /sell-car-requests/{id}
PUT    /sell-car-requests/{id}/status

GET    /finance-enquiries
GET    /finance-enquiries/{id}
PUT    /finance-enquiries/{id}/status

GET    /insurance-enquiries
GET    /insurance-enquiries/{id}
PUT    /insurance-enquiries/{id}/status

GET    /service-requests
GET    /service-requests/{id}
PUT    /service-requests/{id}/status
```

---

## 10. Design System Specification

The visual identity should be bold, automobile-focused, high-contrast, and trustworthy.

## 10.1 Brand Colors

### Primary Orange

Use for CTAs, active states, highlights, and key homepage sections.

```txt
#F47A20
```

### Deep Black

Use for header, footer, navigation, and strong content sections.

```txt
#050505
```

### White

Use for cards and content surfaces.

```txt
#FFFFFF
```

### Red Accent

Inspired by the red car circle in the logo. Use sparingly.

```txt
#E9342D
```

### Light Grey Background

```txt
#F5F5F5
```

### Border Grey

```txt
#E5E7EB
```

### Text Dark

```txt
#111827
```

### Text Muted

```txt
#6B7280
```

## 10.2 Typography

Recommended fonts:

```txt
Primary font: Poppins
Secondary font: Inter
```

Usage:

- Poppins for headings, buttons, and navigation.
- Inter for body text, forms, tables, and dashboard.

Type scale:

```txt
H1: 48px / 56px / 700
H2: 36px / 44px / 700
H3: 28px / 36px / 600
H4: 22px / 30px / 600
Body Large: 18px / 28px / 400
Body: 16px / 24px / 400
Small: 14px / 20px / 400
Caption: 12px / 16px / 400
```

## 10.3 Buttons

### Primary Button

```txt
Background: #F47A20
Text: #FFFFFF
Hover: #D96513
Border radius: 10px
Height: 44px
```

Example labels:

```txt
Buy a Car
Sell Your Car
Show Interest
Book Service
Apply for Finance
```

### Secondary Button

```txt
Background: #050505
Text: #FFFFFF
Hover: #222222
Border radius: 10px
Height: 44px
```

### Outline Button

```txt
Border: #F47A20
Text: #F47A20
Background: transparent
```

## 10.4 Cards

Used for car cards, service cards, and dashboard cards.

```txt
Background: #FFFFFF
Border: 1px solid #E5E7EB
Radius: 16px
Shadow: subtle
Padding: 20px
```

## 10.5 Forms

```txt
Input height: 44px
Border: #D1D5DB
Focus border: #F47A20
Radius: 10px
Label: 14px medium
Error text: red
```

## 10.6 Icons

Recommended icon library:

```txt
lucide-react
```

Suggested icons:

- Car
- Fuel
- Gauge
- Calendar
- MapPin
- Phone
- Mail
- ShieldCheck
- Wrench
- BadgeIndianRupee
- User
- LayoutDashboard

---

## 11. Frontend Architecture

Recommended stack:

```txt
React + TypeScript
Vite
React Router
TanStack Query
Axios
React Hook Form
Zod
Tailwind CSS
Zustand
Lucide React
```

## 11.1 Why This Stack

- React for UI.
- TypeScript for type safety.
- Vite for fast development.
- React Router for routing.
- TanStack Query for API data fetching, caching, pagination, and invalidation.
- Axios for API client.
- React Hook Form + Zod for strong form validation.
- Tailwind CSS for fast design system implementation.
- Zustand for simple global state.
- Lucide React for icons.

---

## 12. Frontend Repo Structure

```txt
autocarwellness-frontend/
│
├── public/
│   ├── logo.png
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── PublicLayout.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   └── ui/
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api.ts
│   │   │   ├── hooks.ts
│   │   │   ├── types.ts
│   │   │   ├── store.ts
│   │   │   └── components/
│   │   │       ├── CustomerOtpLoginModal.tsx
│   │   │       ├── MobileNumberForm.tsx
│   │   │       └── OtpVerificationForm.tsx
│   │   │
│   │   ├── cars/
│   │   │   ├── api.ts
│   │   │   ├── hooks.ts
│   │   │   ├── types.ts
│   │   │   ├── components/
│   │   │   │   ├── CarCard.tsx
│   │   │   │   ├── CarFilters.tsx
│   │   │   │   ├── CarGallery.tsx
│   │   │   │   ├── CarSpecs.tsx
│   │   │   │   └── InterestForm.tsx
│   │   │   └── pages/
│   │   │       ├── CarListPage.tsx
│   │   │       ├── CarDetailPage.tsx
│   │   │       ├── AdminCarsPage.tsx
│   │   │       └── CarFormPage.tsx
│   │   │
│   │   ├── dealers/
│   │   ├── interests/
│   │   ├── sellCar/
│   │   ├── finance/
│   │   ├── insurance/
│   │   ├── services/
│   │   ├── favorites/
│   │   └── dashboard/
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── FinancePage.tsx
│   │   │   ├── InsurancePage.tsx
│   │   │   ├── SellCarPage.tsx
│   │   │   └── ServicesPage.tsx
│   │   │
│   │   └── admin/
│   │       ├── DashboardPage.tsx
│   │       ├── LeadsPage.tsx
│   │       └── SettingsPage.tsx
│   │
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── queryClient.ts
│   │   ├── authGuard.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.css
│   │
│   ├── types/
│   │   └── common.ts
│   │
│   └── main.tsx
│
├── .env
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 13. Backend Architecture

Recommended backend stack:

```txt
Node.js
Express.js or NestJS
TypeScript
PostgreSQL
Prisma ORM
JWT Auth with httpOnly cookies
Multer for file upload
S3 or Cloudinary for image storage
Zod or Joi for validation
Winston or Pino for logging
```

For a clean scalable project, **NestJS + Prisma + PostgreSQL** is recommended.

For faster/simple development, **Express + Prisma + PostgreSQL** is also fine.

---

## 14. Backend Repo Structure

```txt
autocarwellness-backend/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   ├── db.ts
│   │   └── storage.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── otp.service.ts
│   │   │   ├── sms.service.ts
│   │   │   ├── auth.validation.ts
│   │   │   └── auth.types.ts
│   │   │
│   │   ├── users/
│   │   ├── cars/
│   │   ├── carImages/
│   │   ├── dealers/
│   │   ├── interests/
│   │   ├── favorites/
│   │   ├── sellCarRequests/
│   │   ├── financeEnquiries/
│   │   ├── insuranceEnquiries/
│   │   ├── serviceRequests/
│   │   ├── contact/
│   │   ├── testimonials/
│   │   ├── dashboard/
│   │   └── content/
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── customerAuth.middleware.ts
│   │   ├── ownerAuth.middleware.ts
│   │   ├── upload.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── integrations/
│   │   ├── sms/
│   │   │   ├── sms.provider.ts
│   │   │   └── mockSms.provider.ts
│   │   └── storage/
│   │       ├── s3.provider.ts
│   │       └── local.provider.ts
│   │
│   ├── utils/
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── jwt.ts
│   │   ├── otp.ts
│   │   ├── pagination.ts
│   │   └── slug.ts
│   │
│   └── types/
│       └── express.d.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── uploads/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## 15. Suggested Database Models

## 15.1 User

```txt
id
role: OWNER | CUSTOMER
email
mobile_number
password_hash
name
is_active
created_at
updated_at
```

For customer, `mobile_number` is mandatory.  
For owner, `email` and `password_hash` are mandatory.

## 15.2 OtpVerification

```txt
id
mobile_number
otp_hash
purpose: LOGIN
expires_at
attempt_count
is_used
created_at
```

## 15.3 Dealer

```txt
id
dealer_name
dealer_address_line1
dealer_address_line2
city
state
pincode
created_at
updated_at
```

## 15.4 Car

```txt
id
dealer_id
car_name
car_company
car_fuel_type
car_manufacture_year
car_registration_date
car_registration_state
car_registration_number
car_variant
kms_driven
transmission
color
expected_price
number_of_owners
insurance_valid_upto
status: available | sold
report_url
created_at
updated_at
```

## 15.5 CarImage

```txt
id
car_id
image_url
is_primary
sort_order
created_at
```

## 15.6 CustomerInterest

```txt
id
car_id
customer_id
customer_name
email
phone
location
status: new | contacted | follow_up | closed
created_at
updated_at
```

## 15.7 Favorite

```txt
id
user_id
car_id
created_at
```

## 15.8 SellCarRequest

```txt
id
customer_id
customer_name
phone
email
city
car_company
car_model
manufacture_year
kms_driven
fuel_type
expected_price
description
status: new | contacted | inspection_scheduled | offer_given | closed | rejected
created_at
updated_at
```

## 15.9 FinanceEnquiry

```txt
id
customer_id
customer_name
phone
email
car_id
loan_amount
monthly_income
city
status: new | contacted | in_progress | approved | rejected | closed
created_at
updated_at
```

## 15.10 InsuranceEnquiry

```txt
id
customer_id
customer_name
phone
email
registration_number
insurance_type: new | renewal | used_car_transfer
city
status: new | contacted | in_progress | closed
created_at
updated_at
```

## 15.11 ServiceRequest

```txt
id
customer_id
customer_name
phone
email
service_type: repair | maintenance | denting | painting
car_company
car_model
description
preferred_date
status: new | contacted | scheduled | completed | cancelled
created_at
updated_at
```

---

## 16. Route Structure

## 16.1 Customer Routes

```txt
/
/cars
/cars/:carId
/sell-car
/finance
/insurance
/services
/about
/contact
/profile
/favorites
```

## 16.2 Owner Routes

```txt
/admin/login
/admin/dashboard
/admin/cars
/admin/cars/new
/admin/cars/:carId/edit
/admin/dealers
/admin/customer-interests
/admin/sell-car-requests
/admin/finance-enquiries
/admin/insurance-enquiries
/admin/service-requests
/admin/testimonials
/admin/content
/admin/settings
```

---

## 17. Role Access Matrix

| Module | Customer | Owner |
|---|---:|---:|
| View home page | Yes | Yes |
| View available cars | Yes | Yes |
| View car detail | Yes | Yes |
| Login with mobile OTP | Yes | No |
| Login with email/password | No | Yes |
| Show car interest | Yes | Yes |
| Save favourite car | Yes | No |
| Submit sell-car request | Yes | Yes |
| Submit finance enquiry | Yes | Yes |
| Submit insurance enquiry | Yes | Yes |
| Submit service request | Yes | Yes |
| Add car | No | Yes |
| Edit car | No | Yes |
| Delete car | No | Yes |
| Upload car images | No | Yes |
| Upload car report | No | Yes |
| Mark car sold/available | No | Yes |
| Manage dealers | No | Yes |
| View all leads | No | Yes |
| Update lead status | No | Yes |
| View dashboard stats | No | Yes |
| Manage content | No | Yes |

---

## 18. UX Recommendations

## 18.1 Customer UX

The customer experience should be simple and trust-focused.

Customers usually want answers to these questions:

```txt
Is the car good?
What is the price?
Can I trust this seller?
Can I get finance or insurance?
Whom do I call?
```

Every car detail page should have clear CTAs:

```txt
Call Now
WhatsApp
Show Interest
Download Report
Apply for Finance
```

## 18.2 Owner UX

The owner dashboard should focus on speed and clarity.

Owner priorities:

```txt
Add car quickly
Upload images quickly
Track leads clearly
Change status easily
See pending enquiries first
```

Use status badges:

```txt
New
Contacted
In Progress
Follow Up
Closed
Rejected
Sold
Available
```

---

## 19. Development Phases

## Phase 1 — Requirement and Base Setup

- Finalize customer and owner flows.
- Finalize Swagger/API contract.
- Setup React frontend.
- Setup Node backend.
- Setup PostgreSQL database.
- Setup role model: OWNER and CUSTOMER.

## Phase 2 — Authentication

- Owner email/password login.
- Customer mobile OTP login.
- OTP database table.
- SMS provider integration.
- Auth middleware.
- Role middleware.
- Logout and session verification.

## Phase 3 — Public Customer Website

- Home page.
- Buy car listing.
- Car detail page.
- Car image gallery.
- Interest CTA.
- Sell car page.
- Finance page.
- Insurance page.
- Services page.
- Contact page.

## Phase 4 — Owner Dashboard

- Dashboard summary.
- Manage cars.
- Add/edit/delete cars.
- Upload images.
- Upload report.
- Manage dealers.
- View customer interests.

## Phase 5 — Lead Management

- Sell car requests.
- Finance enquiries.
- Insurance enquiries.
- Service requests.
- Status tracking.
- Search/filter/export leads.

## Phase 6 — Production Readiness

- Responsive design.
- SEO setup.
- Image optimization.
- API validation.
- Rate limiting.
- OTP abuse protection.
- Error handling.
- Logging.
- Deployment.
- Backup strategy.

---

## 20. Final Recommendation

Autocarwellness should be built as:

```txt
Customer website:
Open browsing with OTP-based login only when action is needed.

Owner dashboard:
Secure admin area with full control over cars, dealers, photos, reports, and leads.
```

The customer should not feel like they are doing a traditional signup. The ideal flow is:

```txt
Enter mobile number → receive OTP → verify OTP → continue
```

This will be smoother for Indian customers and better suited for an automobile enquiry-based platform.
