import { motion } from 'framer-motion'
import { staggerContainer } from './animations'
import { StepCard } from './step-card'

export const HowItWorksSection = () => {
  const steps = [
    { 
      number: "1",
      title: "Join a Team",
      description: "Create or join a game with friends and select your role."
    },
    { 
      number: "2",
      title: "Coordinate",
      description: "Work together to identify the perfect time windows for hacking."
    },
    { 
      number: "3",
      title: "Execute",
      description: "Hit the timer at the exact moment to crack the vault and score points."
    }
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
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Time Heist is a game of precision timing and team coordination.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
} 