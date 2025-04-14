import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { itemVariants, containerVariants } from './animations'
import { useGame, useGameUser } from './hooks'
import { useMemo } from 'react'

export function TimeWindows() {
  const game = useGame()
  const user = useGameUser()
  const numWindowsHit = useMemo(
    () => user.hits.filter((hit) => hit.status === 'SUCCESS').length,
    [user.hits],
  )
  return (
    <motion.div className="mb-4 flex-1 overflow-y-auto" variants={itemVariants}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-semibold">Time Windows</h3>
        <Badge variant="outline" className="text-primary border-primary/20">
          {numWindowsHit}/{game.timeWindows.length} Hit
        </Badge>
      </div>
      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {game.timeWindows.map((window) => {
          const hit = user.hits.find((hit) => hit.timeWindow === window)!
          const windowHit = hit.status === 'SUCCESS'!
          return (
            <motion.div
              key={window}
              className={`p-3 rounded-lg flex items-center gap-3 border ${
                windowHit === true
                  ? 'bg-green-500/10 border-green-500/30 text-green-500'
                  : windowHit === false
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                    : 'bg-card/30 border-primary/10'
              } transition-all duration-300 hover:scale-[1.02]`}
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div
                className={`p-2 rounded-full ${
                  windowHit === true
                    ? 'bg-green-500/20'
                    : windowHit === false
                      ? 'bg-rose-500/20'
                      : 'bg-primary/20'
                }`}
              >
                <Target
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    windowHit === true
                      ? 'text-green-500'
                      : windowHit === false
                        ? 'text-rose-500'
                        : 'text-primary'
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-base font-medium">{window}</p>
                {hit.accuracy && (
                  <p className="text-xs opacity-70">
                    Accuracy: ±{hit.accuracy}s
                  </p>
                )}
              </div>
              <div>
                {windowHit === true && (
                  <div className="text-xs bg-green-500/20 px-2 py-1 rounded-full text-green-500">
                    SUCCESS
                  </div>
                )}
                {windowHit === false && (
                  <div className="text-xs bg-rose-500/20 px-2 py-1 rounded-full text-rose-500">
                    MISSED
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
