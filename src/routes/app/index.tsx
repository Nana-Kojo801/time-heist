import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

// Import modular components
import { DecorativeBackground } from './-components/decorative-background'
import { DecorativeIcons } from './-components/decorative-icons'
import { AppLogo } from './-components/app-logo'
import { NavigationMenu } from './-components/navigation-menu'
import { FooterText } from './-components/footer-text'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 bg-background text-foreground overflow-hidden relative">
      {/* Background elements */}
      <DecorativeBackground />

      {/* Decorative icons */}
      <DecorativeIcons />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col items-center relative z-10"
      >
        {/* Logo & Title */}
        <AppLogo />

        {/* Menu Options */}
        <NavigationMenu />

        {/* Footer */}
        <FooterText />
      </motion.div>
    </div>
  )
}
