import type { RoleKey } from "./role-details"

export interface Player {
  id: number
  name: string
  role: RoleKey | ''
  isReady: boolean
} 