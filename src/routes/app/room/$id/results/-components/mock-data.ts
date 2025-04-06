import type { PlayerResult, TeamResult, Reward } from './types'

export const playerResults: PlayerResult[] = [
  {
    id: 1,
    name: 'Player1',
    role: 'Leader',
    points: 160,
    accuracy: 0.92,
    hits: 9,
    totalWindows: 10,
    percentile: 78,
    rank: 1
  },
  {
    id: 2,
    name: 'Player2',
    role: 'Lookout',
    points: 120,
    accuracy: 0.85,
    hits: 8,
    totalWindows: 10,
    percentile: 65,
    rank: 3
  },
  {
    id: 3,
    name: 'Player3',
    role: 'Technician',
    points: 150,
    accuracy: 0.90,
    hits: 9,
    totalWindows: 10,
    percentile: 72,
    rank: 2
  },
  {
    id: 4,
    name: 'Player4',
    role: 'Safecracker',
    points: 110,
    accuracy: 0.80,
    hits: 8,
    totalWindows: 10,
    percentile: 60,
    rank: 4
  }
]

export const teamResult: TeamResult = {
  success: true, 
  points: 540,
  accuracy: 0.87,
  hits: 34,
  totalWindows: 40,
  timeCompleted: '02:45.32',
  percentile: 82
}

export const rewards: Reward[] = [
  { name: 'Bonus Points', amount: 540, icon: '✨' },
  { name: 'XP', amount: 120, icon: '📈' },
  { name: 'Agent Tokens', amount: 5, icon: '🪙' }
] 