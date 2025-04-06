import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from './-components/Header'
import Footer from './-components/Footer'

export const Route = createFileRoute('/_root-layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
