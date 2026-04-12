import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'Solviser Pvt Ltd',
    type: 'Internship',
    period: '2024',
    color: '#00f2ff',
    icon: '💼',
    points: [
      'Engineered full-stack web applications using React and Node.js',
      'Architected scalable frontend + backend solutions for production',
      'Improved application performance by 40% through code optimization',
      'Collaborated with cross-functional teams in an Agile environment',
    ],
  },
  {
    id: 2,
    role: 'Web Developer',
    company: 'AIC-JKLU',
    type: 'Internship',
    period: '2023',
    color: '#bc13fe',
    icon: '🚀',
    points: [
      'Built responsive interfaces with pixel-perfect UI/UX implementation',
      'Optimized web performance and cross-browser compatibility',
      'Collaborated with design teams to translate wireframes into code',
      'Contributed to startup ecosystem at university incubator',
    ],
  },
  {
    id: 3,
    role: 'B.Tech Computer Science',
    company: 'JK Lakshmipat University',
    type: 'Education',
    period: '2022 – Present',
    color: '#7000ff',
    icon: '🎓',
    points: [
      'Pursuing B.Tech in Computer Science with CGPA 7.5+',
      'Focus areas: Full Stack Development & Cybersecurity',
      'Active participant in hackathons and coding competitions',
      'Core committee member in technology clubs',
    ],
  },
]

function TimelineEntry({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start', position: 'relative', marginBottom: '3rem' }}>
      {/* Center line dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
        style={{
          position: 'absolute', left: '50%', top: 28,
          transform: 'translateX(-50%)',
          width: 14, height: 14, borderRadius: '50%',
          background: item.color,
          boxShadow: `0 0 20px ${item.color}60`,
          zIndex: 2,
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: '44%' }}
      >
        <div
          className="glass-panel"
          style={{
            padding: '1.75rem',
            borderColor: `${item.color}25`,
            position: 'relative',
          }}
        >
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            top: 24,
            [isLeft ? 'right' : 'left']: -8,
            width: 0, height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            [isLeft ? 'borderLeft' : 'borderRight']: `8px solid ${item.color}20`,
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--white)' }}>
                  {item.role}
                </h3>
                <span style={{
                  fontSize: '0.65rem', fontFamily: 'var(--font-heading)',
                  color: item.color, background: `${item.color}12`,
                  border: `1px solid ${item.color}30`, borderRadius: 20,
                  padding: '0.15rem 0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>{item.type}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: item.color, fontWeight: 600 }}>
                {item.company}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem', letterSpacing: '0.05em' }}>
                {item.period}
              </div>
            </div>
          </div>

          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {item.points.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.25rem', listStyleType: 'none' }}
              >
                <span style={{ color: item.color, marginRight: '0.5rem' }}>→</span>
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="glass-panel section-card" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div className="section-label">Journey</div>
          <h2 className="section-title">
            Experience & <span className="neon-text">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 1, background: 'linear-gradient(180deg, var(--cyan) 0%, var(--purple-bright) 50%, var(--purple) 100%)',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(0,242,255,0.3)',
            opacity: 0.4,
          }} />

          {experiences.map((item, i) => (
            <TimelineEntry key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
