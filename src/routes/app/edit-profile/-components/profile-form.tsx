import { z } from "zod"
import { motion } from "framer-motion"
import { useState } from "react"
import { useAppForm } from "@/hooks/form"
import { authSchema } from "@/components/auth-form"
import { AvatarUpload } from "./avatar-upload"
import { SecurityNote } from "./security-note"
import { FormButtons } from "./form-buttons"
import { PageTitle } from "./page-title"
import { containerVariants, itemVariants } from "./animations"

// Mock user data
const currentUser = {
  username: 'TimeJumper',
  avatar: '🕰️',
  email: 'timejumper@example.com',
}

export function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewAvatar, setPreviewAvatar] = useState(currentUser.avatar)

  const form = useAppForm({
    defaultValues: {
      username: '',
      password: '',
    } as z.infer<typeof authSchema>,
    validators: { onChange: authSchema },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Handle successful update
    }, 1500)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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
      <AvatarUpload previewAvatar={previewAvatar} onFileUpload={handleFileUpload} />
      
      <motion.form 
        variants={itemVariants}
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        {/* Username Field */}
        <motion.div 
          variants={itemVariants}
          className="space-y-1"
        >
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

        <motion.div 
          variants={itemVariants}
          className="space-y-1"
        >
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

        <SecurityNote />
        <FormButtons isSubmitting={isSubmitting} />
      </motion.form>
    </motion.div>
  )
} 