import { createFileRoute } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { DecorativeBackground } from "./-components/decorative-background"
import { Header } from "./-components/header"
import { TeamSummary } from "./-components/team-summary"
import { PlayerCard } from "./-components/player-card"
import { Rewards } from "./-components/rewards"
import { Navigation } from "./-components/navigation"
import { playerResults, teamResult, rewards } from "./-components/mock-data"
import { containerVariants } from "./-components/animations"

export const Route = createFileRoute('/app/room/$id/results/')({
  component: ResultsPage,
})

function ResultsPage() {
  const { id: gameId } = Route.useParams();
  
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <DecorativeBackground success={teamResult.success} />
      
      <div className="relative z-10">
        <Header success={teamResult.success} />
        
        <motion.div 
          className="container max-w-4xl mx-auto px-4 py-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TeamSummary result={teamResult} />
          
          <Rewards rewards={rewards} success={teamResult.success} />
          
          <motion.div className="space-y-2" variants={containerVariants}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Player Performance</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playerResults.map((player, index) => (
                <PlayerCard 
                  key={player.id} 
                  player={player}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
          
          <Navigation gameId={gameId} />
        </motion.div>
      </div>
    </div>
  )
}
