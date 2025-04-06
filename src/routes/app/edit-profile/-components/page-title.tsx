import { motion } from "framer-motion"
import { itemVariants } from "./animations"

export function PageTitle() {
  return (
    <motion.div 
      variants={itemVariants}
      className="text-center mb-8"
    >
      <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
        Edit Your Profile
      </h1>
      <p className="text-foreground/70">
        Update your account details and avatar
      </p>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "8rem" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-1 w-32 mt-2 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full"
      />
    </motion.div>
  )
} 