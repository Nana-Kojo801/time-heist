import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Timer } from 'lucide-react'
import { fadeInUp, heroImageVariants, pulseGlow, staggerContainer } from './animations'

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Grid overlay - cyberpunk effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" 
      />
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left side - Text and CTA */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
            >
              <Timer className="h-4 w-4" />
              <span className="text-sm font-medium">
                Synchronized Multiplayer Experience
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Time Heist
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6"
            >
              A multiplayer game where players collaborate to hack a digital
              vault by stopping a synchronized timer at precise moments.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex gap-4 mb-6"
            >
              <Link to="/tutorial">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" variant="tertiary">
                    How to Play
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <Link to="/auth/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="lg">
                    Get Started
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Timer Visual */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:pl-12"
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer glow effect */}
                <motion.div 
                  className="absolute w-full h-full rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Main timer container */}
                <motion.div 
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 240,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* Inner timer display */}
                  <motion.div 
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
                    variants={pulseGlow}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="text-center">
                      <motion.div
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wider"
                        animate={{
                          backgroundPosition: ['0% center', '100% center', '0% center'],
                        }}
                        transition={{
                          duration: 8,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      >
                        00:00:00
                      </motion.div>
                      <div className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">
                        Synchronized Timer
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div 
                  className="absolute top-0 right-0 w-4 h-4 rounded-full bg-secondary/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-secondary/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 