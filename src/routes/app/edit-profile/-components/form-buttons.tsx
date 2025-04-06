import { Link } from "@tanstack/react-router"
import { Check, X } from "lucide-react"
import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { itemVariants } from "./animations"

interface FormButtonsProps {
  isSubmitting: boolean
}

export function FormButtons({ isSubmitting }: FormButtonsProps) {
  return (
    <motion.div 
      variants={itemVariants}
      className="flex gap-4 pt-6"
    >
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="flex-1"
      >
        <Button
          type="button"
          variant="outline"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 transition-all duration-300"
          asChild
        >
          <Link to="/app/profile">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Link>
        </Button>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="flex-1"
      >
        <motion.button
          type="submit"
          className={cn(
            'w-full',
            buttonVariants({ 
              variant: 'default',
              className: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90'
            }),
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  )
} 