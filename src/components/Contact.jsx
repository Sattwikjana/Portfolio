import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, ArrowUpRight, ArrowUp } from 'lucide-react'
import { profile } from '../data/portfolio'
import { Reveal, Magnetic, EASE } from './ui'
import { lenisRef } from '../utils/scrollState'

export default function Contact() {
  const backToTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact-inner">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-index">08</span>
            <span className="eyebrow-line" />
            What's next
          </p>
        </Reveal>

        <motion.h2
          className="contact-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.09 }}
        >
          {['Let’s build something', 'that ships.'].map((line, li) => (
            <span className="contact-line" key={li}>
              {line.split(' ').map((w, wi) => (
                <motion.span
                  key={wi}
                  className="contact-word"
                  variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  {w}&nbsp;
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h2>

        <Reveal delay={0.25}>
          <p className="contact-sub">{profile.currently}</p>
        </Reveal>

        <Reveal delay={0.35}>
          <Magnetic strength={0.25}>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight size={26} />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="contact-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={17} /> LinkedIn
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
              <Phone size={17} /> {profile.phone}
            </a>
            <a href={profile.liveWork} target="_blank" rel="noreferrer">
              <Mail size={17} /> globalshopper.in
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name} — designed & built from scratch.
        </p>
        <p className="footer-stack">React · Three.js · Framer Motion · one particle planet 🪐</p>
        <button className="back-top" onClick={backToTop} aria-label="Back to top">
          <ArrowUp size={17} />
        </button>
      </footer>
    </section>
  )
}
