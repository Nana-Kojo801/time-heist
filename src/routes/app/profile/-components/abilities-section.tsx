import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { itemVariants } from './profile-animations'
import { AbilityCard } from './ability-card'
import type { Ability } from './types'

type AbilitiesSectionProps = {
  abilities: Ability[];
}

export const AbilitiesSection = ({ abilities }: AbilitiesSectionProps) => {
  const unlockedCount = abilities.filter(a => a.unlocked).length;
  
  return (
    <motion.section variants={itemVariants} className="w-full">
      <div className="flex items-center mb-4">
        <Zap className="w-6 h-6 mr-2 text-primary" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Abilities
        </h2>
        <span className="ml-auto text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
          {unlockedCount}/{abilities.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {abilities.map((ability) => (
          <AbilityCard
            key={ability.name}
            name={ability.name}
            description={ability.description}
            cost={ability.cost}
            unlocked={ability.unlocked}
            icon={ability.icon}
          />
        ))}
      </div>
    </motion.section>
  )
} 