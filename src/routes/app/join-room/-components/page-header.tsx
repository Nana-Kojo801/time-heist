import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import BackLink from "@/components/back-link"

export function PageHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="flex items-center mb-8 relative z-10"
    >
      <Link to="/app">
        <BackLink label='JOIN A ROOM' className='text-xl' />
      </Link>
    </motion.div>
  )
} 