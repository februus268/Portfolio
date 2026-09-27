import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useAnimations'

interface SectionHeadingProps {
  kicker: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ kicker, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div
      className={`mb-20 md:mb-28 ${align === 'left' ? 'max-w-3xl' : ''}`}
      style={align === 'center' ? { textAlign: 'center', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' } : undefined}
    >
      <span
        className="kicker mb-6"
        style={align === 'center' ? { justifyContent: 'center' } : undefined}
      >
        {kicker}
      </span>
      <h2 className="font-display text-[2.5rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p
          className="mt-6 text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl"
          style={align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : undefined}
        >
          {description}
        </p>
      )}
    </div>
  )
}

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
}

export function Reveal({ children, delay = 0, className = '', direction = 'up' }: RevealProps) {
  const { ref, isInView } = useInView(0.12)

  const directionMap = {
    up: { y: 30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
  }

  const offset = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Clip-path reveal, for images / visual panels */
export function RevealImage({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, isInView } = useInView(0.15)

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(8% 8% 8% 8% round 16px)', opacity: 0, scale: 1.04 }}
      animate={
        isInView
          ? { clipPath: 'inset(0% 0% 0% 0% round 16px)', opacity: 1, scale: 1 }
          : { clipPath: 'inset(8% 8% 8% 8% round 16px)', opacity: 0, scale: 1.04 }
      }
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
