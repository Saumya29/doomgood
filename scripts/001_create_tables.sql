-- DoomGood schema

-- Moods lookup table
CREATE TABLE IF NOT EXISTS public.moods (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  emoji TEXT NOT NULL,
  color_from TEXT NOT NULL,
  color_to TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Stories table
CREATE TABLE IF NOT EXISTS public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mood_id TEXT NOT NULL REFERENCES public.moods(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Favorites table (user <-> story)
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, story_id)
);

-- RLS
ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Moods: public read
CREATE POLICY "moods_public_read" ON public.moods FOR SELECT USING (true);

-- Stories: public read
CREATE POLICY "stories_public_read" ON public.stories FOR SELECT USING (true);

-- Favorites: users manage their own
CREATE POLICY "favorites_select_own" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "favorites_insert_own" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorites_delete_own" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Seed moods
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
ON CONFLICT (id) DO NOTHING;
