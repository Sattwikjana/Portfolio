import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

// Fade-up on scroll into view
export function Reveal({ children, delay = 0, y = 44, className, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// Perspective tilt that follows the cursor, with a moving glare highlight
export function TiltCard({ children, className = '', max = 9, glare = true }) {
  const ref = useRef(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * 2 * max)
    rx.set(-(py - 0.5) * 2 * max)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${glare ? 'tilt-glare' : ''} ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

// Element that leans toward the cursor
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

// Animated number that counts up when scrolled into view
export function Counter({ value, suffix = '', decimals = 0, duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setDisplay((value * eased).toFixed(decimals))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, decimals, duration])

  return (
    <span ref={ref} className="counter">
      {display}
      <span className="counter-suffix">{suffix}</span>
    </span>
  )
}

// Eyebrow label + big title used at the top of every section
export function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-index">{index}</span>
          <span className="eyebrow-line" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="section-desc">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
