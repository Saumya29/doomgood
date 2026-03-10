'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'doomgood-favorites'

function getFavorites(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveFavorites(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const isFavorited = useCallback(
    (storyId: string) => favorites.has(storyId),
    [favorites],
  )

  const toggleFavorite = useCallback((storyId: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(storyId)) {
        next.delete(storyId)
      } else {
        next.add(storyId)
      }
      saveFavorites(next)
      return next
    })
  }, [])

  return { favorites, isFavorited, toggleFavorite }
}
