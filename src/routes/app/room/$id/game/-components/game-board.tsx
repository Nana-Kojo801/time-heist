import { motion } from "framer-motion"
import { itemVariants, glowVariants } from "./animations"
import { TimerDisplay } from "./timer-display"
import { TimeWindows } from "./time-windows"
import { GameControls } from "./game-controls"

export function GameBoard() {
  return (
    <motion.div 
      className="lg:col-span-2 h-full"
      variants={itemVariants}
    >
      <motion.div 
        className="bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 p-4 sm:p-6 h-full flex flex-col relative overflow-hidden"
        variants={glowVariants}
        animate="glow"
      >
        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" 
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50"
          animate={{
            backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Timer Display */}
        <TimerDisplay />

        {/* Time Windows */}
        <TimeWindows />

        {/* Main Controls */}
        <GameControls />
      </motion.div>
    </motion.div>
  )
} 