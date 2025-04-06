import { motion } from "framer-motion"

export function DecorativeBackground({ success = true }: { success?: boolean }) {
  return (
    <>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${
            success 
              ? 'from-primary/5 via-background to-secondary/5' 
              : 'from-rose-500/5 via-background to-secondary/5'
          } z-0`}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        {/* Floating confetti/particles */}
        {success && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 
                ? 'bg-primary/30 w-2 h-2' 
                : i % 3 === 1 
                  ? 'bg-secondary/30 w-3 h-3' 
                  : 'bg-cyan-400/30 w-4 h-4'
            }`}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20,
              opacity: Math.random() * 0.7 + 0.3
            }}
            animate={{ 
              y: window.innerHeight + 20,
              rotate: Math.random() * 360,
            }}
            transition={{ 
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(10,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(10,255,255,.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20 z-0" />
    </>
  )
} 