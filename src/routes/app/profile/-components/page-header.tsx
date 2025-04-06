import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import BackLink from '@/components/back-link'

export const PageHeader = () => {
  return (
    <div className="py-4 border-b border-border/20 relative z-10">
      <Button
        asChild
        variant="ghost"
        className="text-foreground hover:text-primary hover:bg-background/50 transition-all duration-300 group"
      >
        <Link to="/app">
          <BackLink label="PROFILE" className="text-2xl" />
        </Link>
      </Button>
    </div>
  )
} 