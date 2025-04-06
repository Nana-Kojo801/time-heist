import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const BackLink = ({
  label = '',
  className = '',
}: {
  label?: string
  className?: string
}) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-primary/10 hover:bg-primary/20"
      >
        <ChevronLeft className="text-primary" />
      </Button>
      {label && (
        <h1
          className={cn(
            'text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
            className,
          )}
        >
          {label}
        </h1>
      )}
    </div>
  )
}

export default BackLink
