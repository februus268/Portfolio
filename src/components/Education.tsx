import { motion } from 'framer-motion'
import { Reveal, SectionHeading, SectionContent } from './ui'
import { useInView } from '../hooks/useAnimations'
import { GraduationCap } from 'lucide-react'

export default function Education() {
  const { ref, isInView } = useInView(0.2)

  return (
    <section id="education" className="portfolio-section relative">
      <SectionContent>
        <Reveal>
          <SectionHeading kicker="Education" title="Academic background" />
        </Reveal>

        <div ref={ref} className="relative max-w-4xl lg:max-w-5xl pl-6 sm:pl-10 md:pl-16">
          {/* Gradient timeline rail */}
          <div
            className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full"
            style={{ background: 'linear-gradient(180deg, var(--color-accent), var(--color-violet))' }}
          />
          <motion.span
            className="absolute -left-[9px] top-6 w-5 h-5 rounded-full border-4 border-bg-primary"
            style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-violet))' }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex items-start gap-4 sm:gap-6 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-bg-surface border border-border transition-all duration-300 hover:border-border-hover shadow-[0_12px_32px_-16px_rgba(0,0,0,0.08)]"
          >
            <div
              className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center shrink-0 shadow-sm"
              style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
            >
              <GraduationCap size={26} />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-bg-subtle text-xs font-mono font-medium text-text-muted mb-2">
                2026 — Present
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mt-1 mb-1.5 sm:mb-2 leading-snug">
                Bachelor of Information Technology
              </h3>
              <p className="text-text-secondary text-sm sm:text-base md:text-lg">
                University of Technology and Education (UTE)
              </p>
            </div>
          </motion.div>
        </div>
      </SectionContent>
    </section>
  )
}
