import { motion } from "framer-motion"
import { TeamStatus } from "./team-status"
import { PlayerAbilities } from "./player-abilities"
import { itemVariants } from "./animations"
import { roleAbilities } from "./utils"
import { useGameUser } from "./hooks"

export function Sidebar() {
  const user = useGameUser()
  const currentAbilities = roleAbilities[user.role]

  return (
    <motion.div 
      className="flex flex-col h-full gap-4"
      variants={itemVariants}
    >
      <TeamStatus />
      <PlayerAbilities abilities={currentAbilities} />
    </motion.div>
  )
} 