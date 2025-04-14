import { motion } from "framer-motion"
import { Target } from "lucide-react"
import { formatTime } from "./utils"
import { itemVariants, pulseVariants } from "./animations"
import { useGame, useTimer } from "./hooks"

export function TimerDisplay() {
  const game = useGame()
  const timer = useTimer()
  return (
    <motion.div 
      className="flex flex-col items-center gap-4 mb-6"
      variants={itemVariants}
    >
      <motion.div 
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border-4 border-primary/30 relative group overflow-hidden transition-all duration-300 hover:border-primary/50"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Circular progress indicator */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <motion.circle 
            cx="50%" 
            cy="50%" 
            r="45%" 
            className="fill-none stroke-primary/20" 
            strokeWidth="5%" 
          />
          <motion.circle 
            cx="50%" 
            cy="50%" 
            r="45%" 
            className="fill-none stroke-primary" 
            strokeWidth="5%"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: (timer % 60000) / 60000,
              transition: { duration: 0.01, ease: "linear" }
            }}
          />
        </svg>
        
        <motion.div className="text-center z-10">
          <motion.div 
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            {formatTime(timer)}
          </motion.div>
          <div className="text-xs text-muted-foreground">
            {game.state === 'playing' ? 'RUNNING' : 'FINISHED'}
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="flex items-center justify-center gap-2 text-center"
        variants={itemVariants}
      >
        <motion.div
          variants={pulseVariants}
          animate="pulse"
        >
          <Target className="h-5 w-5 text-primary" />
        </motion.div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold">Next Window</h2>
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            animate={{
              scale: [1, 1.05, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            00:12.45
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
} 