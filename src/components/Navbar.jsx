import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { scrollToSection } from '../utils/scrollState'
import { profile } from '../data/portfolio'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#flagship' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <motion.header
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="nav-logo" onClick={(e) => go(e, '#top')}>
          SJ<span className="accent">.</span>
        </a>
        <nav className="nav-links">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="nav-link">
              <span className="nav-link-index">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="nav-cta"
        >
          Hire me <ArrowUpRight size={15} />
        </a>
        <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={26} />
            </button>
            <nav className="mobile-links">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
                >
                  <span className="mobile-link-index">0{i + 1}</span> {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mobile-menu-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
