import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  delay?: number;
}

export const StatCard = ({ icon, label, value, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="p-3 bg-card/40 backdrop-blur-sm rounded-lg border border-primary/20 shadow-sm hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Highlight top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

      <div className="flex flex-col items-center">
        <div className="text-primary mb-1 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-sm text-foreground/70 mb-1">
          {label}
        </div>
        <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {value}
        </div>
      </div>
    </motion.div>
  )
} 