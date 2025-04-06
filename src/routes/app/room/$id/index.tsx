import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { DecorativeBackground } from './-components/decorative-background'
import { Header } from './-components/header'
import { GameCodeDisplay } from './-components/game-code-display'
import { PlayerList } from './-components/player-list'
import { RoleSelection } from './-components/role-selection'
import { GameSettings } from './-components/game-settings'
import { mockPlayers } from './-components/mock-data'
import { containerVariants } from './-components/animations'

export const Route = createFileRoute('/app/room/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isLeader] = useState(true) // This would come from the game state
  const [selectedRole, setSelectedRole] = useState<string>('') // This would come from the game state

  const handleLeaveRoom = () => {
    // Navigate back to the join room page
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-background text-foreground relative overflow-hidden"
    >
      <DecorativeBackground />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <Header isLeader={isLeader} handleLeaveRoom={handleLeaveRoom} />

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
          <PlayerList players={mockPlayers} />

          {/* Role Selection */}
          <RoleSelection 
            players={mockPlayers} 
            selectedRole={selectedRole} 
            setSelectedRole={(role) => setSelectedRole(role)} 
          />

          {/* Game Settings (Leader Only) */}
          {isLeader && <GameSettings />}
        </motion.div>
      </div>
    </motion.div>
  )
}
