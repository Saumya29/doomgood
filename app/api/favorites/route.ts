import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

// GET — fetch stories by IDs (for localStorage favorites)
export async function POST(request: NextRequest) {
  try {
    const sql = neon(process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_NON_POOLING!)
    const { story_ids } = await request.json()

    if (!Array.isArray(story_ids) || story_ids.length === 0) {
      return NextResponse.json({ stories: [] })
    }

    const stories = await sql`
      SELECT s.id, s.mood_id, s.title, s.body, s.source, s.created_at
      FROM public.stories s
      WHERE s.id = ANY(${story_ids}::uuid[])
      ORDER BY s.created_at DESC
    `

    return NextResponse.json({ stories })
  } catch (error) {
    console.error('[v0] /api/favorites error:', error)
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 })
  }
}
