import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import { Reveal, TiltCard, SectionHeading } from './ui'

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <SectionHeading
        index="06"
        eyebrow="AI · ML · Data"
        title={`Projects with <span class="grad">brains</span>`}
        description="Deep learning, multi-agent AI, and data analytics — the research side of the stack."
      />

      <div className="project-grid">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.09}>
            <TiltCard className="project-card" max={7}>
              <a href={p.url} target="_blank" rel="noreferrer" className="project-link">
                <div className="project-top">
                  <span className="project-emoji">{p.emoji}</span>
                  <span className="project-metric">{p.metric}</span>
                </div>
                <h3>
                  {p.name} <ArrowUpRight size={16} className="project-arrow" />
                </h3>
                <p>{p.desc}</p>
                <div className="project-stack">
                  {p.stack.map((s) => (
                    <span className="chip" key={s}>{s}</span>
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
