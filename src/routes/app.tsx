import { useAuth } from '@/components/auth-provider'
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  const { loading, authenticated } = useAuth()

  if (loading)
    return (
      <div className="w-screen h-dvh grid place-content-center">
        <Loader className="size-9 animate-spin text-primary" />
      </div>
    )

  if (!authenticated) return <Navigate to='/' />

  return <Outlet />
}
