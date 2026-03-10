'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Story } from '@/lib/types'
import { StoryCard } from '@/components/story-card'
import { getMoodColors } from '@/lib/mood-colors'
import { useFavorites } from '@/hooks/use-favorites'

interface StoryFeedProps {
  moodId: string
  moodLabel: string
}

export function StoryFeed({ moodId, moodLabel }: StoryFeedProps) {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const colors = getMoodColors(moodId)
  const { isFavorited, toggleFavorite } = useFavorites()

  useEffect(() => {
    fetch(`/api/stories?mood_id=${moodId}`)
      .then(r => r.json())
      .then(data => {
        setStories(data.stories ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [moodId])

  if (loading) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: `linear-gradient(160deg, ${colors.from}, ${colors.to})` }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white/80 animate-spin" />
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div
        className="h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ background: `linear-gradient(160deg, ${colors.from}, ${colors.to})` }}
      >
        <p className="text-white/80 text-lg font-serif">No stories yet for this mood.</p>
        <button
          onClick={() => router.push('/')}
          className="text-sm text-white/60 underline underline-offset-2"
        >
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className="relative h-screen">
      {/* Back button overlay */}
      <button
        onClick={() => router.push('/')}
        aria-label="Go back to mood selector"
        className="absolute top-12 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.35)' }}
      >
        <ArrowLeft size={18} color="white" />
      </button>

      {/* Mood label overlay */}
      <div
        className="absolute top-12 left-0 right-0 flex justify-center z-10 pointer-events-none"
      >
        <span
          className="text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: 'rgba(0,0,0,0.3)', color: colors.text }}
        >
          {moodLabel}
        </span>
      </div>

      {/* Snap scroll container */}
      <div className="snap-scroll-container h-screen">
        {stories.map((story) => (
          <div key={story.id} className="snap-item h-screen w-full">
            <StoryCard
              story={story}
              moodId={moodId}
              isFavorited={isFavorited(story.id)}
              onFavoriteToggle={() => toggleFavorite(story.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
