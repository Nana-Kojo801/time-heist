import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { MessageCircleIcon, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BackLink from '@/components/back-link'

export const Route = createFileRoute('/app/room/$id/chat/')({
  component: ChatComponent,
})

const mockMessages = [
  {
    id: 1,
    user: 'Player1',
    role: 'Leader',
    message: 'Welcome to the game!',
    timestamp: '12:00',
    isCurrentUser: false,
  },
  {
    id: 2,
    user: 'Player2',
    role: 'Lookout',
    message: 'Ready to start!',
    timestamp: '12:01',
    isCurrentUser: false,
  },
  {
    id: 3,
    user: 'Player3',
    role: 'Technician',
    message: "Let's do this!",
    timestamp: '12:02',
    isCurrentUser: false,
  },
  {
    id: 4,
    user: 'You',
    role: 'Safecracker',
    message: "I'm ready to crack some safes!",
    timestamp: '12:03',
    isCurrentUser: true,
  },
  {
    id: 5,
    user: 'Player1',
    role: 'Leader',
    message: "Great team! Let's get started in a few minutes.",
    timestamp: '12:04',
    isCurrentUser: false,
  },
]

const mockUsers = [
  { id: 1, name: 'Player1', role: 'Leader', isOnline: true },
  { id: 2, name: 'Player2', role: 'Lookout', isOnline: true },
  { id: 3, name: 'Player3', role: 'Technician', isOnline: true },
  { id: 4, name: 'Player4', role: 'Safecracker', isOnline: false },
]

function ChatComponent() {
  const [message, setMessage] = useState('')

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
        <div className="flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
          >
            <AnimatePresence>
              {mockMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] flex ${msg.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}
                  >
                    {!msg.isCurrentUser && (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-sm sm:text-base shadow-sm">
                        {msg.user[0]}
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`relative p-3 rounded-2xl shadow-sm ${
                          msg.isCurrentUser ? 'bg-primary/30' : 'bg-primary/10'
                        }`}
                      >
                        <p className="text-sm sm:text-base leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs text-muted-foreground ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <span>{msg.timestamp}</span>
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {msg.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-3 sm:p-5 border-t border-primary/20 bg-card/50 backdrop-blur-md"
          >
            <div className="w-full px-4 sm:px-6 flex items-center gap-3">
              <div className="relative flex-1">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send a message..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setMessage('')
                    }
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-card/50 border border-primary/20 focus:ring-2 focus:ring-primary text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 shadow-sm"
                />
                <MessageCircleIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 h-4 w-4" />
              </div>
              <Button
                onClick={() => {
                  setMessage('')
                }}
                size="icon"
                className="rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 h-10 w-10 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Online Players */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="hidden lg:flex flex-col w-72 border-l border-primary/20 bg-card/50 backdrop-blur-md"
        >
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold text-primary">
              Players Online
            </h2>
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary shadow-sm">
                  {user.name[0]}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
                <div
                  className="ml-auto w-2.5 h-2.5 rounded-full mt-1 mr-1.5 shadow-sm"
                  style={{
                    backgroundColor: user.isOnline
                      ? 'var(--primary)'
                      : 'var(--muted-foreground)',
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
