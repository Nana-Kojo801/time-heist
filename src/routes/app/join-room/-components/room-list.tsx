import { motion } from 'framer-motion'
import { RoomCard } from './room-card'
import { containerVariants, itemVariants } from './animations'
import type { DataModel } from '@convex/_generated/dataModel'

interface RoomListProps {
  filteredRooms: DataModel['rooms']['document'][]
  searchTerm: string
}

export function RoomList({ filteredRooms, searchTerm }: RoomListProps) {
  return (
    <motion.div variants={containerVariants} className="space-y-4">
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room, index) => (
          <RoomCard key={room._id} room={room} index={index} />
        ))
      ) : searchTerm !== '' ? (
        <motion.div
          variants={itemVariants}
          className="text-center p-8 border border-dashed border-primary/20 rounded-lg bg-card/20 backdrop-blur-sm"
        >
          <p className="text-muted-foreground">
            No rooms found matching "{searchTerm}"
          </p>
          <p className="text-xs mt-2 text-muted-foreground">
            Try a different search term or create a new room
          </p>
        </motion.div>
      ) : (
        <p>No rooms available</p>
      )}
    </motion.div>
  )
}
