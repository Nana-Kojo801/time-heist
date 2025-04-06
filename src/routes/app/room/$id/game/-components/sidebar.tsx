import { motion } from "framer-motion"
import { TeamStatus } from "./team-status"
import { PlayerAbilities } from "./player-abilities"
import { itemVariants } from "./animations"
import type { GamePlayer, PlayerRole } from "./types"
import { roleAbilities } from "./mock-data"

interface SidebarProps {
  players: GamePlayer[]
  currentPlayerRole: PlayerRole
}

export function Sidebar({ players, currentPlayerRole }: SidebarProps) {
  const currentAbilities = roleAbilities[currentPlayerRole] || []

  return (
    <motion.div 
      className="flex flex-col h-full gap-4"
      variants={itemVariants}
    >
      <TeamStatus players={players} />
      <PlayerAbilities abilities={currentAbilities} />
    </motion.div>
  )
} 