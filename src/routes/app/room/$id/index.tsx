import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { DecorativeBackground } from './-components/decorative-background'
import { Header } from './-components/header'
import { GameCodeDisplay } from './-components/game-code-display'
import { PlayerList } from './-components/player-list'
import { RoleSelection } from './-components/role-selection'
import { GameSettings } from './-components/game-settings'
import { containerVariants } from './-components/animations'
import { useRoom, useRoomUser } from '../-utils'
import type { RoleKey } from './-components/role-details'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'

export const Route = createFileRoute('/app/room/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const room = useRoom()
  const user = useRoomUser()
  const isLeader = useMemo(() => room.ownerId === user.userId, [room.ownerId])
  const [selectedRole, setSelectedRole] = useState<RoleKey>(
    user.role as RoleKey,
  )
  const updateRole = useMutation(api.rooms.updateUserRole)
  const navigate = useNavigate()

  useEffect(() => {
    if (room.state === 'playing') {
      navigate({ to: '/app/room/$id/game', params: { id: room._id } })
    }
  }, [room.state])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-background text-foreground relative overflow-hidden"
    >
      <DecorativeBackground />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <Header isLeader={isLeader} />

        {/* Game Code Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <GameCodeDisplay />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Players List */}
          <PlayerList />

          {/* Role Selection */}
          <RoleSelection
            selectedRole={selectedRole}
            setSelectedRole={async (role) => {
              setSelectedRole(role)
              await updateRole({ userId: user.userId, role, roomId: room._id })
            }}
          />

          {/* Game Settings (Leader Only) */}
          <GameSettings isLeader={isLeader} />
        </motion.div>
      </div>
    </motion.div>
  )
}
