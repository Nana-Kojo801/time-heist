import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { itemVariants, containerVariants } from "./animations"
import { useActiveUsers } from "../../../-utils"
import UserAvtar from "@/components/user-avatar"
import { useGame } from "./hooks"


export function TeamStatus() {
  const game = useGame()
  const activeUsers = useActiveUsers()
  const isActiveUser = (userId: string) => activeUsers.some(user => user.userId === userId)
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
        {game.players.map((player) => (
          <motion.div
            key={player.userId}
            className={`p-3 rounded-lg hover:bg-card/50 transition-colors duration-200 border border-primary/20 bg-primary/5 flex items-center gap-3`}
            variants={itemVariants}
            whileHover={{ x: 5, backgroundColor: "rgba(10, 255, 255, 0.15)" }}
          >
            <UserAvtar username={player.username} className="w-10 h-10" src={player.avatar} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">
                  {player.username}
                </p>
                <motion.div
                  className={`w-2 h-2 rounded-full ${isActiveUser(player.userId) ? 'bg-green-500' : 'bg-muted-foreground'}`}
                  animate={isActiveUser(player.userId) ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  } : {}}
                  transition={isActiveUser(player.userId) ? {
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
              </div>
            </div>
            <motion.div 
              className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.2 }}
            >
              {player.score}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
} 