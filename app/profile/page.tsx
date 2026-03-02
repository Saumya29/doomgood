import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BottomNav } from '@/components/bottom-nav'
import { SignOutButton } from '@/components/sign-out-button'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const sql = neon(process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_NON_POOLING!)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const favRows = await sql`
    SELECT COUNT(*) as count FROM public.favorites WHERE user_id = ${user.id}
  `
  const savedCount = Number(favRows[0]?.count ?? 0)

  const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <header className="px-6 pt-12 pb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Profile</h1>
      </header>

      <main className="flex-1 px-6 flex flex-col gap-6">
        {/* Avatar + user info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground text-2xl font-semibold font-serif">
            {user.email?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div>
            <p className="text-foreground font-medium text-base">{user.email}</p>
            <p className="text-muted-foreground text-xs mt-0.5">Member since {joinedDate}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex-1 bg-card border border-border rounded-2xl p-4">
            <p className="text-2xl font-bold font-serif text-foreground">{savedCount}</p>
            <p className="text-muted-foreground text-xs mt-0.5">Stories saved</p>
          </div>
          <div className="flex-1 bg-card border border-border rounded-2xl p-4">
            <p className="text-2xl font-bold font-serif text-foreground">10</p>
            <p className="text-muted-foreground text-xs mt-0.5">Moods available</p>
          </div>
        </div>

        {/* About section */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-2">About DoomGood</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Real stories from real people who felt exactly what you feel right now. 
            You scroll to doom — we help you scroll to good.
          </p>
        </div>

        {/* Sign out */}
        <SignOutButton />
      </main>

      <BottomNav />
    </div>
  )
}
