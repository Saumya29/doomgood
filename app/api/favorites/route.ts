import { neon } from '@neondatabase/serverless'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// POST — toggle favorite
export async function POST(request: NextRequest) {
  try {
    const sql = neon(process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_NON_POOLING!)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { story_id } = await request.json()
    if (!story_id) {
      return NextResponse.json({ error: 'story_id required' }, { status: 400 })
    }

    // Check if already favorited
    const existing = await sql`
      SELECT id FROM public.favorites
      WHERE user_id = ${user.id} AND story_id = ${story_id}
    `

    if (existing.length > 0) {
      // Remove favorite
      await sql`
        DELETE FROM public.favorites
        WHERE user_id = ${user.id} AND story_id = ${story_id}
      `
      return NextResponse.json({ favorited: false })
    } else {
      // Add favorite
      await sql`
        INSERT INTO public.favorites (user_id, story_id)
        VALUES (${user.id}, ${story_id})
        ON CONFLICT DO NOTHING
      `
      return NextResponse.json({ favorited: true })
    }
  } catch (error) {
    console.error('[v0] /api/favorites error:', error)
    return NextResponse.json({ error: 'Failed to toggle favorite' }, { status: 500 })
  }
}

// GET — fetch user's favorited stories
export async function GET() {
  try {
    const sql = neon(process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_NON_POOLING!)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stories = await sql`
      SELECT s.id, s.mood_id, s.title, s.body, s.source, s.created_at
      FROM public.stories s
      INNER JOIN public.favorites f ON f.story_id = s.id
      WHERE f.user_id = ${user.id}
      ORDER BY f.created_at DESC
    `

    return NextResponse.json({ stories: stories.map(s => ({ ...s, is_favorited: true })) })
  } catch (error) {
    console.error('[v0] /api/favorites GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 })
  }
}
