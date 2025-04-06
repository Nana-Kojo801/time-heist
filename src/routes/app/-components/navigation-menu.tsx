import { motion } from 'framer-motion'
import { Plus, LogIn, UserCircle } from 'lucide-react'
import { MenuItem, type MenuItemProps } from './menu-item'
import { containerVariants } from './app-animations'

export const NavigationMenu = () => {
  const menuItems: MenuItemProps[] = [
    {
      to: '/app/create-room',
      icon: <Plus className="size-6" />,
      label: 'CREATE ROOM',
      color: 'primary',
      description: 'Start a new time heist'
    },
    {
      to: '/app/join-room',
      icon: <LogIn className="size-6" />,
      label: 'JOIN ROOM',
      color: 'secondary',
      description: 'Enter an existing heist'
    },
    {
      to: '/app/profile',
      icon: <UserCircle className="size-6" />,
      label: 'PROFILE',
      color: 'primary',
      description: 'View your stats and achievements'
    }
  ];
  
  return (
    <motion.div 
      className="w-full space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {menuItems.map((item) => (
        <MenuItem 
          key={item.label}
          to={item.to}
          icon={item.icon}
          label={item.label}
          description={item.description}
          color={item.color}
        />
      ))}
    </motion.div>
  )
} 