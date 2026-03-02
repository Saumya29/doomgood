'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Mood } from '@/lib/types'
import { getMoodColors } from '@/lib/mood-colors'

export function MoodGrid() {
  const [moods, setMoods] = useState<Mood[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/moods')
      .then(r => r.json())
      .then(data => {
        setMoods(data.moods ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-secondary animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 pb-8">
      {moods.map((mood) => {
        const colors = getMoodColors(mood.id)
        return (
          <Link
            key={mood.id}
            href={`/feed/${mood.id}`}
            className="relative h-24 rounded-2xl overflow-hidden flex flex-col justify-end p-4 transition-transform active:scale-95"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          >
            <span className="text-2xl leading-none mb-1" role="img" aria-label={mood.label}>
              {mood.emoji}
            </span>
            <span
              className="font-medium text-sm leading-none"
              style={{ color: colors.text }}
            >
              {mood.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
