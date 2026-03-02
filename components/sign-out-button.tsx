'use client'

import { signOut } from '@/app/auth/actions'
import { LogOut } from 'lucide-react'

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </form>
  )
}
