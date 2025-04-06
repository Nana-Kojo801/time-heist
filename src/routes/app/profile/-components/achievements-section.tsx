import { motion } from 'framer-motion'
import { Medal } from 'lucide-react'
import { itemVariants } from './profile-animations'
import { AchievementCard } from './achievement-card'
import type { Achievement } from './types'

type AchievementsSectionProps = {
  achievements: Achievement[];
}

export const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  
  return (
    <motion.section variants={itemVariants} className="w-full">
      <div className="flex items-center mb-4">
        <Medal className="w-6 h-6 mr-2 text-primary" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Achievements
        </h2>
        <span className="ml-auto text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
          {unlockedCount}/{achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.name}
            name={achievement.name}
            description={achievement.description}
            unlocked={achievement.unlocked}
            icon={achievement.icon}
          />
        ))}
      </div>
    </motion.section>
  )
} 