import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import type { ReactNode } from 'react'
import { itemVariants } from './profile-animations'

type AbilityCardProps = {
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  icon: ReactNode;
}

export const AbilityCard = ({
  name,
  description,
  cost,
  unlocked,
  icon
}: AbilityCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      className={`p-3 rounded-lg border relative overflow-hidden ${
        unlocked
          ? 'bg-card/50 border-primary/20 shadow-lg shadow-primary/5'
          : 'bg-card/20 border-foreground/10'
      } backdrop-blur-sm flex items-start transition-all duration-300`}
    >
      {/* Decorative element */}
      {unlocked && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
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
          unlocked ? 'text-primary' : 'text-foreground/50'
        }`}>
          {name}
        </h3>
        <p className="text-xs text-foreground/70 mb-2">
          {description}
        </p>
        <div className="flex items-center">
          <div className={`text-xs px-2 py-0.5 rounded-full ${
            unlocked
              ? 'bg-primary/20 text-primary'
              : 'bg-foreground/10 text-foreground/50'
          }`}>
            {cost.toLocaleString()} points
          </div>
          {!unlocked && (
            <div className="ml-auto text-xs text-foreground/60 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Locked
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 