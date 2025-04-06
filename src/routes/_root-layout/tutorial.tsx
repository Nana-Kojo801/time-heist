import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  Crown,
  Eye,
  Wrench,
  Lock,
  Radio,
  Zap,
  Clock,
  Brain,
  Users,
  Timer,
  ArrowRight,
} from 'lucide-react'
import type { ReactElement } from 'react'
import { fadeInUp, staggerContainer } from './-components/animations'
import { FooterSection } from './-components/footer-section'

// Role icons mapping
const roleIcons: Record<string, ReactElement> = {
  Leader: <Crown className="h-6 w-6 text-primary" />,
  Lookout: <Eye className="h-6 w-6 text-primary" />, 
  Technician: <Wrench className="h-6 w-6 text-primary" />,
  Safecracker: <Lock className="h-6 w-6 text-primary" />,
  Disruptor: <Radio className="h-6 w-6 text-primary" />
}

export const Route = createFileRoute('/_root-layout/tutorial')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      <motion.div 
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-secondary/5 to-primary/5 blur-3xl opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="flex justify-center mb-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Timer className="text-primary h-12 w-12 mb-2" />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            How to Play Time Heist
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Master the art of synchronized timing and become the ultimate heist
            team
          </motion.p>
        </motion.div>

        {/* Game Overview */}
        <motion.div 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="flex items-center gap-3 mb-6" variants={fadeInUp}>
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-primary">
              Game Overview
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden group"
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              />
              
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                The Objective
              </h3>
              <p className="text-muted-foreground mb-4">
                Work together with your team to hack a digital vault by stopping
                a synchronized timer at precise moments.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> One player controls the timer (Leader)
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Other players must hit the "HACK" button at exact moments
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Points are awarded based on timing accuracy
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden group"
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              />
              
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Basic Rules
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> The Leader starts and stops the timer
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Time windows appear as target times (e.g., "00:12.45")
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Press HACK when the timer matches a time window
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> The round ends when the Leader stops the timer
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Use earned points to unlock abilities
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Roles Section */}
        <motion.div 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="flex items-center gap-3 mb-6" variants={fadeInUp}>
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Player Roles</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Leader",
                description: "Controls the timer, starts and stops the game",
                abilities: ["Controls game flow", "Sets the pace", "Can see all time windows"]
              },
              {
                name: "Lookout",
                description: "Can see upcoming time windows ahead of others",
                abilities: ["Advanced warning system", "Strategic advantage", "Team coordinator"]
              },
              {
                name: "Technician",
                description: "Can slow down the timer for better accuracy",
                abilities: ["Time manipulation", "Precision control", "Team support"]
              },
              {
                name: "Safecracker",
                description: "Gets bonus points for perfect timing",
                abilities: ["High risk, high reward", "Precision specialist", "Point multiplier"]
              },
              {
                name: "Disruptor",
                description: "Creates fake time windows to mislead others",
                abilities: ["Strategic deception", "Mind games", "Team defense"]
              }
            ].map((role) => (
              <motion.div
                key={role.name}
                className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden"
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div 
                  className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                />
                
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <motion.div
                    className="p-1.5 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(124, 58, 237, 0.2)' }}
                  >
                    {roleIcons[role.name]}
                  </motion.div>
                  {role.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {role.description}
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  {role.abilities.map((ability, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-2" 
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="text-primary">•</span> {ability}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="flex items-center gap-3 mb-6" variants={fadeInUp}>
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Pro Tips</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden"
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              />
              
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Team Coordination
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Communicate with your team about upcoming windows
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Coordinate role abilities for maximum effect
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Watch for the Disruptor's fake windows
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden"
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              />
              
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <Timer className="h-5 w-5 mr-2 text-primary" />
                Timing Strategy
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Practice your timing in training mode
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Use the Technician's slow-down wisely
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2" 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-primary">•</span> Save points for crucial ability upgrades
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold px-8 py-6 text-lg relative overflow-hidden group"
              >
                <motion.span 
                  className="absolute inset-0 bg-white/20 rounded-lg" 
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 0.3 }}
                  transition={{ duration: 0.8 }}
                />
                Start Playing
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                  className="ml-2"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
      
      <FooterSection />
    </div>
  )
}
