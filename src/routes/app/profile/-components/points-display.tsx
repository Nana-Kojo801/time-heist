import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type PointsDisplayProps = {
  points: number;
}

export const PointsDisplay = ({ points }: PointsDisplayProps) => {
  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 8px 0px rgba(10, 255, 255, 0.3)',
          '0 0 12px 2px rgba(10, 255, 255, 0.5)',
          '0 0 8px 0px rgba(10, 255, 255, 0.3)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="flex items-center bg-card/50 px-5 py-2 rounded-full backdrop-blur-sm border border-primary/20 mb-6"
    >
      <Sparkles className="w-4 h-4 text-primary mr-2" />
      <span className="font-bold text-lg">
        {points.toLocaleString()}
      </span>
      <span className="ml-1 text-sm text-foreground/70">points</span>
    </motion.div>
  )
} 