import { motion } from 'framer-motion'
import { fadeInUp } from './animations'

type StepCardProps = {
  number: string
  title: string
  description: string
  index: number
}

export const StepCard = ({ number, title, description, index }: StepCardProps) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        />
        <span className="text-2xl font-bold text-primary relative z-10">{number}</span>
      </motion.div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </motion.div>
  )
} 