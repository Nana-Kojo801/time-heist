import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

// Animation variants
const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const linkVariants = {
  hover: {
    scale: 1.1,
    color: "rgb(var(--primary))",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

export const FooterSection = () => {
  return (
    <motion.footer
      className="bg-card/50 backdrop-blur-md border-t border-border/40 py-8"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <motion.div 
                className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary"
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              />
              <span className="text-xl font-bold">Time Heist</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              A real-time multiplayer heist game where timing and coordination are everything.
              Plan your moves, execute with precision, and escape with the rewards.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tutorial">
                  <motion.span 
                    className="text-muted-foreground hover:text-foreground text-sm"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    How to Play
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link to="/auth/login">
                  <motion.span
                    className="text-muted-foreground hover:text-foreground text-sm"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    Login
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link to="/auth/signup">
                  <motion.span
                    className="text-muted-foreground hover:text-foreground text-sm"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    Sign Up
                  </motion.span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex space-x-3">
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Time Heist. All rights reserved.
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop",
                duration: 1.5,
                ease: "easeInOut" 
              }}
              className="inline-block mx-1 text-red-500"
            >
              <Heart size={12} />
            </motion.div>
            <span>and React</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
} 