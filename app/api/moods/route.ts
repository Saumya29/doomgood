import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const sql = neon(process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_NON_POOLING!)
    const moods = await sql`
      SELECT id, label, emoji, color_from, color_to, sort_order
      FROM public.moods
      ORDER BY sort_order ASC
    `
    return NextResponse.json({ moods })
  } catch (error) {
    console.error('[v0] /api/moods error:', error)
    return NextResponse.json({ error: 'Failed to fetch moods' }, { status: 500 })
  }
}
