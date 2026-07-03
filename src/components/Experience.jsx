import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experience } from '../data/portfolio'
import { Reveal, SectionHeading, EASE } from './ui'

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title={`Where I <span class="grad">build</span> right now`}
      />

      <div className="timeline">
        {experience.map((job) => (
          <div className="timeline-item" key={job.company}>
            <div className="timeline-rail">
              <motion.span
                className="timeline-node"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'backOut' }}
              >
                <Briefcase size={15} />
              </motion.span>
              <motion.span
                className="timeline-line"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </div>

            <div className="timeline-content">
              <Reveal>
                <div className="timeline-head">
                  <h3>{job.company}</h3>
                  <span className="timeline-period">{job.period}</span>
                </div>
                <p className="timeline-role">{job.role} · {job.location}</p>
              </Reveal>
              <ul className="timeline-highlights">
                {job.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
                  >
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
