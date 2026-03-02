'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import type { StoryWithFavorite } from '@/lib/types'
import { getMoodColors } from '@/lib/mood-colors'

interface StoryCardProps {
  story: StoryWithFavorite
  moodId: string
  isAuthenticated: boolean
  onFavoriteToggle: (storyId: string, newState: boolean) => void
}

export function StoryCard({ story, moodId, isAuthenticated, onFavoriteToggle }: StoryCardProps) {
  const [favorited, setFavorited] = useState(story.is_favorited ?? false)
  const [toggling, setToggling] = useState(false)
  const colors = getMoodColors(moodId)

  async function handleFavorite() {
    if (!isAuthenticated) return
    setToggling(true)
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story_id: story.id }),
      })
      const data = await res.json()
      setFavorited(data.favorited)
      onFavoriteToggle(story.id, data.favorited)
    } catch {
      // silent fail
    } finally {
      setToggling(false)
    }
  }

  return (
    <div
      className="snap-item relative flex flex-col justify-end h-full w-full"
      style={{ background: `linear-gradient(160deg, ${colors.from} 0%, ${colors.to} 100%)` }}
    >
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 50%)' }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 pb-28 pt-16 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <h2
          className="font-serif text-3xl font-bold leading-tight text-balance"
          style={{ color: colors.text }}
        >
          {story.title}
        </h2>
        <p
          className="text-base leading-relaxed"
          style={{ color: `${colors.text}cc` }}
        >
          {story.body}
        </p>
        <p
          className="text-xs font-medium tracking-wide uppercase"
          style={{ color: `${colors.text}80` }}
        >
          {story.source}
        </p>
      </div>

      {/* Favorite button */}
      {isAuthenticated && (
        <button
          onClick={handleFavorite}
          disabled={toggling}
          aria-label={favorited ? 'Remove from saved' : 'Save story'}
          className="absolute bottom-24 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-90"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          <Heart
            size={22}
            strokeWidth={2}
            className={favorited ? 'fill-current' : ''}
            style={{ color: favorited ? '#f87171' : colors.text }}
          />
        </button>
      )}

      {/* Scroll hint on first card */}
      <div
        className="absolute bottom-16 left-0 right-0 flex justify-center z-10 pointer-events-none"
        style={{ color: `${colors.text}60` }}
      >
        <span className="text-xs">Scroll for more</span>
      </div>
    </div>
  )
}
