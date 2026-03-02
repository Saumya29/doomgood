# DoomGood

"Scroll for your soul, not your sanity."

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (New York style)
- Supabase Auth (email/password)
- Neon PostgreSQL (serverless)
- pnpm

## Key Commands
- `pnpm dev` — run dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint

## Architecture
- `app/` — Next.js App Router pages and API routes
- `components/` — React components (ui/ for shadcn primitives)
- `lib/supabase/` — Supabase client (server.ts, client.ts, middleware.ts)
- `lib/mood-colors.ts` — mood-to-gradient color mapping
- `hooks/` — custom React hooks
- `scripts/` — SQL migrations and seed data
- `middleware.ts` — Supabase session refresh + route protection

## Database
- Neon PostgreSQL with 3 tables: moods, stories, favorites
- RLS enabled on all tables
- Moods and stories are public read; favorites scoped to user

## Auth Flow
- Supabase email/password auth
- middleware.ts refreshes session on every request
- Protected routes: /feed, /favorites, /profile
- Anonymous users can browse moods/stories but cannot favorite

## Conventions
- Dark mode only
- Mobile-first with safe-area-inset handling
- Snap-scroll feed (CSS scroll-snap)
- API routes in app/api/ for data access
