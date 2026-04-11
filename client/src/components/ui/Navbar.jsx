import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../App'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{
          borderBottom: scrolled ? '1px solid rgba(0,242,255,0.12)' : '1px solid transparent',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
        }}
      >
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          SURAJ NAIR
        </a>

        {/* Desktop nav links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: Theme toggle + Hire Me */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Dark / Light toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              width: 40, height: 40,
              borderRadius: '50%',
              border: '1px solid var(--surface-border)',
              background: 'var(--glass-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '1rem',
              backdropFilter: 'blur(10px)',
              flexShrink: 0,
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>

          <a
            href="mailto:nairsuraj2111@gmail.com"
            className="btn-primary"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column', gap: 5,
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: 'var(--cyan)', borderRadius: 1,
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', top: 70, left: 0, right: 0,
            background: 'rgba(3,3,10,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--surface-border)',
            zIndex: 999, padding: '1.5rem 2rem',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
                fontWeight: 600, color: 'var(--white)', textDecoration: 'none',
                borderBottom: '1px solid rgba(0,242,255,0.08)',
                paddingBottom: '1rem',
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="mailto:nairsuraj2111@gmail.com" className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
            Hire Me
          </a>
        </motion.div>
      )}
    </>
  )
}
