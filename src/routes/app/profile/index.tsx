import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Trophy,
  Star,
  Clock,
  Target,
  Sparkles,
  Award,
  Shield,
  Flame,
} from 'lucide-react'

import { containerVariants } from './-components/profile-animations'
import { DecorativeBackground } from './-components/decorative-background'
import { PageHeader } from './-components/page-header'
import { ProfileHeader } from './-components/profile-header'
import { AchievementsSection } from './-components/achievements-section'
import { StatsSection } from './-components/stats-section'
import type { UserData } from './-components/types'

export const Route = createFileRoute('/app/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  // Mock user data
  const user: UserData = {
    username: 'TimeJumper',
    avatar: '🕰️',
    points: 15750,
    gamesPlayed: 42,
    accuracy: 87,
    favoriteRole: 'Safecracker',
    wins: 28,
    level: 42,
    stats: {
      roles: [
        { name: 'Safecracker', played: 18, accuracy: 92 },
        { name: 'Lookout', played: 12, accuracy: 85 },
        { name: 'Leader', played: 8, accuracy: 79 },
        { name: 'Technician', played: 4, accuracy: 88 },
      ],
      recentGames: [
        { date: '04/03/25', role: 'Safecracker', points: 1250, result: 'Win' },
        { date: '04/02/25', role: 'Leader', points: 980, result: 'Win' },
        { date: '03/30/25', role: 'Lookout', points: 750, result: 'Loss' },
      ],
    },
    abilities: [
      {
        name: 'Time Slow',
        description: 'Slow down the timer for 3 seconds',
        cost: 5000,
        unlocked: true,
        icon: <Clock className="w-5 h-5" />,
      },
      {
        name: 'Double Points',
        description: 'Double points for perfect hits',
        cost: 8000,
        unlocked: true,
        icon: <Flame className="w-5 h-5" />,
      },
      {
        name: 'Extra Window',
        description: 'See one additional time window',
        cost: 10000,
        unlocked: false,
        icon: <Target className="w-5 h-5" />,
      },
      {
        name: 'Time Freeze',
        description: 'Freeze the timer for 1 second',
        cost: 15000,
        unlocked: false,
        icon: <Sparkles className="w-5 h-5" />,
      },
    ],
    achievements: [
      {
        name: 'First Heist',
        description: 'Complete your first game',
        unlocked: true,
        icon: <Trophy className="w-5 h-5" />,
      },
      {
        name: 'Perfect Timing',
        description: 'Hit 5 perfect windows in a row',
        unlocked: true,
        icon: <Target className="w-5 h-5" />,
      },
      {
        name: 'Master Thief',
        description: 'Win 25 games',
        unlocked: true,
        icon: <Award className="w-5 h-5" />,
      },
      {
        name: 'Role Collector',
        description: 'Play all available roles',
        unlocked: false,
        icon: <Shield className="w-5 h-5" />,
      },
      {
        name: 'Legendary Heister',
        description: 'Accumulate 50,000 points',
        unlocked: false,
        icon: <Star className="w-5 h-5" />,
      },
    ],
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden"
    >
      {/* Background elements */}
      <DecorativeBackground />

      {/* Header with back button */}
      <PageHeader />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-4 overflow-y-auto relative z-10">
        <div className="w-full max-w-2xl">
          {/* User profile header */}
          <ProfileHeader
            username={user.username}
            avatar={user.avatar}
            gamesPlayed={user.gamesPlayed}
            wins={user.wins}
          />

          {/* Tabbed content sections */}
          <motion.div
            className="w-full space-y-8 pb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Achievements Section */}
            <AchievementsSection achievements={user.achievements} />

            {/* Stats Section */}
            <StatsSection />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
