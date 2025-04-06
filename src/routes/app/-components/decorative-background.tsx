import { motion } from 'framer-motion'

export const DecorativeBackground = () => {
  return (
    <>
      {/* Grid overlay - cyberpunk effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-40 z-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </>
  )
} 