import type { Player } from "./types"

// Mock player data - this would come from the game state
export const mockPlayers: Player[] = [
  { id: 1, name: 'Player1', role: 'Leader', isReady: true },
  { id: 2, name: 'Player2', role: 'Lookout', isReady: false },
  { id: 3, name: 'Player3', role: 'Technician', isReady: true },
  { id: 4, name: 'Player4', role: '', isReady: false },
] 