# Super Fitness

Super Fitness is a React + TypeScript fitness web app built with Vite.

## Features

- Authentication flow with guarded guest/protected routes
- Exercise browsing by muscle group via dynamic routes
- Class, nutrition, profile, and healthy meal detail screens
- API data fetching and caching through React Query
- Reusable forms with schema validation using React Hook Form + Zod
- Global app state with Zustand and context providers
- Multi-language support with locale-aware API headers
- Theme support and global toast notifications

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Zustand
- i18next / react-i18next
- React Hook Form + Zod

## Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- pnpm (recommended, `pnpm-lock.yaml` is included)

## Getting Started

```bash
pnpm install
pnpm dev
```

The app runs in development mode with hot reload at the local Vite URL (typically `http://localhost:5173`).

## Scripts

- `pnpm dev` - Start the Vite development server
- `pnpm build` - Type-check and build for production
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint

## Main Routes

- `/` - Home page
- `/about` - About page
- `/login`, `/register`, `/forget-password`, `/kyc` - Auth flow
- `/classes` - Classes page (protected)
- `/exercises/:id` - Exercises by selected category/muscle (protected)
- `/healthy` - Healthy meals page (protected)
- `/healthyDetails/:id` - Meal details page (protected)
- `/profile` - User profile page (protected)

## Architecture Notes

- Routing is managed with `react-router-dom` and lazy-loaded pages
- Access control uses `GuestRoute` and `ProtectedRoute`
- Shared app providers are composed in `src/components/providers/app/index.tsx`
- Global providers include auth, i18n, theme, React Query, meals context, and Sonner toast

## API & Authentication

- API base URL is configured in `src/lib/constants/api/api.constant.ts`
- Axios instance adds:
  - `Authorization: Bearer <token>` from local storage (`ELEVATE_FITNESS_USER`)
  - `accept-language` from stored locale (fallback `en`)
- API requests support dynamic route params and query params through a shared request utility

## Project Structure

- `src/components` - Shared UI, layouts, providers, and common components
- `src/pages` - Route-level feature modules (`auth` and `app`)
- `src/lib` - Constants, API config, router, utilities, and schema/type helpers
- `src/hooks` - Reusable custom hooks
- `src/i18n` - Localization assets and formatting utilities
- `public` - Static public assets

## Build Output

Production build files are generated in `dist/`.

## Development Guidelines

- Keep environment-specific values outside source code where possible.
- Run `pnpm lint` before opening a PR.
- Keep features grouped under route-based folders for maintainability.
- Prefer the shared API utility and constants instead of ad-hoc fetch calls.

## Troubleshooting

- If dependencies fail to install, verify Node.js version and retry `pnpm install`.
- If the dev server port is busy, run `pnpm dev -- --port <new-port>`.
- If protected routes always redirect to login, verify token presence in local storage.
