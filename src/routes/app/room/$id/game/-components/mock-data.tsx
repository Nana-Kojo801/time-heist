import type { GamePlayer, TimeWindow, PlayerRole, Ability } from "./types"
import { Timer, FastForward, Eye, AlertCircle, Clock3, Shield, Target, Lock } from 'lucide-react'

// Mock player data - this would come from the game state
export const mockPlayers: GamePlayer[] = [
  {
    id: 1,
    name: 'Player1',
    role: 'Leader',
    isOnline: true,
    status: 'Ready',
    points: 150,
  },
  {
    id: 2,
    name: 'Player2',
    role: 'Lookout',
    isOnline: true,
    status: 'Watching',
    points: 120,
  },
  {
    id: 3,
    name: 'Player3',
    role: 'Technician',
    isOnline: true,
    status: 'Hacking',
    points: 100,
  },
  {
    id: 4,
    name: 'Player4',
    role: 'Safecracker',
    isOnline: true,
    status: 'Cracking',
    points: 200,
  },
]

export const mockTimeWindows: TimeWindow[] = [
  { id: 1, time: '00:12.45', hit: true, accuracy: 0.02 },
  { id: 2, time: '00:24.30', hit: false },
  { id: 3, time: '00:36.15', hit: null },
]

// For demo purposes - representing special abilities
export const roleAbilities: Record<PlayerRole, Ability[]> = {
  Leader: [
    { icon: <Timer />, name: 'Start/Stop', description: 'Control the game timer' },
    { icon: <FastForward />, name: 'Speed Boost', description: 'Increase timer speed by 20%' }
  ],
  Lookout: [
    { icon: <Eye />, name: 'Future Sight', description: 'See one additional time window' },
    { icon: <AlertCircle />, name: 'Alert Team', description: 'Notify team of upcoming window' }
  ],
  Technician: [
    { icon: <Clock3 />, name: 'Slow Time', description: 'Slow timer by 30% for 5 seconds' },
    { icon: <Shield />, name: 'Firewall', description: 'Protect from one missed window' }
  ],
  Safecracker: [
    { icon: <Target />, name: 'Precision', description: 'Double points for perfect hits' },
    { icon: <Lock />, name: 'Crack', description: 'Automatically hit one window' }
  ]
} 