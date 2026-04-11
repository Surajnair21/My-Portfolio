import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 2, label: 'Internships', suffix: '+' },
  { value: 4, label: 'Projects', suffix: '+' },
  { value: 3, label: 'Certifications', suffix: '' },
  { value: 1, label: 'Degree (in progress)', suffix: '' },
]

function StatCard({ value, label, suffix, index }) {
  const numRef = useRef(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: value,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            el.textContent = Math.ceil(this.targets()[0].textContent) + suffix
          },
        })
      },
    })
    return () => trigger.kill()
  }, [value, suffix])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="glass-panel"
      style={{ padding: '2rem', textAlign: 'center', minWidth: 140 }}
    >
      <div
        ref={numRef}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '3.5rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, var(--cyan), var(--purple-bright))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        0{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)

  return (
    <section id="about" ref={sectionRef} style={{ padding: '8rem 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 800, height: 500,
        background: 'radial-gradient(ellipse, rgba(0,242,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem' }}
        >
          <div className="section-label">About Me</div>
          <h2 className="section-title" style={{ maxWidth: 700 }}>
            Building the future,<br />
            <span className="neon-text">one commit at a time</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Avatar Sphere visual */}
            <div style={{
              width: 280, height: 280, borderRadius: '50%', margin: '0 auto 3rem',
              background: 'radial-gradient(circle at 35% 35%, rgba(0,242,255,0.15) 0%, rgba(112,0,255,0.1) 60%, transparent 100%)',
              border: '1px solid rgba(0,242,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 60px rgba(0,242,255,0.1), 0 0 120px rgba(112,0,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,242,255,0.03) 20px, rgba(0,242,255,0.03) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,242,255,0.03) 20px, rgba(0,242,255,0.03) 21px)',
                borderRadius: '50%',
              }} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '5rem', fontWeight: 900,
                  background: 'linear-gradient(135deg, var(--cyan), var(--purple-bright))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>SN</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>Full Stack Dev</div>
              </div>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Hey! I'm Suraj — a B.Tech Computer Science student at <span style={{ color: 'var(--cyan)' }}>JK Lakshmipat University</span>, passionate about building scalable web apps and breaking things (ethically).
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--muted)' }}>
              I blend <span style={{ color: 'var(--purple-bright)' }}>Full Stack Development</span> with <span style={{ color: 'var(--cyan)' }}>Cybersecurity</span> to build systems that are both powerful and secure.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
              <a href="https://github.com/Surajnair21" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/suraj-nair-8a6ba0285" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}>
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right - Stats + Currently Building */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {stats.map((s, i) => (
                  <StatCard key={i} {...s} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Currently building card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="glass-panel"
              style={{ padding: '1.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)' }}>Currently Building</span>
                <span style={{
                  background: 'rgba(0,242,255,0.12)', color: 'var(--cyan)',
                  border: '1px solid rgba(0,242,255,0.3)',
                  borderRadius: 20, padding: '0.2rem 0.75rem',
                  fontSize: '0.7rem', fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  boxShadow: '0 0 15px rgba(0,242,255,0.15)',
                }}>
                  🟢 Active
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.5rem' }}>
                Security-First Full Stack Apps
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Integrating OWASP Top 10 best practices into every project I ship. Currently exploring WebSockets, real-time dashboards, and adversarial machine learning.
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['React', 'FastAPI', 'MongoDB', 'WebSockets'].map(tag => (
                  <span key={tag} style={{
                    background: 'rgba(112,0,255,0.12)', color: 'var(--purple-bright)',
                    border: '1px solid rgba(112,0,255,0.25)',
                    borderRadius: 20, padding: '0.2rem 0.65rem',
                    fontSize: '0.7rem', fontFamily: 'var(--font-heading)',
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="glass-panel"
              style={{ padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88, 0 0 20px rgba(0,255,136,0.3)', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--white)' }}>Open to Opportunities</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Internships, Full-time roles, Freelance projects</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
