import { motion } from 'framer-motion'
import {
  Server, ShieldCheck, CreditCard, Bot, BarChart3, Zap, ArrowUpRight, Globe,
} from 'lucide-react'
import { flagship } from '../data/portfolio'
import { Reveal, TiltCard, SectionHeading, Magnetic } from './ui'

const ICONS = {
  server: Server,
  shield: ShieldCheck,
  card: CreditCard,
  bot: Bot,
  chart: BarChart3,
  zap: Zap,
}

export default function Flagship() {
  return (
    <section className="section flagship" id="flagship">
      <SectionHeading
        index="04"
        eyebrow="Flagship work"
        title={`Global <span class="grad">Shopper</span>`}
        description={flagship.pitch}
      />

      <Reveal>
        <TiltCard className="browser-card" max={4}>
          <div className="browser-bar">
            <span className="browser-dot red" />
            <span className="browser-dot yellow" />
            <span className="browser-dot green" />
            <div className="browser-url">
              <Globe size={12} /> globalshopper.in
            </div>
            <span className="browser-live">
              <span className="pulse-dot" /> LIVE
            </span>
          </div>
          <div className="browser-body">
            <div className="browser-glow" />
            <div className="browser-hero">
              <p className="browser-kicker">Cross-border B2C marketplace</p>
              <h3>
                2M+ products.<br />All-inclusive INR pricing.<br />10–15 day delivery.
              </h3>
              <p className="browser-sub">
                Hand-built. No Shopify. No framework. One developer.
              </p>
              <Magnetic>
                <a
                  className="btn btn-primary"
                  href={flagship.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit the live store <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </div>
          </div>
        </TiltCard>
      </Reveal>

      <div className="feature-grid">
        {flagship.features.map((f, i) => {
          const Icon = ICONS[f.icon] || Zap
          return (
            <Reveal key={f.title} delay={(i % 3) * 0.09}>
              <TiltCard className="feature-card" max={6}>
                <span className="feature-icon"><Icon size={19} /></span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="stack-pills">
          {flagship.stack.map((s, i) => (
            <motion.span
              className="chip chip-stack"
              key={s}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
