// Animation variants for reuse across components
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

export const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export const pulseGlow = {
  initial: { boxShadow: '0 0 0 rgba(124, 58, 237, 0)' },
  animate: {
    boxShadow: ['0 0 5px rgba(124, 58, 237, 0.2)', '0 0 20px rgba(124, 58, 237, 0.6)', '0 0 5px rgba(124, 58, 237, 0.2)'],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
}

export const cardHoverEffect = {
  rest: { 
    scale: 1,
    y: 0,
    borderColor: 'rgba(124, 58, 237, 0.2)',
    boxShadow: '0 0 0 rgba(124, 58, 237, 0.0)'
  },
  hover: { 
    scale: 1.02, 
    y: -5,
    borderColor: 'rgba(124, 58, 237, 0.6)',
    boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
} 