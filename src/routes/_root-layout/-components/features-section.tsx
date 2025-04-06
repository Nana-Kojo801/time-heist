import { motion } from 'framer-motion'
import { Shield, Target, Timer, Trophy, Users, Zap } from 'lucide-react'
import { staggerContainer } from './animations'
import { FeatureCard } from './feature-card'

export const FeaturesSection = () => {
  const features = [
    { 
      icon: <Timer className="h-6 w-6 text-primary" />,
      title: "Synchronized Timer",
      description: "Precise timing across all devices for the ultimate heist experience. Every second counts!"
    },
    { 
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Unique Roles",
      description: "Play as Leader, Lookout, Technician, Safecracker, or Disruptor. Each role has unique abilities."
    },
    { 
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Team Strategy",
      description: "Work together to hit perfect time windows and maximize your score. Communication is key!"
    },
    { 
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Security Systems",
      description: "Navigate through complex security systems with increasing difficulty levels."
    },
    { 
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Real-time Feedback",
      description: "Get immediate feedback on your timing accuracy and team performance."
    },
    { 
      icon: <Trophy className="h-6 w-6 text-primary" />,
      title: "Achievements",
      description: "Unlock achievements and track your progress as you master the game."
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Game Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Time Heist combines precision timing with team coordination for an
            unforgettable multiplayer experience.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
} 