import { motion } from "framer-motion"
import { Link } from "@tanstack/react-router"
import { KeyRound, Users, Clock, SignalHigh, SignalMedium, SignalLow } from "lucide-react"
import { type Room } from "./room-data"
import { itemVariants } from "./animations"

interface RoomCardProps {
  room: Room
  index: number
}

export function RoomCard({ room, index }: RoomCardProps) {
  // Function to get activity icon
  const getActivityIcon = (activity: Room['activity']) => {
    switch (activity) {
      case 'high':
        return <SignalHigh className="w-4 h-4 text-green-400" />;
      case 'medium':
        return <SignalMedium className="w-4 h-4 text-yellow-400" />;
      case 'low':
        return <SignalLow className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      custom={index}
      className="relative overflow-hidden"
    >
      <Link
        to={`/app/room/$id`}
        params={{ id: room.id }}
        className="p-4 sm:p-5 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors duration-300 cursor-pointer block bg-card/30 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10 border border-primary/20">
              {room.isPrivate ? (
                <KeyRound className="w-5 h-5 text-secondary" />
              ) : (
                <Users className="w-5 h-5 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-lg">{room.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {room.isPrivate && (
                  <span className="bg-secondary/10 text-secondary text-xs px-2 py-0.5 rounded-full border border-secondary/20">
                    Private
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{room.members}/{room.capacity}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              {getActivityIcon(room.activity)}
              <span className="text-xs text-muted-foreground">Activity</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {room.lastActive}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 