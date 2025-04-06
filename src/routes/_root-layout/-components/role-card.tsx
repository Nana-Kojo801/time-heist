import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { type ReactNode } from 'react'
import { fadeInUp } from './animations'

type RoleCardProps = {
  icon: ReactNode
  title: string
  description: string
  ability: string
}

export const RoleCard = ({ icon, title, description, ability }: RoleCardProps) => {
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
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: 'rgba(124, 58, 237, 0.2)',
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <motion.div 
        className="flex items-center gap-2 text-sm text-primary"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <CheckCircle2 className="h-4 w-4" />
        <span>{ability}</span>
      </motion.div>
    </motion.div>
  )
} 