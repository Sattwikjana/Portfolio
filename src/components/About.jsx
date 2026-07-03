import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { profile, stats, education, interests } from '../data/portfolio'
import { Reveal, TiltCard, Counter, SectionHeading, EASE } from './ui'
import photo from '../assets/sattwik.jpg'

export default function About() {
  return (
    <section className="section about" id="about">
      <SectionHeading
        index="01"
        eyebrow="About me"
        title={`Builder of products<br/>that actually <span class="grad">ship</span>`}
      />

      <div className="about-grid">
        <Reveal className="about-photo-col">
          <TiltCard className="about-photo-card" max={7}>
            <div className="about-photo-frame">
              <img src={photo} alt="Sattwik Jana" className="about-photo" />
              <div className="about-photo-scan" />
            </div>
            <motion.span
              className="float-chip chip-a"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ⚡ Full-Stack
            </motion.span>
            <motion.span
              className="float-chip chip-b"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              🤖 AI / LLM
            </motion.span>
            <motion.span
              className="float-chip chip-c"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            >
              🚀 GTM
            </motion.span>
          </TiltCard>
        </Reveal>

        <div className="about-content">
          <Reveal delay={0.1}>
            <p className="about-lede">{profile.summary}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="about-body">
              Into <strong>AI agents</strong> (tool-calling LLM assistants & automation bots),{' '}
              <strong>payment money-safety</strong>, and <strong>performance</strong>. Not just
              code — I own marketing strategy, logistics, and market-entry for what I build.
              Building the site is half the job; getting it to customers profitably is the
              other half — and I've done both.
            </p>
          </Reveal>

          <div className="stats-grid">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div className="stat-card">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                  <p>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="edu-list">
              {education.map((e, i) => (
                <motion.div
                  className="edu-item"
                  key={e.school}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
                >
                  <span className="edu-icon"><GraduationCap size={16} /></span>
                  <div>
                    <strong>{e.degree}</strong> — {e.school}
                    <span className="edu-meta">{e.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="interest-chips">
              {interests.map((it) => (
                <span className="chip" key={it}>{it}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
