import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { celebrationVariants } from "./animations"
import React from "react";

interface ConfettiProps {
  success: boolean
}

// Create a single confetti piece
function ConfettiPiece({ delay, left }: { delay: number, left: string }) {
  const colors = ["#FF5252", "#FFD740", "#64FFDA", "#448AFF", "#E040FB", "#69F0AE"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const size = Math.floor(Math.random() * 8) + 6; // Between 6px and 14px
  
  return (
    <motion.div
      className="absolute"
      style={{
        left,
        top: "-30px",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: randomColor,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      }}
      initial={{ y: 0, opacity: 1, rotate: 0 }}
      animate={{
        y: `calc(100vh + ${size}px)`,
        opacity: [1, 1, 0.8, 0.4, 0],
        rotate: Math.random() > 0.5 ? 360 : -360,
        x: Math.random() > 0.5 ? "100px" : "-100px",
      }}
      transition={{
        duration: Math.random() * 2 + 2, // Between 2-4 seconds
        delay,
        ease: "easeOut",
      }}
    />
  )
}

export function Confetti({ success }: ConfettiProps) {
  const [pieces, setPieces] = useState<React.JSX.Element[]>([]);
  
  useEffect(() => {
    if (!success) return;
    
    // Generate confetti pieces only if mission was successful
    const confettiPieces: React.JSX.Element[] = [];
    const totalPieces = 150;
    
    for (let i = 0; i < totalPieces; i++) {
      const delay = Math.random() * 5; // Staggered start
      const left = `${Math.random() * 100}%`;
      
      confettiPieces.push(
        <ConfettiPiece key={i} delay={delay} left={left} />
      );
    }
    
    setPieces(confettiPieces);
    
    // Clean up after animation finishes
    const timeout = setTimeout(() => {
      setPieces([]);
    }, 10000);
    
    return () => clearTimeout(timeout);
  }, [success]);
  
  if (!success) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces}
      
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-9xl"
        variants={celebrationVariants}
        initial="hidden"
        animate="visible"
      >
        🎉
      </motion.div>
    </div>
  )
} 