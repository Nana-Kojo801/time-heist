import { Settings, Target, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { itemVariants } from "./animations"

export function GameSettings() {
  return (
    <motion.div 
      variants={itemVariants} 
      className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden"
    >
      {/* Decorative top/bottom borders */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-primary">Game Settings</h2>
      </div>
      <div className="space-y-6">
        <motion.div 
          className="space-y-2"
          whileHover={{ x: 5 }}
        >
          <label className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Time Windows
          </label>
          <Input
            type="number"
            placeholder="Number of time windows"
            className="bg-card/50 border-primary/20 focus:ring-2 focus:ring-primary h-12"
            defaultValue="5"
          />
          <p className="text-xs text-muted-foreground">
            Number of time windows to appear during the game
          </p>
        </motion.div>
        <motion.div 
          className="space-y-2"
          whileHover={{ x: 5 }}
        >
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Round Duration (seconds)
          </label>
          <Input
            type="number"
            placeholder="Round duration"
            className="bg-card/50 border-primary/20 focus:ring-2 focus:ring-primary h-12"
            defaultValue="60"
          />
          <p className="text-xs text-muted-foreground">
            Total duration of the game round in seconds
          </p>
        </motion.div>
        
        <motion.div 
          className="space-y-2 pt-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            className="w-full bg-primary/10 border border-primary/20 text-primary py-5"
          >
            Save Settings
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
} 