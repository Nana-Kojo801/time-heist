import type { ReactNode } from 'react'

export interface GamePlayer {
  id: number
  name: string
  role: PlayerRole
  isOnline: boolean
  status: string
  points: number
}

export interface TimeWindow {
  id: number
  time: string
  hit: boolean | null
  accuracy?: number
}

// Define player roles as a type
export type PlayerRole = 'Leader' | 'Lookout' | 'Technician' | 'Safecracker'

// Define role ability
export interface Ability {
  icon: ReactNode
  name: string
  description: string
} 