import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

export const AppLogo = () => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-12 bg-primary/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="flex items-center justify-center mb-4 relative"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <div className="relative">
            <motion.div 
              className="absolute inset-0 bg-primary/30 rounded-full blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
            <Clock
              className="w-24 h-24 text-primary drop-shadow-[0_0_15px_rgba(10,255,255,0.8)] relative z-10"
              strokeWidth={1.2}
            />
          </div>
        </motion.div>
      </div>

      <motion.h1
        className="text-4xl md:text-6xl font-extrabold tracking-wider bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        TIME HEIST
      </motion.h1>

      <motion.div
        className="h-1 w-48 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />

      <motion.p
        className="mt-4 text-muted-foreground max-w-sm mx-auto text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Master time. Execute the perfect heist. Become a legend.
      </motion.p>
    </motion.div>
  )
} 