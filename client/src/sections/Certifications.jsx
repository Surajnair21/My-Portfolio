import { useState } from 'react'
import { motion } from 'framer-motion'

const certs = [
  {
    name: 'Google AI Essentials',
    issuer: 'Google',
    badge: '🤖',
    color: '#00f2ff',
    year: '2024',
    desc: 'Foundational AI/ML concepts, Gemini AI, responsible AI practices',
  },
  {
    name: 'Red Hat System Administration',
    issuer: 'Red Hat',
    badge: '🎩',
    color: '#ff416c',
    year: '2024',
    desc: 'RHEL system administration, shell scripting, package management',
  },
  {
    name: 'Mobile & Frontend Development',
    issuer: 'Industry Certification',
    badge: '📱',
    color: '#bc13fe',
    year: '2023',
    desc: 'Responsive design, mobile-first approach, modern JS frameworks',
  },
]

function CertCard({ cert, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onClick={() => setFlipped(!flipped)}
      data-cursor="pointer"
      style={{ perspective: 1000, height: 240, cursor: 'pointer' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 30% 30%, ${cert.color}15, rgba(13,13,23,0.9))`,
          border: `1px solid ${cert.color}30`,
          borderRadius: 20, padding: '2rem',
          backfaceVisibility: 'hidden',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          boxShadow: `0 10px 40px ${cert.color}15`,
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cert.badge}</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
              {cert.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: cert.color, fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              {cert.issuer}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{cert.year}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Tap to flip →
            </span>
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${cert.color}20, rgba(13,13,23,0.95))`,
          border: `1px solid ${cert.color}50`,
          borderRadius: 20, padding: '2rem',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          boxShadow: `0 10px 40px ${cert.color}25, inset 0 0 60px ${cert.color}05`,
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏆</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: cert.color, marginBottom: '0.75rem' }}>
            {cert.issuer}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--white)', lineHeight: 1.6, marginBottom: '1rem' }}>
            {cert.desc}
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.75rem', color: cert.color,
            background: `${cert.color}12`, border: `1px solid ${cert.color}30`,
            padding: '0.3rem 0.75rem', borderRadius: 20, fontFamily: 'var(--font-heading)',
            width: 'fit-content',
          }}>
            ✓ Certified {cert.year}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding: '8rem 0', position: 'relative' }}>
      <div className="glass-panel section-card" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-label">Credentials</div>
          <h2 className="section-title">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '0.95rem' }}>Click a card to reveal details</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {certs.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
