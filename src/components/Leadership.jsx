import { Users, Trophy, BadgeCheck } from 'lucide-react'
import { leadership, achievements, certifications } from '../data/portfolio'
import { Reveal, TiltCard, SectionHeading } from './ui'

export default function Leadership() {
  return (
    <section className="section leadership" id="leadership">
      <SectionHeading
        index="07"
        eyebrow="Beyond the code"
        title={`Leadership & <span class="grad">wins</span>`}
      />

      <div className="leadership-grid">
        <div className="leadership-col">
          <Reveal>
            <h3 className="col-title"><Users size={17} /> Positions of responsibility</h3>
          </Reveal>
          {leadership.map((l, i) => (
            <Reveal key={l.role + l.org} delay={i * 0.06}>
              <div className="lead-item">
                <div className="lead-head">
                  <strong>{l.role}</strong>
                  <span className="lead-period">{l.period}</span>
                </div>
                <span className="lead-org">{l.org}</span>
                <p>{l.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="leadership-col">
          <Reveal>
            <h3 className="col-title"><Trophy size={17} /> Achievements</h3>
          </Reveal>
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <TiltCard className="achieve-card" max={5}>
                <span className="achieve-icon">{a.icon}</span>
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.detail}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <h3 className="col-title certs-title"><BadgeCheck size={17} /> Certifications</h3>
          </Reveal>
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={0.25 + i * 0.07}>
              <div className="cert-item">
                <span className="cert-org">{c.org}</span>
                <p>{c.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
