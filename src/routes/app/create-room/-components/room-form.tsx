import { z } from "zod"
import { useState } from "react"
import { motion } from "framer-motion"
import { useAppForm } from "@/hooks/form"
import { PrivacyToggle } from "./privacy-toggle"
import { formVariants, fieldVariants, buttonVariants, passwordFieldVariants } from "./animations"

const createRoomSchema = z.object({
  roomName: z.string().min(3, 'Room name must be at least 3 characters'),
  password: z.string().optional(),
})

export function RoomForm() {
  const [isPrivate, setIsPrivate] = useState(false)

  const form = useAppForm({
    defaultValues: {
      roomName: '',
      password: '',
    } as z.infer<typeof createRoomSchema>,
    validators: { onChange: createRoomSchema },
  })

  const handleSubmit = () => {}

  return (
    <motion.form
      variants={formVariants}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6"
    >
      {/* Room Name */}
      <motion.div
        variants={fieldVariants}
      >
        <form.AppField
          name="roomName"
          children={(field) => (
            <field.TextField
              label="Room name"
              placeholder="Operation Midnight"
            />
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
      <motion.div
        variants={buttonVariants}
        className="pt-4"
      >
        <form.AppForm>
          <form.SubscribeButton
            type="submit"
            variant="tertiary"
            className="w-full"
            label="Create Room"
          />
        </form.AppForm>
      </motion.div>
    </motion.form>
  )
} 