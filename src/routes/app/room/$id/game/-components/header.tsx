import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { formatTime } from "./utils"
import { itemVariants } from "./animations"
import { useGameUser, useTimer } from "./hooks"

export function Header() {
  const user = useGameUser()
  const timer = useTimer()
  return (
    <motion.div 
      className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-primary/20 bg-card/50 backdrop-blur-md sticky top-0 left-0 z-20"
      variants={itemVariants}
    >
      <div className="flex items-center gap-3">
        <Link to=".." className="group">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary/10 hover:bg-primary/20"
          >
            <ArrowLeft className="text-primary" />
          </Button>
        </Link>
        <motion.h1 
          className="text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Time Heist
        </motion.h1>
        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
          {user.role}
        </Badge>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span className="text-sm">{formatTime(timer)}</span>
      </div>
    </motion.div>
  )
} 