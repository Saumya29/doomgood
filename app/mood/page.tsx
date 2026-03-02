// /mood is the authenticated mood selector — same UI as home but with bottom nav
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MoodGrid } from '@/components/mood-grid'
import { BottomNav } from '@/components/bottom-nav'
import Link from 'next/link'

export default async function MoodPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <header className="flex items-center justify-between px-6 pt-12 pb-2">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground tracking-tight">DoomGood</h1>
          <p className="text-muted-foreground text-xs mt-0.5">You are not alone.</p>
        </div>
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground text-sm font-medium"
          aria-label="Profile"
        >
          {user.email?.[0]?.toUpperCase() ?? 'U'}
        </Link>
      </header>

      <main className="flex-1 px-6 pt-8">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold text-foreground leading-tight text-balance">
            How are you feeling right now?
          </h2>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
            Pick your mood. Read real stories from people who felt exactly the same.
          </p>
        </div>
        <MoodGrid />
      </main>

      <BottomNav />
    </div>
  )
}
