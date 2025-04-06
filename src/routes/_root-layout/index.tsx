import { motion } from 'framer-motion'

import { HeroSection } from './-components/hero-section'
import { FeaturesSection } from './-components/features-section'
import { TeamRolesSection } from './-components/team-roles-section'
import { HowItWorksSection } from './-components/how-it-works-section'
import { CTASection } from './-components/cta-section'
import { FooterSection } from './-components/footer-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout/')({
  component: RouteComponent,
})

// Grid overlay for cyberpunk aesthetic
const GridOverlay = () => (
  <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
    <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />
  </div>
)

export default function RouteComponent() {
  return (
    <motion.div
      className="min-h-screen overflow-x-hidden bg-background relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GridOverlay />

      {/* Background decorative shapes */}
      <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-1/2 h-1/3 bg-secondary/5 rounded-tr-full blur-3xl -z-10" />

      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TeamRolesSection />
        <HowItWorksSection />
        <CTASection />
        <FooterSection />
      </div>
    </motion.div>
  )
}
