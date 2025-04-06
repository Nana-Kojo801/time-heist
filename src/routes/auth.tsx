import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/logo.svg'

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/80 text-foreground p-6 relative">
      {/* Back button - positioned absolutely */}
      <Link
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors flex items-center text-lg"
        to="/"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back
      </Link>

      <div className="flex flex-col items-center mb-10">
        <img
          src={Logo}
          alt="Time Heist Logo"
          className="h-16 w-16 mb-4 drop-shadow-md animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Time Heist
        </h1>
        <p className="text-muted-foreground mt-2 text-center max-w-xs">
          Your journey through time begins here
        </p>
      </div>

      {/* Auth Content */}
      <Outlet />

    </div>
  )
}
