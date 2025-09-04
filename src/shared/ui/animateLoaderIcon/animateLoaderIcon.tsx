import type React from 'react'
import { Loader } from 'lucide-react'
import { motion } from 'motion/react'

export function AnimateLoaderIcon() {
  const InfiniteSpin = ({ children }: { children: React.ReactNode }) => (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )

  return (
    <InfiniteSpin>
      <Loader className="text-yellow-300" />
    </InfiniteSpin>
  )
}
