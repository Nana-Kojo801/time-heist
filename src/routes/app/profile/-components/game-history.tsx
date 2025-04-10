import { motion } from 'framer-motion'
import { Trophy, Star } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import type { DataModel } from '@convex/_generated/dataModel'

type GameHistoryProps = {
  gameHistory: DataModel["games"]["document"][];
}

export function GamesSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="mt-6 space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-primary/10"
        >
          <div className="flex items-center w-full">
            {/* Star icon placeholder */}
            <Skeleton className="w-5 h-5 mr-3 rounded-full bg-primary/10" />

            <div className="flex-1 space-y-2">
              {/* Role placeholder */}
              <Skeleton className="h-4 w-[120px] bg-foreground/10" />
              {/* Date placeholder */}
              <Skeleton className="h-3 w-[80px] bg-foreground/10" />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            {/* Points placeholder */}
            <Skeleton className="h-6 w-12 rounded-full bg-primary/10" />
            {/* Result placeholder */}
            <Skeleton className="h-6 w-16 rounded-full bg-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const GameHistory = ({ gameHistory }: GameHistoryProps) => {

  return (
    <div className="mt-6 space-y-3">
      {gameHistory.map((game, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="flex items-center justify-between p-3 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
        >
          <div className="flex items-center">
            <div className="text-primary/80 mr-3">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium">{game.role}</div>
              <div className="text-xs text-foreground/60">{game.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
              {game.score} pts
            </div>
            <div
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                game.status === 'Win'
                  ? 'bg-secondary/10 text-secondary'
                  : 'bg-foreground/10 text-foreground/60'
              }`}
            >
              {game.status === 'Win' && (
                <Trophy className="w-3 h-3 inline-block mr-1" />
              )}
              {game.status}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
