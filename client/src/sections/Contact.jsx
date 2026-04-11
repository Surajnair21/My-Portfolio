import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/Surajnair21',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    color: '#acacac',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/suraj-nair-8a6ba0285',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 110-4 2 2 0 010 4z"/>
      </svg>
    ),
    color: '#0077b5',
  },
  {
    name: 'Email',
    href: 'mailto:nairsuraj2111@gmail.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: '#00f2ff',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [particles, setParticles] = useState([])
  const btnRef = useRef(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const spawnParticles = () => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      vx: (Math.random() - 0.5) * 200,
      vy: (Math.random() - 0.5) * 200 - 100,
      color: Math.random() > 0.5 ? '#00f2ff' : '#bc13fe',
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1200)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    spawnParticles()
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      // For demo without backend, simulate success
      setTimeout(() => {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      }, 1000)
    }
    setTimeout(() => setStatus('idle'), 4000)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(0,242,255,0.15)',
    borderRadius: 12,
    padding: '0.875rem 1.25rem',
    color: 'var(--white)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  return (
    <section id="contact" style={{ padding: '8rem 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Particle burst overlay */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
          animate={{ x: p.x + p.vx, y: p.y + p.vy, opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'fixed', width: 6, height: 6, borderRadius: '50%',
            background: p.color, boxShadow: `0 0 8px ${p.color}`,
            zIndex: 9999, pointerEvents: 'none',
          }}
        />
      ))}

      {/* Background glows */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,242,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(112,0,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">
            Let's build something <span className="neon-text">amazing</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', marginTop: '1rem', maxWidth: 500, margin: '1rem auto 0' }}>
            Open to full-time roles, internships, and exciting freelance projects. Let's connect!
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--white)', marginBottom: '2rem' }}>
              Say Hello 👋
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
              {[
                { label: 'Email', value: 'nairsuraj2111@gmail.com', icon: '📧', href: 'mailto:nairsuraj2111@gmail.com' },
                { label: 'Phone', value: '+91 8619331834', icon: '📱', href: 'tel:+918619331834' },
                { label: 'Location', value: 'Jaipur, Rajasthan, India', icon: '📍', href: null },
              ].map(item => (
                <div key={item.label} className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '0.2rem' }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ color: 'var(--cyan)', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
                        {item.value}
                      </a>
                    ) : (
                      <div style={{ color: 'var(--white)', fontSize: '0.9rem' }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
                Find me online
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socials.map(social => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    aria-label={`Visit my ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 50, height: 50, borderRadius: 12,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: social.color, textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${social.color}12`
                      e.currentTarget.style.borderColor = `${social.color}40`
                      e.currentTarget.style.boxShadow = `0 0 20px ${social.color}30`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,242,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,242,255,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,242,255,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,242,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,242,255,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,242,255,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,242,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,242,255,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,242,255,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <motion.button
                ref={btnRef}
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : status === 'error' ? 'Try Again' : 'Send Message'}
                {status === 'idle' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', marginTop: '6rem', padding: '2rem',
        borderTop: '1px solid rgba(0,242,255,0.08)',
        color: 'var(--muted)', fontSize: '0.8rem',
        fontFamily: 'var(--font-heading)', letterSpacing: '0.1em',
      }}>
        <span style={{ color: 'var(--cyan)' }}>Suraj Nair</span> · Built with React + Three.js · 2025
      </div>
    </section>
  )
}
