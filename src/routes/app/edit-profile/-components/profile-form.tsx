import { z } from 'zod'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useAppForm } from '@/hooks/form'
import { authSchema } from '@/components/auth-form'
import { AvatarUpload } from './avatar-upload'
import { FormButtons } from './form-buttons'
import { PageTitle } from './page-title'
import { containerVariants, itemVariants } from './animations'
import { useAuth, useAuthUser } from '@/components/auth-provider'

export function ProfileForm() {
  const user = useAuthUser()
  const { updateProfile } = useAuth()
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar)
  const avatarFile = useRef<File | null>(null)

  const form = useAppForm({
    defaultValues: {
      username: user.username,
      password: user.password,
    } as z.infer<typeof authSchema>,
    validators: { onChange: authSchema },
    onSubmit: async ({ value: values }) => {
      if (
        values.username === user.username &&
        values.password === user.password &&
        !avatarFile.current
      )
        return
      await updateProfile({ ...values, avatar: avatarFile.current })
    },
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      avatarFile.current = file
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewAvatar(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md"
    >
      <PageTitle />
      <AvatarUpload
        username={user.username}
        previewAvatar={previewAvatar}
        onFileUpload={handleFileUpload}
      />

      <motion.form
        variants={itemVariants}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        {/* Username Field */}
        <motion.div variants={itemVariants} className="space-y-1">
          <div className="relative">
            <form.AppField
              name="username"
              children={(field) => (
                <field.TextField
                  label="Username"
                  placeholder="Username"
                  className="bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary/50"
                />
              )}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1">
          <div className="relative">
            <form.AppField
              name="password"
              children={(field) => (
                <field.TextField
                  label="Password"
                  placeholder="Password"
                  className="bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary/50"
                />
              )}
            />
          </div>
        </motion.div>

        <FormButtons isSubmitting={form.state.isSubmitting} />
      </motion.form>
    </motion.div>
  )
}
