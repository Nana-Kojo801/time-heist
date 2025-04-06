import { motion } from "framer-motion"
import { UserCircle, Target, Zap } from "lucide-react"
import type { PlayerResult } from "./types"
import { itemVariants } from "./animations"

interface PlayerCardProps {
  player: PlayerResult
  index: number
}

export function PlayerCard({ player, index }: PlayerCardProps) {
  const getRankColor = (rank: string) => {
    switch(rank) {
      case 'S': return 'text-amber-300';
      case 'A': return 'text-primary';
      case 'B': return 'text-blue-400';
      case 'C': return 'text-green-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <motion.div 
      className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20 shadow-md"
      variants={itemVariants}
      custom={index * 0.1}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <UserCircle className="w-8 h-8 text-primary" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <span className="font-medium">{player.name}</span>
              <span className="text-sm text-muted-foreground">{player.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rank</span>
              <motion.span 
                className={`text-xl font-bold ${getRankColor(String(player.rank))}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
              >
                {player.rank}
              </motion.span>
            </div>
          </div>

          <div className="bg-background/50 rounded-md p-2 mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Score</span>
            <motion.div
              className="flex items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Zap className="w-4 h-4 text-amber-400 mr-1" />
              <span className="text-lg font-bold text-amber-400">{player.points}</span>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm">{player.accuracy}% accuracy</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {player.hits}/{player.totalWindows} windows
            </div>
            <div className="text-sm text-muted-foreground">
              Top {player.percentile}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 