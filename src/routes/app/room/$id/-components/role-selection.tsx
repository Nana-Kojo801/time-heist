import { Shield } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { containerVariants, itemVariants } from "./animations"
import { roleDetails, type RoleKey } from "./role-details"
import { useRoom } from "../../-utils"

interface RoleSelectionProps {
  selectedRole: string
  setSelectedRole: (role: RoleKey) => void
}

export function RoleSelection({ selectedRole, setSelectedRole }: RoleSelectionProps) {
  const room = useRoom()
  return (
    <motion.div 
      variants={itemVariants}
      className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden"
    >
      {/* Decorative top/bottom borders */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
      
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-primary">Select Role</h2>
      </div>
      <motion.div 
        className="grid grid-cols-1 gap-4"
        variants={containerVariants}
      >
        {Object.entries(roleDetails).map(([role, details]) => {
          const isAvailable = !room.members.some(p => p.role === role);
          
          return (
            <motion.div 
              key={role}
              variants={itemVariants}
              whileHover={{ scale: isAvailable ? 1.02 : 1, x: isAvailable ? 5 : 0 }}
              whileTap={isAvailable ? { scale: 0.98 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button
                className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all ${
                  selectedRole === role
                    ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30'
                    : isAvailable
                      ? 'bg-card/30 border border-primary/10 hover:border-primary/20'
                      : 'bg-card/10 border border-primary/5 opacity-60'
                }`}
                onClick={() => isAvailable && setSelectedRole(role as RoleKey)}
                disabled={!isAvailable}
              >
                <div className={`p-3 rounded-full ${
                  selectedRole === role
                    ? 'bg-primary/20'
                    : 'bg-card/50'
                }`}>
                  {details.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${selectedRole === role ? 'text-primary' : ''}`}>
                    {role}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {details.description}
                  </div>
                </div>
                {!isAvailable && (
                  <Badge className="bg-card/50 text-muted-foreground border-muted/10 text-xs">
                    Taken
                  </Badge>
                )}
                {selectedRole === role && (
                  <div className="h-3 w-3 rounded-full bg-primary" />
                )}
              </button>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div 
        className="mt-6"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          className="w-full py-6 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          onClick={() => {
            /* TODO: Toggle ready status */
          }}
          disabled={!selectedRole}
        >
          Ready Up
        </Button>
      </motion.div>
    </motion.div>
  )
} 