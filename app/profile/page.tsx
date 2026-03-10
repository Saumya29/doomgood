import { BottomNav } from '@/components/bottom-nav'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <header className="px-6 pt-12 pb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">About</h1>
      </header>

      <main className="flex-1 px-6 flex flex-col gap-6">
        {/* About section */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-2">About DoomGood</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Real stories from real people who felt exactly what you feel right now.
            You scroll to doom — we help you scroll to good.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-2">How it works</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Pick a mood that matches how you feel. Scroll through stories from people
            who have been there. Save the ones that resonate with you.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-2">Your favorites</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Saved stories are stored on your device. They stay with you as long as
            you keep your browser data.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
