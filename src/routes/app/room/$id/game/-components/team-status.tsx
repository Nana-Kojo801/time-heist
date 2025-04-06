import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { itemVariants, containerVariants } from "./animations"
import type { GamePlayer } from "./types"

interface TeamStatusProps {
  players: GamePlayer[]
}

export function TeamStatus({ players }: TeamStatusProps) {
  return (
    <motion.div 
      className="bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 p-4 sm:p-5 flex-1 overflow-y-auto"
      variants={itemVariants}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-bold">Team Status</h2>
        </div>
        <Badge variant="outline" className="text-primary border-primary/20">
          Room: game-123
        </Badge>
      </div>
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {players.map((player) => (
          <motion.div
            key={player.id}
            className={`p-3 rounded-lg hover:bg-card/50 transition-colors duration-200 border ${
              player.name === 'Player1'
                ? 'border-primary/20 bg-primary/5'
                : 'border-primary/10 bg-card/30'
            } flex items-center gap-3`}
            variants={itemVariants}
            whileHover={{ x: 5, backgroundColor: "rgba(10, 255, 255, 0.15)" }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30"
              whileHover={{ rotate: 15 }}
            >
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {player.name[0]}
              </span>
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">
                  {player.name}
                </p>
                <motion.div
                  className={`w-2 h-2 rounded-full ${player.isOnline ? 'bg-green-500' : 'bg-muted-foreground'}`}
                  animate={player.isOnline ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  } : {}}
                  transition={player.isOnline ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : {}}
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-1.5 py-0 h-4 bg-secondary/10 text-secondary border-secondary/20">
                  {player.role}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {player.status}
                </span>
              </div>
            </div>
            <motion.div 
              className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.2 }}
            >
              {player.points}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
} 