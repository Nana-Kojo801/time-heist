import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { motion } from "framer-motion"
import { itemVariants } from "./animations"

interface AvatarUploadProps {
  previewAvatar: string
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AvatarUpload({ previewAvatar, onFileUpload }: AvatarUploadProps) {
  return (
    <motion.div 
      variants={itemVariants}
      className="mb-10 flex flex-col items-center"
    >
      <Label className="block text-sm font-medium mb-4 text-foreground/90">
        Profile Picture
      </Label>
      <div className="relative group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
          <Avatar className="w-32 h-32 border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 relative z-10">
            <AvatarImage
              src={
                typeof previewAvatar === 'string' &&
                previewAvatar.startsWith('data:')
                  ? previewAvatar
                  : undefined
              }
            />
            <AvatarFallback className="text-5xl bg-card/80 backdrop-blur-sm">
              {typeof previewAvatar === 'string' &&
              !previewAvatar.startsWith('data:')
                ? previewAvatar
                : '🕰️'}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        <motion.label
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(10, 255, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="absolute -bottom-3 -right-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-3 rounded-full cursor-pointer shadow-lg transition-all"
        >
          <Upload className="w-5 h-5" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onFileUpload}
          />
        </motion.label>
      </div>
    </motion.div>
  )
} 