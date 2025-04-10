import { Shield, Eye, Wrench, Zap } from 'lucide-react'
import { type ReactNode } from 'react'

export interface RoleDetail {
  icon: ReactNode
  description: string
}

export type RoleKey = 'Leader' | 'Lookout' | 'Technician' | 'Safecracker'

// Role descriptions and icons
export const roleDetails: Record<RoleKey, RoleDetail> = {
  'Leader': {
    icon: <Shield className="h-5 w-5 text-primary" />,
    description: 'Controls the timer, starts and stops the game'
  },
  'Lookout': {
    icon: <Eye className="h-5 w-5 text-primary" />,
    description: 'Can see upcoming time windows ahead of other players'
  },
  'Technician': {
    icon: <Wrench className="h-5 w-5 text-primary" />,
    description: 'Can slow down the timer for a brief period'
  },
  'Safecracker': {
    icon: <Zap className="h-5 w-5 text-primary" />,
    description: 'Gets bonus points for hitting the exact time window'
  }
} 