import { motion } from "framer-motion"
import { itemVariants } from "./animations"

export function Separator() {
  return (
    <motion.div 
      variants={itemVariants}
      className="relative flex items-center my-8"
    >
      <div className="flex-grow border-t border-border/50"></div>
      <span className="flex-shrink mx-4 text-sm text-muted-foreground">OR BROWSE AVAILABLE ROOMS</span>
      <div className="flex-grow border-t border-border/50"></div>
    </motion.div>
  )
} 