import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { DecorativeBackground } from './-components/decorative-background'
import { PageHeader } from './-components/page-header'
import { ProfileForm } from './-components/profile-form'

export const Route = createFileRoute('/app/edit-profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden"
    >
      <DecorativeBackground />
      <PageHeader />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 overflow-y-auto z-10">
        <ProfileForm />
      </div>
    </motion.div>
  )
}
