import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL_NON_POOLING);

async function main() {
  console.log("[v0] Running DoomGood migration...");

  // Moods table
  await sql`
    CREATE TABLE IF NOT EXISTS public.moods (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      emoji TEXT NOT NULL,
      color_from TEXT NOT NULL,
      color_to TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;
  console.log("[v0] moods table ready");

  // Stories table
  await sql`
    CREATE TABLE IF NOT EXISTS public.stories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      mood_id TEXT NOT NULL REFERENCES public.moods(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      source TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("[v0] stories table ready");

  // Favorites table
  await sql`
    CREATE TABLE IF NOT EXISTS public.favorites (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL,
      story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE(user_id, story_id)
    )
  `;
  console.log("[v0] favorites table ready");

  // Seed moods
  await sql`
    INSERT INTO public.moods (id, label, emoji, color_from, color_to, sort_order) VALUES
      ('anxious',     'Anxious',      '😰', '#b45309', '#92400e', 1),
      ('sad',         'Sad',          '😔', '#1d4ed8', '#1e3a8a', 2),
      ('lonely',      'Lonely',       '🫂', '#7c3aed', '#4c1d95', 3),
      ('overwhelmed', 'Overwhelmed',  '🌊', '#0f766e', '#134e4a', 4),
      ('angry',       'Angry',        '🔥', '#b91c1c', '#7f1d1d', 5),
      ('hopeless',    'Hopeless',     '🌑', '#374151', '#111827', 6),
      ('stressed',    'Stressed',     '⚡', '#b45309', '#713f12', 7),
      ('numb',        'Numb',         '🫙', '#475569', '#1e293b', 8),
      ('restless',    'Restless',     '🌀', '#0e7490', '#164e63', 9),
      ('lost',        'Lost',         '🧭', '#4d7c0f', '#1a2e05', 10)
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("[v0] moods seeded");

  console.log("[v0] Migration complete!");
}

main().catch((err) => {
  console.error("[v0] Migration failed:", err);
  process.exit(1);
});
