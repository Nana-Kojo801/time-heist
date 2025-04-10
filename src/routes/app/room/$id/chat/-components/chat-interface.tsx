import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader, MessageCircleIcon, Send } from 'lucide-react'
import ChatMessage from './chat-message'
import { useCallback, useEffect, useRef, useState } from 'react'
import { chatQueryOptions, useRoom, useRoomUser } from '../../../-utils'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'

const ChatInterface = () => {
  const user = useRoomUser()
  const room = useRoom()
  const [message, setMessage] = useState('')
  const { mutateAsync: sendMessage, isPending: sendingMessage } = useMutation({
    mutationFn: useConvexMutation(api.roomChats.insert),
    onSuccess: () => {
      setMessage('')
    },
  })
  const { data: messages } = useSuspenseQuery(chatQueryOptions(room._id))
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const handleSendMessage = useCallback(async () => {
    await sendMessage({
      message,
      roomId: room._id,
      userId: user.userId,
    })
  }, [message])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 space-y-3"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <ChatMessage
              key={msg._id}
              msg={msg}
              isCurrentUser={msg.userId === user.userId}
            />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Input with improved responsiveness */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="p-2 sm:p-3 border-t border-primary/20 bg-card/50 backdrop-blur-md"
      >
        <div className="w-full px-2 sm:px-4 flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage()
                }
              }}
              className="w-full pl-10 sm:pl-12 pr-2 sm:pr-4 py-2 sm:py-3 rounded-full bg-card/50 border border-primary/20 focus:ring-2 focus:ring-primary text-sm text-foreground placeholder:text-muted-foreground/70 shadow-sm"
            />
            <MessageCircleIcon className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 h-4 w-4" />
          </div>
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 h-8 w-8 sm:h-10 sm:w-10 shrink-0"
            disabled={sendingMessage}
          >
            {sendingMessage ? (
              <Loader className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            ) : (
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default ChatInterface
