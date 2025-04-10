import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import BackLink from '@/components/back-link'
import ChatInterface from './-components/chat-interface'
import OnlinePlayers from './-components/online-players'

export const Route = createFileRoute('/app/room/$id/chat/')({
  component: ChatComponent,
})

function ChatComponent() {
  return (
    <div className="h-dvh w-full flex flex-col bg-background text-foreground overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-primary/20 bg-card/50 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <Link to="..">
            <BackLink />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Lobby Chat
          </h1>
        </div>
      </motion.div>

      {/* Main Body */}
      <div className="flex flex-grow overflow-y-auto">
        {/* Messages */}
        <ChatInterface />

        {/* Online Players */}
        <OnlinePlayers />
      </div>
    </div>
  )
}
