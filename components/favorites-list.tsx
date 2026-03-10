'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, BookOpen } from 'lucide-react'
import type { Story } from '@/lib/types'
import { getMoodColors } from '@/lib/mood-colors'
import { useFavorites } from '@/hooks/use-favorites'

export function FavoritesList() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    const ids = [...favorites]
    if (ids.length === 0) {
      setStories([])
      setLoading(false)
      return
    }

    fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ story_ids: ids }),
    })
      .then(r => r.json())
      .then(data => {
        setStories(data.stories ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [favorites])

  function handleUnfavorite(storyId: string) {
    toggleFavorite(storyId)
    setStories(prev => prev.filter(s => s.id !== storyId))
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-3 px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-secondary animate-pulse" />
        ))}
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <BookOpen size={28} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-foreground font-serif text-xl font-semibold">No saved stories yet</p>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
            Tap the heart on any story to save it here.
          </p>
        </div>
        <Link
          href="/"
          className="mt-2 bg-primary text-primary-foreground text-sm font-medium px-6 py-3 rounded-lg"
        >
          Find stories
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 px-6">
      {stories.map((story) => {
        const colors = getMoodColors(story.mood_id)
        return (
          <div
            key={story.id}
            className="relative rounded-2xl overflow-hidden p-5"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          >
            <div className="pr-10">
              <p
                className="font-serif text-lg font-bold leading-snug text-balance"
                style={{ color: colors.text }}
              >
                {story.title}
              </p>
              <p
                className="text-sm leading-relaxed mt-2 line-clamp-3"
                style={{ color: `${colors.text}cc` }}
              >
                {story.body}
              </p>
              <p
                className="text-xs mt-3 uppercase tracking-wide font-medium"
                style={{ color: `${colors.text}70` }}
              >
                {story.source}
              </p>
            </div>

            <button
              onClick={() => handleUnfavorite(story.id)}
              aria-label="Remove from saved"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.25)' }}
            >
              <Heart
                size={18}
                strokeWidth={2}
                className="fill-current"
                style={{ color: '#f87171' }}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}
