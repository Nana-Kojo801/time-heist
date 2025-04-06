import { motion } from 'framer-motion'
import { Shield, Target, Sparkles } from 'lucide-react'
import type { ReactElement } from 'react'

type DecorativeIconProps = {
  icon: ReactElement;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotation: number;
  animationDelay: number;
}

const DecorativeIcon = ({ 
  icon, 
  top, 
  bottom, 
  left, 
  right, 
  rotation, 
  animationDelay 
}: DecorativeIconProps) => (
  <motion.div
    className="absolute"
    style={{
      top,
      bottom,
      left,
      right,
    }}
    initial={{ opacity: 0, rotate: rotation, scale: 0.8 }}
    animate={{ 
      opacity: 0.8, 
      rotate: [rotation - 5, rotation + 5, rotation - 5],
      y: [0, -8, 0],
      scale: [0.8, 1, 0.8]
    }}
    transition={{ 
      duration: 8, 
      delay: animationDelay, 
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
  >
    {icon}
  </motion.div>
)

export const DecorativeIcons = () => {
  const icons = [
    { icon: <Shield className="size-14 text-primary/20" />, top: '10%', right: '15%', rotation: -15, animationDelay: 0 },
    { icon: <Target className="size-10 text-secondary/20" />, bottom: '20%', left: '12%', rotation: 20, animationDelay: 1 },
    { icon: <Sparkles className="size-8 text-primary/20" />, top: '25%', left: '22%', rotation: 5, animationDelay: 2 },
  ];

  return (
    <>
      {icons.map((item, index) => (
        <DecorativeIcon
          key={index}
          icon={item.icon}
          top={item.top}
          bottom={item.bottom}
          left={item.left}
          right={item.right}
          rotation={item.rotation}
          animationDelay={item.animationDelay}
        />
      ))}
    </>
  )
} 