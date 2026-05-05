import { useRef, useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

const roles = ['Full Stack Developer', 'Cybersecurity Enthusiast', 'Python Programmer', 'Problem Solver']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const downloadMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target)) {
        setShowDownloadMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  // Magnetic button effect
  const handleMagneticMove = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)'
    e.currentTarget.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)'
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
        boxSizing: 'border-box'
      }}
    >
      {/* Grid dots */}
      <div className="grid-dots" />

      {/* Hero Content */}
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        maxWidth: '900px', padding: '4rem 2rem', marginTop: '20px',
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8, type: 'spring' }}
          style={{
            width: '140px',
            height: '140px',
            margin: '0 auto 1.5rem auto',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid var(--cyan)',
            boxShadow: '0 0 25px rgba(0, 242, 255, 0.4)',
            background: 'rgba(0, 242, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img 
            src="/profile.jpg" 
            alt="Suraj Nair" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Suraj+Nair&background=0f172a&color=00f2ff&size=140' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--cyan)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ width: 40, height: 1, background: 'var(--cyan)', display: 'inline-block', boxShadow: '0 0 8px var(--cyan-glow)' }} />
          Available for Hire
          <span style={{ width: 40, height: 1, background: 'var(--cyan)', display: 'inline-block', boxShadow: '0 0 8px var(--cyan-glow)' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            background: 'linear-gradient(135deg, #ffffff 0%, #c0f5ff 40%, #00f2ff 70%, #7000ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 0 30px rgba(0, 242, 255, 0.4))'
          }}
        >
          SURAJ<br />NAIR
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            fontWeight: 500,
            color: 'var(--muted)',
            marginBottom: '3rem',
            height: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: 'var(--cyan)' }}>{'>'}</span>
          <span style={{ color: 'var(--white)' }}>{displayed}</span>
          <span style={{
            display: 'inline-block',
            width: 2, height: '1.2em',
            background: 'var(--cyan)',
            animation: 'pulse 1s steps(1) infinite',
            boxShadow: '0 0 8px var(--cyan-glow)',
          }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            className="btn-primary"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <div style={{ position: 'relative' }} ref={downloadMenuRef}>
            <button
              className="btn-secondary"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
            >
              Download CV
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </button>

            {showDownloadMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  marginBottom: '0.5rem',
                  background: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--cyan)',
                  borderRadius: '12px',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  minWidth: '150px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0,242,255,0.2)',
                  zIndex: 20
                }}
              >
                <a
                  href={`${import.meta.env.VITE_API_URL || ''}/api/download/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowDownloadMenu(false)}
                  style={{
                    color: 'var(--white)',
                    textDecoration: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 242, 255, 0.15)'; e.currentTarget.style.color = 'var(--cyan)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  PDF
                </a>
                <a
                  href={`${import.meta.env.VITE_API_URL || ''}/api/download/docx`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowDownloadMenu(false)}
                  style={{
                    color: 'var(--white)',
                    textDecoration: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(112, 0, 255, 0.15)'; e.currentTarget.style.color = '#a855f7' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  DOCX
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--muted)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px rgba(0,242,255,0.5))' }}>
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  )
}
