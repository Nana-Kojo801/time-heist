import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DecorativeBackground } from './-components/decorative-background'
import { Header } from './-components/header'
import { GameBoard } from './-components/game-board'
import { Sidebar } from './-components/sidebar'
import { mockPlayers, mockTimeWindows } from './-components/mock-data'
import { containerVariants, itemVariants } from './-components/animations'
import type { PlayerRole } from './-components/types'

export const Route = createFileRoute('/app/room/$id/game/')({
  component: GamePage,
})

function GamePage() {
  // Game state
  const [time, setTime] = useState(0)
  const [gameStatus] = useState<'ready' | 'running' | 'paused'>('ready')
  const [currentPlayerRole] = useState<PlayerRole>('Leader')

  // Simple timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    
    if (gameStatus === 'running') {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStatus])

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative">
      <DecorativeBackground />

      <Header time={time} currentPlayerRole={currentPlayerRole} />

      <motion.div 
        className="container mx-auto px-4 py-6 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-8rem)]"
          variants={itemVariants}
        >
          <GameBoard 
            time={time}
            gameStatus={gameStatus}
            currentPlayerRole={currentPlayerRole}
            timeWindows={mockTimeWindows}
          />
          <Sidebar 
            players={mockPlayers}
            currentPlayerRole={currentPlayerRole}
          />
        </motion.div>
        {/* Bottom spacer for mobile view */}
        <div className="h-24 w-full" aria-hidden="true"></div>
      </motion.div>
    </div>
  )
}
