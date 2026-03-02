import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Check your email</h1>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
        We sent a confirmation link to your inbox. Click it to activate your account, then come back to sign in.
      </p>
      <Link
        href="/auth/login"
        className="mt-8 inline-block bg-primary text-primary-foreground text-sm font-medium px-6 py-3 rounded-lg"
      >
        Back to sign in
      </Link>
    </div>
  )
}
