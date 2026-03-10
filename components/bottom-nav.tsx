'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, Info } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/favorites', label: 'Saved', icon: Heart },
  { href: '/profile', label: 'About', icon: Info },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-card border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', paddingTop: '12px', paddingLeft: '8px', paddingRight: '8px', minHeight: '60px' }}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 px-4 py-1"
            aria-current={active ? 'page' : undefined}
          >
            <Icon
              size={22}
              strokeWidth={active ? 2.5 : 1.8}
              className={active ? 'text-foreground' : 'text-muted-foreground'}
            />
            <span className={`text-[10px] ${active ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
