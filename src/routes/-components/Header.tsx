import { Button } from '@/components/ui/button'
import Logo from '@/logo.svg'
import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="w-full px-3 py-4 flex items-center justify-between bg-background sticky top-0 z-50 border-b border-b-primary/10 shadow-sm">
      {/* Left: Logo + Site Name */}
      <Link to="/" className="flex items-center">
        <img src={Logo} alt="Time Heist Logo" className="size-11" />
        <h1 className="text-2xl font-bold text-primary tracking-wide">
          Time Heist
        </h1>
      </Link>

      {/* Right: Buttons (hidden on small screens) */}
      <div className="hidden sm:flex gap-4">
        <Button variant="tertiary">Get Started</Button>
        <Link to="/tutorial">
          <Button variant="outline">Tutorial</Button>
        </Link>
      </div>
    </header>
  )
}
