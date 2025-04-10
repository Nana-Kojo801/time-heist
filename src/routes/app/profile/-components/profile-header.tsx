import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Clock, Target, Trophy, Edit } from 'lucide-react'

import { UserAvatar } from './user-avatar'
import { StatCard } from './stat-card'
import { useAuthUser } from '@/components/auth-provider'

type ProfileHeaderProps = {
  username: string
  avatar: string
  gamesPlayed: number
  wins: number
}

export const ProfileHeader = ({
  gamesPlayed,
  wins,
}: ProfileHeaderProps) => {
  const user = useAuthUser()
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center justify-center p-6 text-center relative mb-6"
    >
      {/* Avatar with animated border */}
      <UserAvatar avatar={user.avatar} />

      {/* Username with gradient text */}
      <motion.h1
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {user.username}
      </motion.h1>

      {/* Edit Profile Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/app/edit-profile">
          <Button
            variant="outline"
            size="sm"
            className="mb-5 border-primary/30 hover:border-primary/60 text-primary hover:bg-primary/10 transition-all duration-300 group"
          >
            <Edit className="w-4 h-4 mr-1 group-hover:rotate-12 transition-transform" />
            Edit Profile
          </Button>
        </Link>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Games"
          value={gamesPlayed}
          delay={0.2}
        />

        <StatCard
          icon={<Trophy className="w-5 h-5" />}
          label="Wins"
          value={wins}
          delay={0.4}
        />

        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Losses"
          value={gamesPlayed - wins}
          delay={0.6}
        />
      </div>
    </motion.div>
  )
}
