import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { MoodGrid } from '@/components/mood-grid'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-12 pb-2">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground tracking-tight">DoomGood</h1>
          <p className="text-muted-foreground text-xs mt-0.5">You are not alone.</p>
        </div>
        {user ? (
          <Link
            href="/profile"
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground text-sm font-medium"
            aria-label="Profile"
          >
            {user.email?.[0]?.toUpperCase() ?? 'U'}
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
        )}
      </header>

      {/* Hero copy */}
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
    </div>
  )
}
