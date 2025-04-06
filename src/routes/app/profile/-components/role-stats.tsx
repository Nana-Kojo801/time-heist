import { motion } from 'framer-motion'
import type { Role } from './types'

type RoleStatsProps = {
  roles: Role[];
}

export const RoleStats = ({ roles }: RoleStatsProps) => {
  return (
    <div className="space-y-5">
      {roles.map((role, index) => (
        <motion.div
          key={role.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex flex-col"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              {role.name}
            </span>
            <span className="text-sm text-foreground/70 px-2 py-0.5 rounded-full bg-card/50 border border-primary/10">
              {role.played} games
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-card/50 border border-primary/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${role.accuracy}%` }}
                transition={{
                  duration: 1,
                  delay: 0.5 + index * 0.2,
                }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
            <span className="text-sm font-medium w-12 text-right">
              {role.accuracy}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 