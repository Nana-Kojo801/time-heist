import { Users } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { containerVariants, itemVariants } from "./animations"
import type { Player } from "./types"

interface PlayerListProps {
  players: Player[]
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <motion.div 
      variants={itemVariants}
      className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 flex flex-col h-full relative overflow-hidden"
    >
      {/* Decorative top/bottom borders */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-primary">Players</h2>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          {players.length}/5 players
        </Badge>
      </div>
      <motion.div 
        className="space-y-3 overflow-y-auto pr-2 flex-1"
        variants={containerVariants}
      >
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(10, 255, 255, 0.1)" }}
            className="p-4 rounded-lg bg-card/20 border border-primary/10 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {player.name[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{player.name}</p>
                {player.role && (
                  <div className="flex items-center gap-1 mt-1">
                    <Badge className="bg-secondary/10 text-secondary text-xs border-secondary/20 px-2 py-0">
                      {player.role}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {player.isReady ? (
                <span className="text-sm bg-green-500/20 text-green-500 px-3 py-1 rounded-full">
                  Ready
                </span>
              ) : (
                <span className="text-sm bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full">
                  Not Ready
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
} 