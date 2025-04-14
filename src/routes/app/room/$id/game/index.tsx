import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { DecorativeBackground } from './-components/decorative-background'
import { Header } from './-components/header'
import { GameBoard } from './-components/game-board'
import { Sidebar } from './-components/sidebar'
import { containerVariants, itemVariants } from './-components/animations'
import { useGame } from './-components/hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/app/room/$id/game/')({
  component: GamePage,
})

function GamePage() {
  const game = useGame()

  useEffect(() => {
    if(game.state === 'starting') {
      toast.message('Game starting in 5 seconds', { duration: 2000 })
    }
  }, [game.state])

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative">
      <DecorativeBackground />

      <Header />

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
          <GameBoard />
          <Sidebar />
        </motion.div>
        {/* Bottom spacer for mobile view */}
        <div className="h-24 w-full" aria-hidden="true"></div>
      </motion.div>
    </div>
  )
}
