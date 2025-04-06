import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import type { ReactNode } from 'react'
import { itemVariants } from './profile-animations'

type AchievementCardProps = {
  name: string;
  description: string;
  unlocked: boolean;
  icon: ReactNode;
}

export const AchievementCard = ({ 
  name, 
  description, 
  unlocked, 
  icon 
}: AchievementCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      className={`p-3 rounded-lg border relative overflow-hidden ${
        unlocked
          ? 'bg-card/50 border-secondary/20 shadow-lg shadow-secondary/5'
          : 'bg-card/20 border-foreground/10'
      } backdrop-blur-sm flex items-start transition-all duration-300`}
    >
      {/* Decorative element */}
      {unlocked && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      )}

      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${
          unlocked
            ? 'bg-gradient-to-br from-primary to-secondary'
            : 'bg-card/50 border border-foreground/10'
        }`}
      >
        {unlocked ? (
          icon
        ) : (
          <Lock className="w-5 h-5 text-foreground/40" />
        )}
      </div>

      <div className="flex-1">
        <h3 className={`font-bold mb-1 ${
          unlocked ? 'text-secondary' : 'text-foreground/50'
        }`}>
          {name}
        </h3>
        <p className="text-xs text-foreground/70">
          {description}
        </p>
      </div>

      {unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          className="w-6 h-6 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center text-xs font-bold text-secondary absolute top-2 right-2"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  )
} 