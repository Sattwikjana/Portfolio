import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let raf
    const start = performance.now()
    const total = 1500
    const tick = (now) => {
      const t = Math.min((now - start) / total, 1)
      setCount(Math.floor(t * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setGone(true)
          onDone?.()
        }, 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-inner">
            <motion.div
              className="preloader-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              SJ<span className="accent">.</span>
            </motion.div>
            <div className="preloader-bar">
              <motion.div className="preloader-fill" style={{ width: `${count}%` }} />
            </div>
            <div className="preloader-meta">
              <span>Initializing world</span>
              <span className="preloader-count">{count}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
