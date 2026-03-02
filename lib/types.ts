export type Mood = {
  id: string
  label: string
  emoji: string
  color_from: string
  color_to: string
  sort_order: number
}

export type Story = {
  id: string
  mood_id: string
  title: string
  body: string
  source: string
  created_at: string
}

export type Favorite = {
  id: string
  user_id: string
  story_id: string
  created_at: string
}

export type StoryWithFavorite = Story & {
  is_favorited?: boolean
}
