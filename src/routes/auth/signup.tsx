import { createFileRoute } from '@tanstack/react-router'
import AuthForm from '@/components/auth-form'

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthForm type="signup" />
  )
}
