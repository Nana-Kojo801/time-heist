import { motion } from "framer-motion"
import { Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { itemVariants, containerVariants } from "./animations"
import type { Ability } from "./types"

interface PlayerAbilitiesProps {
  abilities: Ability[]
}

export function PlayerAbilities({ abilities }: PlayerAbilitiesProps) {
  return (
    <motion.div 
      className="bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 p-4 sm:p-5"
      variants={itemVariants}
    >
      <div className="flex items-center gap-2 mb-3">
        <Wrench className="h-4 w-4 text-primary" />
        <h2 className="text-base sm:text-lg font-bold">Your Abilities</h2>
      </div>
      <motion.div 
        className="space-y-2"
        variants={containerVariants}
      >
        {abilities.map((ability, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary p-3 h-auto"
            >
              <motion.div 
                className="mr-3"
                whileHover={{ rotate: 15 }}
              >
                {ability.icon}
              </motion.div>
              <div className="text-left">
                <div className="font-medium">{ability.name}</div>
                <div className="text-xs text-muted-foreground">{ability.description}</div>
              </div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
} 