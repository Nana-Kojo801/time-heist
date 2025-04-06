import { motion } from 'framer-motion'

export const FooterText = () => {
  return (
    <motion.div
      className="mt-12 text-sm text-muted-foreground relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="relative">
        <span className="bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 bg-clip-text">
          Hack the timeline with perfect timing
        </span>
        <motion.div 
          className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />
      </div>
    </motion.div>
  )
} 