import { z } from 'zod'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppForm } from '@/hooks/form'
import { PrivacyToggle } from './privacy-toggle'
import {
  formVariants,
  fieldVariants,
  buttonVariants,
  passwordFieldVariants,
} from './animations'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { toast } from 'sonner'
import { useAuthUser } from '@/components/auth-provider'
import { useNavigate } from '@tanstack/react-router'

const createRoomSchema = z.object({
  roomName: z.string().min(3, 'Room name must be at least 3 characters'),
  password: z.string().optional(),
})

export function RoomForm() {
  const user = useAuthUser()
  const [isPrivate, setIsPrivate] = useState(false)
  const createRoom = useMutation(api.rooms.create)
  const navigate = useNavigate()

  const form = useAppForm({
    defaultValues: {
      roomName: '',
      password: '',
    } as z.infer<typeof createRoomSchema>,
    validators: { onChange: createRoomSchema },
    onSubmit: async ({ value: values }) => {
      try {
        if (isPrivate && !values.password)
          return toast.error('Password is required for a private room', {
            duration: 2000,
          })
        const { roomId } = await createRoom({
          name: values.roomName,
          password: values.password,
          ownerId: user._id,
          private: isPrivate,
          username: user.username,
          avatar: user.avatar,
        })
        navigate({ to: '/app/room/$id', params: { id: roomId } })
      } catch (e) {
        toast.error((e as Error).message, { duration: 2000 })
      }
    },
  })

  return (
    <motion.form
      variants={formVariants}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="max-w-md mx-auto space-y-6"
    >
      {/* Room Name */}
      <motion.div variants={fieldVariants}>
        <form.AppField
          name="roomName"
          children={(field) => (
            <field.TextField label="Room name" placeholder="Enter name..." />
          )}
        />
      </motion.div>

      {/* Privacy Toggle */}
      <PrivacyToggle isPrivate={isPrivate} setIsPrivate={setIsPrivate} />

      {/* Password Field (conditionally shown) */}
      {isPrivate && (
        <motion.div
          variants={passwordFieldVariants}
          initial="initial"
          animate="animate"
          className="overflow-hidden"
        >
          <form.AppField
            name="password"
            children={(field) => (
              <div className="relative">
                <field.TextField
                  label="Password"
                  placeholder="Enter password"
                />
              </div>
            )}
          />
        </motion.div>
      )}

      {/* Create Button */}
      <motion.div variants={buttonVariants} className="pt-4">
        <form.AppForm>
          <form.SubscribeButton
            type="submit"
            variant="tertiary"
            className="w-full"
            disabled={form.state.isSubmitting}
          >
            {form.state.isSubmitting ? 'Creating...' : 'Create room'}
          </form.SubscribeButton>
        </form.AppForm>
      </motion.div>
    </motion.form>
  )
}
