import { ArrowUpRight } from 'lucide-react'
import { ventures } from '../data/portfolio'
import { Reveal, TiltCard, SectionHeading } from './ui'

export default function Ventures() {
  return (
    <section className="section ventures" id="ventures">
      <SectionHeading
        index="05"
        eyebrow="Ventures launched"
        title={`Built the site. Owned the <span class="grad">launch</span>.`}
        description="Four more brands shipped at Befach 4X — for each one I built the entire website and owned the marketing, logistics, and go-to-market."
      />

      <div className="venture-grid">
        {ventures.map((v, i) => (
          <Reveal key={v.name} delay={(i % 2) * 0.1}>
            <TiltCard className="venture-card" max={6}>
              <a
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="venture-link"
                style={{ '--venture-accent': v.accent }}
              >
                <div className="venture-top">
                  <span className="venture-index">0{i + 1}</span>
                  <ArrowUpRight size={20} className="venture-arrow" />
                </div>
                <h3>{v.name}</h3>
                <p>{v.desc}</p>
                <div className="venture-tags">
                  {v.tags.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
