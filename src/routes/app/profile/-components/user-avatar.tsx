import { motion } from 'framer-motion'

type UserAvatarProps = {
  avatar: string;
  level: number;
}

export const UserAvatar = ({ avatar, level }: UserAvatarProps) => {
  return (
    <div className="relative mb-3">
      <div className="absolute -inset-6 bg-primary/5 rounded-full blur-xl" />
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0 0px rgba(10, 255, 255, 0.2)',
            '0 0 0 8px rgba(10, 255, 255, 0)',
            '0 0 0 16px rgba(138, 43, 226, 0)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="w-28 h-28 rounded-full bg-gradient-to-r from-primary to-secondary p-[3px] mb-2 relative z-10"
      >
        <div className="w-full h-full rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-5xl border border-primary/10">
          {avatar}
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-xs px-3 py-1 rounded-full shadow-lg border border-primary/20 backdrop-blur-sm"
      >
        Lvl {level}
      </motion.div>
    </div>
  )
} 