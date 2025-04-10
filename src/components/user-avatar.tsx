import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type UserAvtarProps = {
  src: string
  username: string
  className: string
}

const UserAvtar = ({ src, username, className }: UserAvtarProps) => {
  return (
    <Avatar
      className={cn(
        'w-32 h-32 border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 relative z-10',
        className,
      )}
    >
      <AvatarImage src={src} className="object-cover object-center" />
      <AvatarFallback className="text-lg bg-card/80 backdrop-blur-sm">
        {username.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvtar
