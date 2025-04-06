import { motion } from "framer-motion"
import { Users, Target, Clock, Award, Zap } from "lucide-react"
import type { TeamResult } from "./types"
import { itemVariants } from "./animations"

interface TeamSummaryProps {
  result: TeamResult
}

export function TeamSummary({ result }: TeamSummaryProps) {
  return (
    <motion.div 
      className="bg-card/80 backdrop-blur-sm rounded-lg p-5 border border-primary/20 shadow-md"
      variants={itemVariants}
      custom={0}
    >
      <div className="flex items-center gap-3 mb-4">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-semibold">Team Summary</h2>
      </div>
      
      <div className="bg-background/50 rounded-md p-3 mb-4 flex items-center justify-between">
        <span className="font-medium">Team Score</span>
        <motion.div
          className="flex items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Zap className="h-5 w-5 mr-2 text-amber-400" />
          <span className="text-2xl font-bold text-amber-400">{result.points}</span>
        </motion.div>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className={`font-medium ${result.success ? 'text-green-500' : 'text-rose-500'}`}>
              {result.success ? 'Success' : 'Failed'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center">
              <Target className="h-4 w-4 mr-1 text-primary" /> Accuracy
            </span>
            <span className="font-medium">{result.accuracy}%</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1 text-blue-400" /> Time
            </span>
            <span className="font-medium">{result.timeCompleted}s</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Windows</span>
            <span className="font-medium">{result.hits}/{result.totalWindows}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center">
              <Award className="h-4 w-4 mr-1 text-amber-400" /> Percentile
            </span>
            <span className="font-medium">Top {result.percentile}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 