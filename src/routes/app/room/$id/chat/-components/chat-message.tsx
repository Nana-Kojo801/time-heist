import UserAvatar from '@/components/user-avatar'
import type { DataModel } from '@convex/_generated/dataModel'
import { motion } from 'framer-motion'

type ChatMessageProps = {
  msg: DataModel['roomChats']['document'] & {
    username: string
    avatar: string
    role: string
  }
  isCurrentUser: boolean
}

// Single message component with Discord-like styling
const ChatMessage = ({ msg, isCurrentUser }: ChatMessageProps) => {
  const formattedTime = new Date(msg._creationTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const formattedDate = new Date(msg._creationTime).toLocaleDateString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
    },
  )

  return (
    <motion.div
      key={msg._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="flex w-full py-1 px-4 group hover:bg-primary/5"
    >
      {/* Avatar - always visible */}
      <div className="flex-shrink-0 mr-3 mt-0.5">
        <UserAvatar
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
          src={msg.avatar}
          username={msg.username}
        />
      </div>

      {/* Message content */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {/* Username and timestamp header */}
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="font-semibold text-sm text-foreground">
            {isCurrentUser ? 'You' : msg.username}
          </span>
          <span className="text-xs text-muted-foreground">
            {formattedDate} at {formattedTime}
          </span>
          {msg.role !== 'user' && (
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
              {msg.role}
            </span>
          )}
        </div>

        {/* Message bubble - same style for all messages */}
        <div className="bg-primary/10 rounded-lg px-3 py-2 text-sm sm:text-base">
          <div className="break-words whitespace-pre-wrap text-foreground">
            {msg.message}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage
