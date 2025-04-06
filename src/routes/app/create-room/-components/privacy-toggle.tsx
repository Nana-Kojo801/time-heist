import { Lock, LockOpen } from "lucide-react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { privacyToggleVariants } from "./animations"

interface PrivacyToggleProps {
  isPrivate: boolean
  setIsPrivate: (value: boolean) => void
}

export function PrivacyToggle({ isPrivate, setIsPrivate }: PrivacyToggleProps) {
  return (
    <motion.div
      variants={privacyToggleVariants}
    >
      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-primary/20 hover:border-primary/40 transition-colors duration-300">
        <div className="flex items-center gap-3">
          {isPrivate ? (
            <Lock className="h-5 w-5 text-primary" />
          ) : (
            <LockOpen className="h-5 w-5 text-muted-foreground" />
          )}
          <div>
            <label>Private Room</label>
            <p className="text-sm text-muted-foreground">
              {isPrivate ? 'Requires password to join' : 'Anyone can join'}
            </p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Switch
            checked={isPrivate}
            onCheckedChange={setIsPrivate}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/50 h-6 w-11 border border-border/50"
          />
        </motion.div>
      </div>
    </motion.div>
  )
} 