import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { KeyRound, Users } from 'lucide-react'
import { itemVariants } from './animations'
import type { DataModel } from '@convex/_generated/dataModel'
import { useMutation } from '@tanstack/react-query'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useAuthUser } from '@/components/auth-provider'

interface RoomCardProps {
  room: DataModel['rooms']['document']
  index: number
}

export function RoomCard({ room, index }: RoomCardProps) {
  const user = useAuthUser()
  const navigate = useNavigate()
  const {
    mutateAsync: joinRoom,
    isError,
    error,
  } = useMutation({
    mutationFn: useConvexMutation(api.rooms.joinRoom),
  })

  useEffect(() => {
    if (isError) toast.error(error.message)
  }, [isError])

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      custom={index}
      className="relative overflow-hidden"
    >
      <button
        onClick={async () => {
          await joinRoom({
            userId: user._id,
            username: user.username,
            avatar: user.avatar,
            roomId: room._id,
          })
          navigate({ to: '/app/room/$id', params: { id: room._id } })
        }}
        className="w-full p-4 sm:p-5 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors duration-300 cursor-pointer block bg-card/30 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10 border border-primary/20">
              {room.private ? (
                <KeyRound className="w-5 h-5 text-secondary" />
              ) : (
                <Users className="w-5 h-5 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-lg">{room.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {room.private && (
                  <span className="bg-secondary/10 text-secondary text-xs px-2 py-0.5 rounded-full border border-secondary/20">
                    Private
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{room.members.length}/4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  )
}
