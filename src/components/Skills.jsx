import { motion } from 'framer-motion'
import { Code2, Globe2, BrainCircuit, Database, Plug, Rocket } from 'lucide-react'
import { skillGroups } from '../data/portfolio'
import { Reveal, TiltCard, SectionHeading } from './ui'

const ICONS = {
  code: Code2,
  globe: Globe2,
  brain: BrainCircuit,
  database: Database,
  plug: Plug,
  rocket: Rocket,
}

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <SectionHeading
        index="02"
        eyebrow="Arsenal"
        title={`A full-stack toolkit —<br/>code to <span class="grad">commerce</span>`}
        description="Everything needed to take a product from empty repo to live storefront: languages, frameworks, AI, data, integrations — and the business skills to launch it."
      />

      <div className="skills-grid">
        {skillGroups.map((group, gi) => {
          const Icon = ICONS[group.icon] || Code2
          return (
            <Reveal key={group.title} delay={(gi % 3) * 0.1}>
              <TiltCard className="skill-card" max={6}>
                <div className="skill-card-head">
                  <span className="skill-icon"><Icon size={20} /></span>
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-chips">
                  {group.skills.map((s, si) => (
                    <motion.span
                      className="chip chip-skill"
                      key={s}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + si * 0.04, duration: 0.4 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
