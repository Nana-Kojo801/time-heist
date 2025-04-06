import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Zap, Timer } from "lucide-react"
import { itemVariants } from "./animations"
import type { PlayerRole } from "./types"

interface GameControlsProps {
  gameStatus: string
  currentPlayerRole: PlayerRole
}

export function GameControls({ gameStatus, currentPlayerRole }: GameControlsProps) {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-3 mt-auto"
      variants={itemVariants}
    >
      <motion.div className="flex-1"
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground font-bold py-4 sm:py-5 text-base sm:text-lg"
        >
          <Zap className="h-5 w-5 mr-2" />
          HACK
        </Button>
      </motion.div>
      
      {currentPlayerRole === 'Leader' && (
        <motion.div className="flex-1"
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className={`w-full ${
              gameStatus === 'running' 
                ? 'bg-rose-500/80 hover:bg-rose-500 text-white' 
                : 'bg-primary/10 hover:bg-primary/20 text-primary'
            } font-bold py-4 sm:py-5 text-base sm:text-lg transition-all duration-300`}
          >
            <Timer className="h-5 w-5 mr-2" />
            {gameStatus === 'running' ? 'STOP' : 'START'}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
} 