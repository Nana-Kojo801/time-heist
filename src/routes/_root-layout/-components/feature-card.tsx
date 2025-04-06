import { motion } from 'framer-motion'
import { fadeInUp } from './animations'
import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300"
      whileHover={{ 
        y: -5, 
        boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(124, 58, 237, 0.5)'
      }}
    >
      <motion.div 
        className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
        whileHover={{ 
          scale: 1.1,
          backgroundColor: 'rgba(124, 58, 237, 0.2)',
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-primary mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </motion.div>
  )
} 