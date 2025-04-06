import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { popVariants } from './animations'

interface HeaderProps {
  success: boolean
}

export function Header({ success }: HeaderProps) {
  return (
    <motion.div
      className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-primary/20 bg-card/50 backdrop-blur-md sticky top-0 z-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <Link to="/app" className="group">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary/10 hover:bg-primary/20"
          >
            <Home className="text-primary" />
          </Button>
        </Link>
        <motion.h1
          className="text-xl sm:text-2xl font-bold tracking-wide"
          variants={popVariants}
          initial="hidden"
          animate="visible"
        >
          <span
            className={`${
              success
                ? 'bg-gradient-to-r from-primary to-secondary'
                : 'bg-gradient-to-r from-rose-500 to-secondary'
            } bg-clip-text text-transparent`}
          >
            Results
          </span>
        </motion.h1>
      </div>
    </motion.div>
  )
}
