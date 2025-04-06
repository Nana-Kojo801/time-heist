import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import BackLink from "@/components/back-link"
import { headerVariants } from "./animations"

export function PageHeader() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={headerVariants}
      className="flex items-center mb-8"
    >
      <Link to="/app">
        <BackLink label="CREATE HEIST ROOM" className="text-2xl" />
      </Link>
    </motion.div>
  )
} 