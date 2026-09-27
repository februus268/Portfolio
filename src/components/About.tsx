import { motion } from 'framer-motion'
import { SectionHeading, Reveal } from './ui'
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
      className="group relative overflow-hidden px-6 py-5 md:px-7 md:py-6 rounded-2xl bg-bg-surface border border-border transition-colors duration-300"
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
      <div className="relative z-10">
        <p className="font-display text-lg md:text-xl font-semibold text-text-primary mb-2">{item.label}</p>
        <p className="text-sm md:text-[15px] text-text-muted leading-relaxed">{item.detail}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-py relative">
      <div className="container-wide">
        <Reveal>
          <SectionHeading kicker="About" title="Who I am" />
        </Reveal>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-24">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl leading-[1.4] text-text-primary">
              I'm a first-year IT student at UTE, focused on building a strong foundation in{' '}
              <span className="text-gradient">programming, algorithms, databases</span>, and software development.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-7 text-text-secondary text-lg leading-relaxed">
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

        <div className="focus-chips-gap grid sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
          {focusAreas.map((item, i) => (
            <FocusChip key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
