import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { LogOut, MessageSquare, Play } from "lucide-react"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "./animations"

interface HeaderProps {
  isLeader: boolean
  handleLeaveRoom: () => void
}

export function Header({ isLeader, handleLeaveRoom }: HeaderProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative"
    >
      <motion.div 
        variants={itemVariants}
        className="mb-4 sm:mb-0"
      >
        <motion.h1 className="text-3xl sm:text-4xl font-bold">
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Lobby
          </span>
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 w-32 mt-2 bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </motion.div>
      <motion.div 
        variants={containerVariants}
        className="flex flex-wrap justify-start sm:justify-end gap-3"
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/app/room/$id/chat" params={{ id: '123' }}>
            <Button variant="outline" className="group">
              <MessageSquare className="w-4 h-4 mr-2 text-primary group-hover:text-primary-foreground" /> 
              Chat
            </Button>
          </Link>
        </motion.div>
        {isLeader && (
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/app/room/$id/game" params={{ id: '123' }}>
              <Button 
                variant="tertiary" 
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground group"
              >
                <Play className="w-4 h-4 mr-2 group-hover:text-primary-foreground" /> 
                Start Game
              </Button>
            </Link>
          </motion.div>
        )}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="destructive"
            onClick={handleLeaveRoom}
            className="flex items-center bg-rose-500/80 hover:bg-rose-500 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" /> Leave
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
} 