import { Copy } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { itemVariants } from "./animations"
import { useRoom } from "../../-utils"

export function GameCodeDisplay() {
  const room = useRoom()
  return (
    <motion.div 
      variants={itemVariants}
      className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div 
            className="h-10 sm:h-14 px-3 sm:px-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/30 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(10, 255, 255, 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {room.code}
            </span>
          </motion.div>
          <h2 className="text-sm sm:text-lg font-semibold text-primary">Game Code</h2>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            className="bg-primary/10 border-primary text-primary hover:bg-primary/20 h-8 sm:h-auto py-1 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm"
            onClick={() => {
              navigator.clipboard.writeText(room.code)
            }}
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Copy
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
} 