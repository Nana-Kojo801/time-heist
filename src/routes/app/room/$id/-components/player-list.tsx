import { Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { containerVariants, itemVariants } from './animations'
import { useRoom } from '../../-utils'
import UserAvatar from '@/components/user-avatar'

export function PlayerList() {
  const room = useRoom()
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
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/20"
        >
          {room.members.length}/4 players
        </Badge>
      </div>
      <motion.div
        className="space-y-3 overflow-y-auto p-2 flex-1"
        variants={containerVariants}
      >
        {room.members.map((player, index) => (
          <motion.div
            key={player.userId}
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              backgroundColor: 'rgba(10, 255, 255, 0.1)',
            }}
            className="p-4 rounded-lg bg-card/20 border border-primary/10 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-4">
              <UserAvatar
                className="w-12 h-12"
                src={player.avatar}
                username={player.username}
              />
              <div>
                <p className="font-medium text-foreground">{player.username}</p>
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
              {player.ready ? (
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
