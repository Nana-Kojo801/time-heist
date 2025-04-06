import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { DecorativeBackground } from './-components/decorative-background'
import { PageHeader } from './-components/page-header'
import { RoomCodeInput } from './-components/room-code-input'
import { Separator } from './-components/separator'
import { SearchBar } from './-components/search-bar'
import { RoomList } from './-components/room-list'
import { mockRooms } from './-components/room-data'
import { containerVariants } from './-components/animations'

export const Route = createFileRoute('/app/join-room/')({
  component: JoinRoomPage,
})

function JoinRoomPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roomIdInput, setRoomIdInput] = useState('')

  const filteredRooms = mockRooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground p-4 sm:p-6 relative overflow-hidden"
    >
      <DecorativeBackground />
      <PageHeader />

      {/* Content Area with max-w-lg and mx-auto */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-lg relative z-10"
      >
        {/* Join by Room ID */}
        <RoomCodeInput roomIdInput={roomIdInput} setRoomIdInput={setRoomIdInput} />

        {/* Separator */}
        <Separator />

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Room List */}
        <RoomList filteredRooms={filteredRooms} searchTerm={searchTerm} />
      </motion.div>
    </motion.div>
  )
}
