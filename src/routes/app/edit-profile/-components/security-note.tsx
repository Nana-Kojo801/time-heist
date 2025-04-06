import { Shield } from "lucide-react"
import { motion } from "framer-motion"
import { itemVariants } from "./animations"

export function SecurityNote() {
  return (
    <motion.div 
      variants={itemVariants}
      className="rounded-md bg-secondary/5 backdrop-blur-sm p-4 border border-secondary/10 flex items-start gap-3"
    >
      <Shield className="w-5 h-5 text-secondary mt-0.5" />
      <div>
        <h4 className="text-sm font-medium text-secondary mb-1">Security Note</h4>
        <p className="text-xs text-foreground/70">
          For security reasons, leave the password field blank if you don't want to change it. All changes will be applied immediately.
        </p>
      </div>
    </motion.div>
  )
} 