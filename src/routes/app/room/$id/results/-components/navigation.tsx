import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Home, RotateCw, Users, Share2 } from 'lucide-react'
import { itemVariants } from './animations'

interface NavigationProps {
  gameId: string
}

export function Navigation({ gameId }: NavigationProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Time Heist Results',
          text: 'Check out my Time Heist results!',
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying to clipboard:', error))
    }
  }

  return (
    <motion.div
      className="bg-card/80 backdrop-blur-sm rounded-lg p-5 border border-primary/20 shadow-md grid grid-cols-1 sm:grid-cols-2 gap-3"
      variants={itemVariants}
      custom={0.3}
    >
      <Link to="/app" className="sm:order-1">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 bg-background/50 hover:bg-background/80"
        >
          <Home className="h-4 w-4" />
          Return to Lobby
        </Button>
      </Link>

      <Link
        to={`/app/room/$id`}
        params={{ id: gameId }}
        className="sm:order-3"
      >
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 bg-background/50 hover:bg-background/80"
        >
          <Users className="h-4 w-4" />
          Back to Room
        </Button>
      </Link>

      <Button
        variant="default"
        className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 sm:order-2"
        onClick={() => (window.location.pathname = `/app/room/${gameId}/game`)}
      >
        <RotateCw className="h-4 w-4" />
        Play Again
      </Button>

      <Button
        variant="secondary"
        className="w-full flex items-center gap-2 sm:order-4"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        Share Results
      </Button>
    </motion.div>
  )
}
