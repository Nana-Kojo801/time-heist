import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { PageHeader } from './-components/page-header'
import { RoomForm } from './-components/room-form'
import { pageTransitionVariants } from './-components/animations'

export const Route = createFileRoute('/app/create-room/')({
  component: CreateRoomPage,
})

function CreateRoomPage() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageTransitionVariants}
      className="min-h-screen bg-background text-foreground p-4 sm:p-6"
    >
      <PageHeader />
      <RoomForm />
    </motion.div>
  )
}
