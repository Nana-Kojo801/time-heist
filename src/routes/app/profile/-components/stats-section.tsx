import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import { itemVariants } from './profile-animations'
import { RolesSkeleton, RoleStats } from './role-stats'
import { GameHistory, GamesSkeleton } from './game-history'
import { useQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { useAuthUser } from '@/components/auth-provider'
import { api } from '@convex/_generated/api'

export const StatsSection = () => {
  const user = useAuthUser()
  const { data: gameHistory, isLoading } = useQuery({
    ...convexQuery(api.gamesHistory.get, { userId: user._id }),
    initialData: [],
  })

  return (
    <motion.section variants={itemVariants} className="w-full">
      <div className="flex items-center mb-4">
        <BarChart3 className="w-6 h-6 mr-2 text-primary" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Statistics
        </h2>
      </div>
      {isLoading ? (
        <div className="p-5 rounded-lg bg-card/40 backdrop-blur-sm border border-primary/20 relative">
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

          <h3 className="font-bold mb-4 text-foreground/80">
            Role Performance
          </h3>
          <RolesSkeleton />

          <h3 className="font-bold mt-8 mb-3 text-foreground/80">
            Recent Games
          </h3>
          <GamesSkeleton />
        </div>
      ) : gameHistory.length ? (
        <div className="p-5 rounded-lg bg-card/40 backdrop-blur-sm border border-primary/20 relative">
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

          <h3 className="font-bold mb-4 text-foreground/80">
            Role Performance
          </h3>
          <RoleStats gameHistory={gameHistory} />

          <h3 className="font-bold mt-8 mb-3 text-foreground/80">
            Recent Games
          </h3>
          <GameHistory gameHistory={gameHistory} />
        </div>
      ) : (
        <p>No games played yet</p>
      )}
    </motion.section>
  )
}
