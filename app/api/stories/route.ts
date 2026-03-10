import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const sql = neon(process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_NON_POOLING!)
  const { searchParams } = new URL(request.url)
  const moodId = searchParams.get('mood_id')

  if (!moodId) {
    return NextResponse.json({ error: 'mood_id is required' }, { status: 400 })
  }

  try {
    const stories = await sql`
      SELECT id, mood_id, title, body, source, created_at
      FROM public.stories
      WHERE mood_id = ${moodId}
      ORDER BY created_at ASC
    `

    return NextResponse.json({ stories })
  } catch (error) {
    console.error('[v0] /api/stories error:', error)
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}
