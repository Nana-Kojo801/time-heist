import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { itemVariants } from "./animations"

interface RoomCodeInputProps {
  roomIdInput: string
  setRoomIdInput: (value: string) => void
}

export function RoomCodeInput({ roomIdInput, setRoomIdInput }: RoomCodeInputProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="mb-8 relative overflow-hidden p-6 rounded-lg border border-primary/20 bg-card/30 backdrop-blur-sm"
    >
      {/* Decorative border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Enter Room Code</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter Room ID"
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            className="bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary/50 pr-10"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60">
            #
          </div>
        </div>
        
        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={itemVariants}
        >
          <Link to={`/app/room/$id`} params={{ id: '1234' }} className="w-full block">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 flex items-center justify-center gap-2"
            >
              Join Room
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
} 