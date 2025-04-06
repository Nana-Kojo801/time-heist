import { motion } from 'framer-motion'
import { Trophy, Star } from 'lucide-react'
import type { RecentGame } from './types'

type GameHistoryProps = {
  games: RecentGame[];
}

export const GameHistory = ({ games }: GameHistoryProps) => {
  return (
    <div className="mt-6 space-y-3">
      {games.map((game, index) => (
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
              <div className="text-sm font-medium">
                {game.role}
              </div>
              <div className="text-xs text-foreground/60">
                {game.date}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
              {game.points} pts
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              game.result === 'Win'
                ? 'bg-secondary/10 text-secondary'
                : 'bg-foreground/10 text-foreground/60'
            }`}>
              {game.result === 'Win' && <Trophy className="w-3 h-3 inline-block mr-1" />}
              {game.result}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 