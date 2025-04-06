export interface PlayerResult {
  id: number
  name: string
  role: string
  points: number
  accuracy: number
  hits: number
  totalWindows: number
  percentile: number
  rank: 1 | 2 | 3 | 4
}

export interface TeamResult {
  success: boolean
  points: number
  accuracy: number
  hits: number
  totalWindows: number
  timeCompleted: string
  percentile: number
}

export interface Reward {
  name: string
  amount: number
  icon: string
} 