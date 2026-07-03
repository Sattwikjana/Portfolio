import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '../data/portfolio'
import { scrollToSection } from '../utils/scrollState'
import { Magnetic, EASE } from './ui'

function Typewriter({ words }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const speed = deleting ? 35 : 70
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1)
        setText(next)
        if (next === word) setTimeout(() => setDeleting(true), 1600)
      } else {
        const next = word.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return (
    <span className="typewriter">
      {text}
      <span className="caret" />
    </span>
  )
}

function AnimatedWord({ word, delay, className = '' }) {
  return (
    <span className={`hero-word ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="hero-letter"
          initial={{ y: '110%', rotate: 6 }}
          animate={{ y: '0%', rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const D = 1.7 // entrance delay — waits for the preloader wipe

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D, duration: 0.7, ease: EASE }}
        >
          <span className="pulse-dot" />
          Open to opportunities
          <span className="hero-badge-sep">·</span>
          <MapPin size={12} /> {profile.location}
        </motion.div>

        <h1 className="hero-title">
          <span className="sr-only">{profile.name}</span>
          <AnimatedWord word="SATTWIK" delay={D + 0.1} />
          <AnimatedWord word="JANA" delay={D + 0.45} className="hero-word-outline" />
        </h1>

        <motion.p
          className="hero-roles"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.8, duration: 0.7, ease: EASE }}
        >
          <Typewriter words={profile.roles} />
        </motion.p>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.95, duration: 0.7, ease: EASE }}
        >
          From an empty repo to a <em>live, revenue-generating product</em> — backend,
          frontend, payments, AI, mobile, and the go-to-market. I build worlds and ship them.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 1.1, duration: 0.7, ease: EASE }}
        >
          <Magnetic>
            <button className="btn btn-primary" onClick={() => scrollToSection('#flagship')}>
              Explore my work <ArrowUpRight size={17} />
            </button>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
          </Magnetic>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={19} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={19} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={19} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.button
        className="hero-scroll"
        onClick={() => scrollToSection('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1.6, duration: 1 }}
        aria-label="Scroll down"
      >
        <span>Scroll to explore</span>
        <ArrowDown size={16} className="bounce" />
      </motion.button>
    </section>
  )
}
