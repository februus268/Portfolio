import { motion } from 'framer-motion'
import { SectionHeading, Reveal, SectionContent } from './ui'
import { useInView } from '../hooks/useAnimations'

const focusAreas = [
  { label: 'Programming', detail: 'C++ and Python foundations', color: 'var(--color-accent)', rotate: -2 },
  { label: 'Software development', detail: 'React, TypeScript, modern tooling', color: 'var(--color-indigo)', rotate: 1.5 },
  { label: 'Algorithms', detail: 'Data structures, problem solving, SQL', color: 'var(--color-violet)', rotate: -1 },
]

function FocusChip({ item, index }: { item: (typeof focusAreas)[number]; index: number }) {
  const { ref, isInView } = useInView(0.2)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 16 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
      style={{ rotate: item.rotate }}
      className="group relative overflow-hidden px-5 py-6 sm:px-8 sm:py-7 md:px-9 md:py-8 rounded-2xl bg-bg-surface border border-border transition-colors duration-300 flex flex-col items-center justify-center text-center shadow-sm"
    >
      {/* Decorative hover glow — small, contained, always behind text */}
      <div
        className="absolute -top-16 -right-16 z-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none"
        style={{ background: item.color }}
      />
      <span
        className="absolute inset-0 z-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderColor: item.color }}
      />
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
        <p className="font-display text-base sm:text-lg md:text-xl font-semibold text-text-primary mb-2 text-center">{item.label}</p>
        <p className="text-xs sm:text-sm md:text-[15px] text-text-muted leading-relaxed text-center">{item.detail}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="portfolio-section relative">
      <SectionContent>
        <Reveal>
          <SectionHeading kicker="About" title="Who I am" />
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 sm:gap-10 lg:gap-16">
          <Reveal>
            <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-[1.38] text-text-primary">
              I'm a first-year IT student at UTE, focused on building a strong foundation in{' '}
              <span className="text-gradient">programming, algorithms, databases</span>, and software development.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 sm:space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
              <p>
                I enjoy solving problems, learning new technologies, and turning ideas
                into practical software projects.
              </p>
              <p>
                Currently, I'm developing my skills through personal projects,
                competitive programming practice, and hands-on software development.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="focus-chips-gap grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl mx-auto">
          {focusAreas.map((item, i) => (
            <FocusChip key={item.label} item={item} index={i} />
          ))}
        </div>
      </SectionContent>
    </section>
  )
}
