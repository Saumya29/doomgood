import { neon } from '@neondatabase/serverless'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const sql = neon(process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_NON_POOLING!)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const moodId = searchParams.get('mood_id')

  if (!moodId) {
    return NextResponse.json({ error: 'mood_id is required' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const stories = await sql`
      SELECT id, mood_id, title, body, source, created_at
      FROM public.stories
      WHERE mood_id = ${moodId}
      ORDER BY created_at ASC
    `

    if (!user) {
      return NextResponse.json({ stories: stories.map(s => ({ ...s, is_favorited: false })) })
    }

    const favoriteRows = await sql`
      SELECT story_id FROM public.favorites
      WHERE user_id = ${user.id}
      AND story_id = ANY(${stories.map(s => s.id)}::uuid[])
    `
    const favSet = new Set(favoriteRows.map((f: { story_id: string }) => f.story_id))

    const storiesWithFav = stories.map(s => ({
      ...s,
      is_favorited: favSet.has(s.id),
    }))

    return NextResponse.json({ stories: storiesWithFav })
  } catch (error) {
    console.error('[v0] /api/stories error:', error)
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}
