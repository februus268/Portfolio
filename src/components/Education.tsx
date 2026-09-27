import { motion } from 'framer-motion'
import { Reveal, SectionHeading } from './ui'
import { useInView } from '../hooks/useAnimations'
import { GraduationCap } from 'lucide-react'

export default function Education() {
  const { ref, isInView } = useInView(0.2)

  return (
    <section id="education" className="section-py relative">
      <div className="container-wide">
        <Reveal>
          <SectionHeading kicker="Education" title="Academic background" />
        </Reveal>

        <div ref={ref} className="relative max-w-3xl pl-10 md:pl-14">
          {/* Gradient timeline rail */}
          <div
            className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full"
            style={{ background: 'linear-gradient(180deg, var(--color-accent), var(--color-violet))' }}
          />
          <motion.span
            className="absolute -left-[9px] top-1 w-5 h-5 rounded-full border-4 border-bg-primary"
            style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-violet))' }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex items-start gap-5"
          >
            <div
              className="hidden sm:flex w-12 h-12 rounded-xl items-center justify-center shrink-0"
              style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
            >
              <GraduationCap size={22} />
            </div>
            <div>
              <span className="font-mono text-sm text-text-muted">2026 — Present</span>
              <h3 className="font-display text-2xl md:text-4xl font-semibold text-text-primary mt-3 mb-3 leading-snug">
                Bachelor of Information Technology
              </h3>
              <p className="text-text-secondary text-base md:text-lg">
                University of Technology and Education (UTE)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
