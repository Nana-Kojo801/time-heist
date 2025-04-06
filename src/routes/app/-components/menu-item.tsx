import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { ReactElement } from 'react'
import { menuItemVariants } from './app-animations'

export type MenuItemProps = {
  to: string;
  icon: ReactElement;
  label: string;
  description: string;
  color: 'primary' | 'secondary';
}

export const MenuItem = ({ to, icon, label, description, color }: MenuItemProps) => {
  return (
    <motion.div
      variants={menuItemVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Link
        to={to}
        className="w-full block"
      >
        <motion.div 
          className={`w-full h-20 rounded-xl text-xl font-medium tracking-wide transition-all border backdrop-blur-sm relative overflow-hidden
            ${color === 'primary' 
              ? 'border-primary/30 shadow-lg shadow-primary/10' 
              : 'border-secondary/30 shadow-lg shadow-secondary/10'
            }
          `}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 opacity-20 
              ${color === 'primary' 
                ? 'bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0' 
                : 'bg-gradient-to-r from-secondary/0 via-secondary/20 to-secondary/0'
              }
            `} />
          </div>
          
          {/* Border highlight */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-lg ${
                  color === 'primary'
                    ? 'bg-gradient-to-br from-primary to-primary/80'
                    : 'bg-gradient-to-br from-secondary to-secondary/80'
                } shadow-lg`}
              >
                {icon}
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold">{label}</span>
                <span className="text-xs text-muted-foreground mt-1">{description}</span>
              </div>
            </div>
            <div
              className={`${
                color === 'primary'
                  ? 'text-primary'
                  : 'text-secondary'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
} 