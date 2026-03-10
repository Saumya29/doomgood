import { neon } from '@neondatabase/serverless'
import { notFound } from 'next/navigation'
import { StoryFeed } from '@/components/story-feed'
import { BottomNav } from '@/components/bottom-nav'
import type { Mood } from '@/lib/types'

export const dynamic = 'force-dynamic'

interface FeedPageProps {
  params: Promise<{ moodId: string }>
}

export default async function FeedPage({ params }: FeedPageProps) {
  const sql = neon(process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_NON_POOLING!)
  const { moodId } = await params

  const moods = await sql`
    SELECT id, label, emoji, color_from, color_to, sort_order
    FROM public.moods WHERE id = ${moodId}
  `
  const mood = moods[0] as Mood | undefined

  if (!mood) notFound()

  return (
    <div className="relative h-screen overflow-hidden bg-background">
      <StoryFeed
        moodId={mood.id}
        moodLabel={mood.label}
      />
      <BottomNav />
    </div>
  )
}
