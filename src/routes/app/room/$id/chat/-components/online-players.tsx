import { motion } from 'framer-motion'
import { isActiveUser, useRoom } from '../../../-utils'
import UserAvatar from '@/components/user-avatar'

const OnlinePlayers = () => {
  const room = useRoom()
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="hidden lg:flex flex-col w-72 border-l border-primary/20 bg-card/50 backdrop-blur-md"
    >
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold text-primary">Players Online</h2>
        {room.members.map((user) => (
          <div
            key={user.userId}
            className="flex items-center gap-3 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
          >
            <UserAvatar
              className="w-10 h-10"
              src={user.avatar}
              username={user.username}
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
            <div
              className="ml-auto w-2.5 h-2.5 rounded-full mt-1 mr-1.5 shadow-sm"
              style={{
                backgroundColor: isActiveUser(user.userId)
                  ? 'var(--primary)'
                  : 'var(--muted-foreground)',
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default OnlinePlayers
