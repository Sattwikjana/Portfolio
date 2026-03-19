import { Scroll } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Rocket, Award, Mail, BrainCircuit, BarChart3, GraduationCap } from 'lucide-react'

export default function Overlay() {
  return (
    <Scroll html style={{ width: '100%' }}>
      
      {/* Page 1: Home */}
      <section className="scroll-section">
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          <h1>Sattwik Jana</h1>
          <h2>Creative Data Professional</h2>
          <p>
            Management professional with experience in data analysis, visualization, and machine learning. 
            Holds a Computer Science degree and a PGDM from IMT Hyderabad. 
            Has work experience using many datasets and developing projects in Power BI and deep learning. 
            Has demonstrated leadership skills in student organizations and event organization.
          </p>
          <div className="skills-tags">
            <span className="skill-tag">Data Analysis</span>
            <span className="skill-tag">Machine Learning</span>
            <span className="skill-tag">Power BI</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">SQL</span>
          </div>
        </motion.div>
      </section>

      {/* Page 2: Experience & Education */}
      <section className="scroll-section section-right">
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
            <GraduationCap /> Education & Journey
          </h2>
          
          <div style={{ textAlign: 'left', marginTop: '2rem' }}>
            <div style={{ marginBottom: '1.5rem', borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
              <h3 style={{ color: '#fff' }}>Institute of Management Technology, Hyderabad</h3>
              <p style={{ margin: '0.2rem 0', color: '#ccc' }}>Post Graduation Diploma in Management (2025 - 2027)</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem', borderLeft: '2px solid var(--accent-2)', paddingLeft: '1rem' }}>
              <h3 style={{ color: '#fff' }}>MNNIT Allahabad</h3>
              <p style={{ margin: '0.2rem 0', color: '#ccc' }}>B.Tech in Computer Science and Engineering (2021 - 2025)</p>
            </div>

            <div style={{ borderLeft: '2px solid #feca57', paddingLeft: '1rem' }}>
              <h3 style={{ color: '#fff' }}>Leadership</h3>
              <p style={{ margin: '0.2rem 0', color: '#ccc', fontSize: '0.95rem' }}>
                Field Officer of Enactus, President of Arts Committee, PR Lead of Culrav & Avishkar.<br/>
                Managed PR for cultural and technical events, enhancing visibility.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Page 3: Projects */}
      <section className="scroll-section">
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          style={{ maxWidth: '800px' }}
        >
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Rocket /> Featured Data Projects
          </h2>
          
          <div className="projects-grid">
            <div className="project-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BrainCircuit size={20} color="var(--accent-2)" /> 
                Brain Tumor Classification CNN
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#ddd' }}>
                Built a 4-layer CNN model achieving 95.8% accuracy in classifying brain tumors from MRI images. 
                Developed an end-to-end pipeline with preprocessing, segmentation, and evaluation.
              </p>
              <div className="skills-tags">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">NumPy</span>
              </div>
            </div>

            <div className="project-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={20} color="#feca57" /> 
                2011 Census Analysis & Visualization
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#ddd' }}>
                Built a database, analyzed and retrieved data through SQL, and developed a visual dashboard 
                in Power BI to query insights like Literacy Rate and Sex Ratio across districts.
              </p>
              <div className="skills-tags">
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">Data Visualization</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Page 4: Contact */}
      <section className="scroll-section section-right">
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award /> Let's Connect
          </h2>
          <p style={{ textAlign: 'center' }}>
            Looking for opportunities to apply data analysis and visualization to real-world business problems.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <p><strong>Email:</strong> <a href="mailto:sattwikjana77@gmail.com" style={{ color: 'var(--accent-2)', textDecoration: 'none' }}>sattwikjana77@gmail.com</a></p>
            <p><strong>Phone:</strong> +91 7908773477</p>
            <p><strong>GitHub:</strong> <a href="https://github.com/Sattwikjana" target="_blank" style={{ color: 'var(--accent-2)', textDecoration: 'none' }}>github.com/Sattwikjana</a></p>
          </div>
          
          <button className="contact-btn">
            <Mail size={18} /> Contact Me
          </button>
        </motion.div>
      </section>

    </Scroll>
  )
}
