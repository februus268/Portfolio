import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useCursorGlow } from './hooks/useAnimations'

/* ===== Entrance Loader ===== */
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col items-center gap-4"
      >
        <span className="font-display font-semibold text-xl text-text-primary tracking-tight">
          Ngô Võ Công Quyến
        </span>
        <motion.div
          className="w-10 h-0.5 rounded-full origin-left"
          style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-violet))' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ===== Ambient background: blobs, grain dots, cursor glow ===== */
function AmbientBackground() {
  const cursor = useCursorGlow()

  return (
    <>
      <div className="ambient-bg">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />
      </div>
      <motion.div
        className="cursor-glow"
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 25, mass: 0.4 }}
      />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AmbientBackground />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  )
}
