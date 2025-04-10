import { motion } from 'framer-motion'

type UserAvatarProps = {
  avatar: string
}

export const UserAvatar = ({ avatar }: UserAvatarProps) => {
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
        <img
          src={avatar}
          className="w-full h-full object-cover object-center rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-5xl border border-primary/10"
        />
      </motion.div>
    </div>
  )
}
