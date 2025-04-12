import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Loader, LogOut, MessageSquare, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from './animations'
import { useRoom, useRoomUser } from '../../-utils'
import { useMutation as useReactQueryMutation } from '@tanstack/react-query'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useMutation } from 'convex/react'

interface HeaderProps {
  isLeader: boolean
}

export function Header({ isLeader }: HeaderProps) {
  const room = useRoom()
  const user = useRoomUser()
  const leaveRoom = useMutation(api.rooms.leaveRoom)
  const { mutateAsync: createGame, isPending: creatingGame } =
    useReactQueryMutation({
      mutationFn: useConvexMutation(api.games.create),
    })
  const navigate = useNavigate()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative"
    >
      <motion.div variants={itemVariants} className="mb-4 sm:mb-0">
        <motion.h1 className="text-3xl sm:text-4xl font-bold">
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Lobby
          </span>
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '8rem' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 w-32 mt-2 bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="flex flex-wrap justify-start sm:justify-end gap-3"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/app/room/$id/chat" params={{ id: room._id }}>
            <Button variant="outline" className="group">
              <MessageSquare className="w-4 h-4 mr-2 text-primary group-hover:text-primary-foreground" />
              Chat
            </Button>
          </Link>
        </motion.div>
        {isLeader && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              disabled={room.members.length < 4 || creatingGame}
              variant="tertiary"
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground group"
              onClick={async () => {
                await createGame({ roomId: room._id })
              }}
            >
              {creatingGame ? (
                <Loader className="animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2 group-hover:text-primary-foreground" />
              )}
              Start Game
            </Button>
          </motion.div>
        )}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="destructive"
            onClick={async () => {
              navigate({ to: '/app/join-room' })
              leaveRoom({ userId: user.userId, roomId: room._id })
            }}
            className="flex items-center bg-rose-500/80 hover:bg-rose-500 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" /> Leave
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
