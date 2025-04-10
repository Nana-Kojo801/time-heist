import { motion } from 'framer-motion'
import type { Role } from './types'

type RoleStatsProps = {
  gameHistory: DataModel['games']['document'][]
}

import { Skeleton } from '@/components/ui/skeleton'
import type { DataModel } from '@convex/_generated/dataModel'
import { useMemo } from 'react'

export function RolesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col">
          {/* Header row */}
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-2 rounded-full bg-primary/30" />
              <Skeleton className="h-4 w-24 bg-foreground/10" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full bg-foreground/10" />
          </div>

          {/* Progress bar row */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 rounded-full bg-foreground/10 overflow-hidden">
              <Skeleton
                className="h-full bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full"
                style={{ width: `${30 + index * 20}%` }} // Varying widths for visual interest
              />
            </div>
            <Skeleton className="h-4 w-8 bg-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const RoleStats = ({ gameHistory }: RoleStatsProps) => {
  const formatGames = () => {
    if(!gameHistory.length) return []
    const roles = ['Leader', 'Safecracker', 'Technician', 'Lookout']
    return roles.map((role) => {
      const games = gameHistory.filter((g) => g.role === role)
      const totalAccuracy = games.reduce(
        (prev, curr) => curr.accuracy + prev,
        0,
      )
      const averageAccuracy = +(totalAccuracy / games.length).toFixed(2)

      return {
        name: role,
        games: games.length,
        accuracy: averageAccuracy,
      }
    })
  }
  const stats = useMemo(() => formatGames(), [gameHistory])
  return (
    <div className="space-y-5">
      {stats.map((role, index) => (
        <motion.div
          key={role.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex flex-col"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              {role.name}
            </span>
            <span className="text-sm text-foreground/70 px-2 py-0.5 rounded-full bg-card/50 border border-primary/10">
              {role.games} games
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-card/50 border border-primary/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${role.accuracy}%` }}
                transition={{
                  duration: 1,
                  delay: 0.5 + index * 0.2,
                }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
            <span className="text-sm font-medium w-12 text-right">
              {role.accuracy}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
