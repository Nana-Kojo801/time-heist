import { motion } from "framer-motion"

export function DecorativeBackground() {
  return (
    <>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-background z-0"
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

        {/* Floating accent elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-20"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-secondary/10 blur-3xl opacity-20"
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(10,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(10,255,255,.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20 z-0" />
    </>
  )
} 