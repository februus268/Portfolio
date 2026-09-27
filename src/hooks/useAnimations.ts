import { useEffect, useRef, useState, useCallback } from 'react'

/* ===== Scroll-triggered reveal ===== */
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

/* ===== Mouse parallax ===== */
export function useMouseParallax(intensity = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity
      const y = (e.clientY - window.innerHeight / 2) * intensity
      setPosition({ x, y })
    },
    [intensity]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return position
}

/* ===== Global cursor glow position (desktop only) ===== */
export function useCursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 })

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return pos
}

/* ===== Magnetic hover offset for buttons/links ===== */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      setOffset({ x, y })
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), [])

  return { ref, offset, onMouseMove, onMouseLeave }
}

/* ===== Typewriter effect ===== */
export function useTypewriter(lines: string[], speed = 28, startDelay = 900, active = true) {
  const [output, setOutput] = useState<string[]>([])

  useEffect(() => {
    if (!active) return
    let cancelled = false
    let lineIndex = 0
    let charIndex = 0
    const current: string[] = []

    const typeNext = () => {
      if (cancelled || lineIndex >= lines.length) return
      const line = lines[lineIndex]
      charIndex++
      current[lineIndex] = line.slice(0, charIndex)
      setOutput([...current])

      if (charIndex >= line.length) {
        lineIndex++
        charIndex = 0
        setTimeout(typeNext, 220)
      } else {
        setTimeout(typeNext, speed)
      }
    }

    const timer = setTimeout(typeNext, startDelay)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [lines, speed, startDelay, active])

  return output
}

/* ===== Active section tracker ===== */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
