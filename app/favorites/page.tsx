import { BottomNav } from '@/components/bottom-nav'
import { FavoritesList } from '@/components/favorites-list'

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <header className="px-6 pt-12 pb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Saved Stories</h1>
        <p className="text-muted-foreground text-sm mt-1">Stories you keep coming back to.</p>
      </header>

      <main className="flex-1">
        <FavoritesList />
      </main>

      <BottomNav />
    </div>
  )
}
