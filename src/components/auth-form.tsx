import { z } from 'zod'
import { useAppForm } from '@/hooks/form'
import { Link } from '@tanstack/react-router'

interface AuthFormProps {
  type?: 'login' | 'signup'
}

export const authSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function AuthForm({
  type = 'signup',
}: AuthFormProps) {
  const form = useAppForm({
    defaultValues: {
      username: '',
      password: '',
    } as z.infer<typeof authSchema>,
    validators: { onChange: authSchema },
  })
  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Username field */}
      <form className="space-y-5">
        <form.AppField
          name="username"
          children={(field) => (
            <field.TextField label="Username" placeholder="Username" />
          )}
        />
        <form.AppField
          name="password"
          children={(field) => (
            <field.TextField label="Password" placeholder="Password" />
          )}
        />
      </form>

      <form.AppForm>
        <form.SubscribeButton
          type="submit"
          size="lg"
          variant="tertiary"
          className="w-full"
          label={type === 'signup' ? 'Sign up' : 'Log in'}
        />
      </form.AppForm>

      {/* Divider */}
      <div className="flex items-center w-full">
        <hr className="flex-1 border-primary" />
        <span className="mx-2 text-muted-foreground text-sm">OR</span>
        <hr className="flex-1 border-primary" />
      </div>

      {/* Alternative action link */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          {type === 'signup'
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <Link
            to={type === 'signup' ? '/auth/login' : '/auth/signup'}
            className="text-primary font-medium cursor-pointer hover:underline"
          >
            {type === 'signup' ? 'Log in' : 'Sign up'}
          </Link>
        </p>
      </div>
    </div>
  )
}
