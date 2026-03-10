# DoomGood

"Scroll for your soul, not your sanity."

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (New York style)
- Neon PostgreSQL (serverless)
- pnpm

## Key Commands
- `pnpm dev` — run dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint

## Architecture
- `app/` — Next.js App Router pages and API routes
- `components/` — React components (ui/ for shadcn primitives)
- `lib/mood-colors.ts` — mood-to-gradient color mapping
- `hooks/use-favorites.ts` — localStorage-based favorites
- `hooks/` — custom React hooks
- `scripts/` — SQL migrations and seed data

## Database
- Neon PostgreSQL with 2 active tables: moods, stories
- Moods and stories are public read
- Favorites stored client-side in localStorage (no auth required)

## No Auth
- No authentication — app is fully open to all visitors
- Favorites are stored in browser localStorage per device

## Conventions
- Dark mode only
- Mobile-first with safe-area-inset handling
- Snap-scroll feed (CSS scroll-snap)
- API routes in app/api/ for data access
