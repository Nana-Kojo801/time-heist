import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import Header from './-components/Header'
import Footer from './-components/Footer'
import { useAuth } from '@/components/auth-provider'
import { Loader } from 'lucide-react'

export const Route = createFileRoute('/_root-layout')({
  component: RootLayout,
})

function RootLayout() {
  const { loading, authenticated } = useAuth()

  if (loading)
    return (
      <div className="w-screen h-dvh grid place-content-center">
        <Loader className="size-9 animate-spin text-primary" />
      </div>
    )

  if (authenticated) return <Navigate to='/app' />

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
