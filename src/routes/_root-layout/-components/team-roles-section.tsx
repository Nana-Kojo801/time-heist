import { motion } from 'framer-motion'
import { Crown, Eye, Lock, Radio, Wrench } from 'lucide-react'
import { staggerContainer } from './animations'
import { RoleCard } from './role-card'

export const TeamRolesSection = () => {
  const roles = [
    { 
      icon: <Crown className="h-5 w-5 text-primary" />,
      title: "Leader",
      description: "Coordinates the team and makes strategic decisions about when to attempt time windows.",
      ability: "Can start the game"
    },
    { 
      icon: <Eye className="h-5 w-5 text-primary" />,
      title: "Lookout",
      description: "Monitors security systems and alerts the team about potential threats.",
      ability: "Can detect security patterns"
    },
    { 
      icon: <Wrench className="h-5 w-5 text-primary" />,
      title: "Technician",
      description: "Hacks security systems and provides technical support to the team.",
      ability: "Can bypass security measures"
    },
    { 
      icon: <Lock className="h-5 w-5 text-primary" />,
      title: "Safecracker",
      description: "Specializes in cracking the vault's security code at the perfect moment.",
      ability: "Has enhanced timing precision"
    },
    { 
      icon: <Radio className="h-5 w-5 text-primary" />,
      title: "Disruptor",
      description: "Creates distractions and can temporarily disable security systems.",
      ability: "Can create time windows"
    }
  ]

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Team Roles</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each player has a unique role with specific responsibilities and
            abilities.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {roles.map((role, index) => (
            <RoleCard 
              key={index}
              icon={role.icon}
              title={role.title}
              description={role.description}
              ability={role.ability}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
} 