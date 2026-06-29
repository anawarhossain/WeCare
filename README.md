# WeCare Client

A modern healthcare booking and patient management client built with Next.js 16 and React 19.

## Overview

`wecare-client` is the frontend for a digital healthcare platform designed to connect patients with verified doctors, manage appointments, and support role-based dashboards for patients, doctors, and administrators.

The app features:

- Public marketing pages: Home, About, Contact
- Doctor search and profile browsing
- User authentication with email/password and Google social login
- Integration with Stripe for payment flow
- Role-aware dashboard experience for patients, doctors, and admins
- MongoDB-backed auth and user session handling via Better Auth
- Responsive UI built with Tailwind CSS and custom components

## Technology Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Better Auth for authentication
- MongoDB for user and session storage
- Stripe for payments
- Recharts for charts and analytics
- @heroui/react UI primitives
- Framer Motion for motion and transitions

## Key Features

- Home page with featured doctors, specializations, stats and testimonials
- Doctor discovery experience with search, filtering and detail pages
- Secure signin/signup flows with client and server session support
- Patient dashboard for appointments, payments and reviews
- Doctor dashboard for schedule, appointments, prescriptions and profile management
- Admin dashboard for managing doctors, patients, appointments and payments
- Contact page with FAQ, map, and inquiry form
- Dynamic page metadata and server-rendered content

## Repository Structure

- `src/app/` — Next.js route handlers and page layers
  - `(main)` — public site pages and discovery experiences
  - `(auth)` — signin/signup routes
  - `(dashboard)` — protected patient, doctor, and admin dashboards
- `src/components/` — reusable UI and page sections
- `src/lib/` — authentication, API clients, Stripe integration, utilities
- `src/lib/api/` — client-side API helper functions
- `src/lib/core/` — shared server helpers and session utilities

## Environment Setup

The app requires environment variables for auth, database, backend API access, Stripe, and image uploading.

Create a `.env` file at the repository root with values for:

```env
BETTER_AUTH_URL=http://localhost:3000
MONGODB_WE_CARE_CONNECT_URI=your-mongodb-connection-string
MONGODB_WE_CARE_DB_NAME=your-db-name
SERVER_API_URL=http://localhost:5000
NEXT_PUBLIC_SERVER_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=your-imgbb-key
STRIPE_SECRET_KEY=your-stripe-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> Do not commit production secrets to source control. Use secure environment management for deployment.

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build and Production

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Important Configuration Notes

- `src/lib/auth.js` configures Better Auth with MongoDB and a JWT session strategy.
- `src/lib/stripe.js` initializes Stripe using `STRIPE_SECRET_KEY`.
- `src/lib/core/server.js` uses `SERVER_API_URL` / `NEXT_PUBLIC_SERVER_API_URL` to call protected backend API endpoints.
- `src/lib/core/session.js` reads user session data from Better Auth and performs role-based redirects.
- Remote image loading is enabled in `next.config.mjs` for any HTTPS source.

## Suggested Routes

- `/` — Home
- `/about` — About Us
- `/contact` — Contact Us
- `/signin` — Sign In
- `/signup` — Sign Up
- `/find-doctors` — Doctor discovery
- `/success` — Success confirmation
- `/dashboard` — Role-based dashboard area

## Recommended Backend Requirements

This client expects a backend API supporting:

- Authentication token issuance via Better Auth
- Home overview data for featured doctors, stats, and testimonials
- Doctor search and doctor detail APIs
- Appointment, review, and payment endpoints
- Role validation for dashboards

## Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — start production server
- `npm run lint` — run ESLint checks

## Notes

This repository is built as a client-side application for the WeCare healthcare platform. It is intentionally structured to support a separate backend service and secure authentication flow while delivering a polished patient-doctor experience.
