import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import type { Reward } from "./types"
import { itemVariants, popVariants } from "./animations"

interface RewardsProps {
  rewards: Reward[]
  success: boolean
}

export function Rewards({ rewards, success }: RewardsProps) {
  if (!success || rewards.length === 0) {
    return null
  }
  
  return (
    <motion.div 
      className="bg-card/80 backdrop-blur-sm rounded-lg p-5 border border-primary/20 shadow-md"
      variants={itemVariants}
      custom={0.2}
    >
      <div className="flex items-center gap-3 mb-4">
        <Gift className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-semibold">Rewards Earned</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {rewards.map((reward, index) => (
          <motion.div 
            key={reward.name}
            className="flex flex-col items-center justify-center bg-background/50 p-3 rounded-lg border border-primary/10"
            variants={popVariants}
            custom={index * 0.1}
          >
            <div className="mb-2 text-primary text-2xl">
              {reward.icon}
            </div>
            <div className="text-sm font-medium text-center">
              {reward.name}
            </div>
            <div className="text-amber-400 font-bold">
              +{reward.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 