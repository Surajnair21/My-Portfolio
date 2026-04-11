import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Uni-Verse ERP System',
    emoji: '🎓',
    tags: ['Next.js', 'Node.js', 'AI Chatbot'],
    tagColor: '#ff0055',
    description: 'A full-fledged ERP system designed for universities and colleges. Highly user-friendly, featuring an AI chatbot integration for instant student and faculty assistance.',
    github: 'https://github.com/Surajnair21',
    color: '#ff0055',
    gradient: 'linear-gradient(135deg, rgba(255,0,85,0.12) 0%, rgba(255,0,85,0.03) 100%)',
  },
  {
    id: 2,
    title: 'AI Image Captioner',
    emoji: '🖼️',
    tags: ['Python', 'Deep Learning', 'PyTorch'],
    tagColor: '#ffaa00',
    description: 'Deep learning model that automatically generates descriptive captions for any given image. Utilizes computer vision and natural language processing techniques to understand and describe visual content.',
    github: 'https://github.com/Surajnair21',
    color: '#ffaa00',
    gradient: 'linear-gradient(135deg, rgba(255,170,0,0.12) 0%, rgba(255,170,0,0.03) 100%)',
  },
  {
    id: 3,
    title: 'SSH Honeypot',
    emoji: '🕵️',
    tags: ['Python', 'FastAPI', 'WebSocket'],
    tagColor: '#00f2ff',
    description: 'Python SSH honeypot with real-time WebSocket dashboard to visualize live attacks. Captures attacker behavior, logging credentials and command patterns in real time.',
    github: 'https://github.com/Surajnair21',
    color: '#00f2ff',
    gradient: 'linear-gradient(135deg, rgba(0,242,255,0.12) 0%, rgba(0,242,255,0.03) 100%)',
  },
  {
    id: 4,
    title: 'XSS Hunter Extension',
    emoji: '🔍',
    tags: ['JavaScript', 'Chrome API', 'Security'],
    tagColor: '#bc13fe',
    description: 'Automated DAST Chrome extension with Silent Hook engine for XSS detection and polyglot injection. Identifies cross-site scripting vulnerabilities across web forms.',
    github: 'https://github.com/Surajnair21',
    color: '#bc13fe',
    gradient: 'linear-gradient(135deg, rgba(188,19,254,0.12) 0%, rgba(188,19,254,0.03) 100%)',
  },
  {
    id: 5,
    title: 'CyberChat',
    emoji: '💬',
    tags: ['React', 'Firebase', 'Tailwind'],
    tagColor: '#00ff88',
    description: 'Secure real-time messaging app with admin controls and encrypted communications. Features end-to-end encryption, admin moderation, and real-time message delivery.',
    github: 'https://github.com/Surajnair21',
    color: '#00ff88',
    gradient: 'linear-gradient(135deg, rgba(0,255,136,0.12) 0%, rgba(0,255,136,0.03) 100%)',
  },
  {
    id: 6,
    title: 'Hostel Management System',
    emoji: '🏫',
    tags: ['Node.js', 'MySQL', 'SQL'],
    tagColor: '#7000ff',
    description: 'Full university housing operations system with complete SQL backend. Manages room allocation, fee tracking, complaints, and administrative dashboards.',
    github: 'https://github.com/Surajnair21',
    color: '#7000ff',
    gradient: 'linear-gradient(135deg, rgba(112,0,255,0.12) 0%, rgba(112,0,255,0.03) 100%)',
  },
]

function ProjectCard({ project, index, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      data-cursor="pointer"
      style={{
        background: hovered || isActive ? project.gradient : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isActive ? project.color + '60' : hovered ? project.color + '35' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 20,
        padding: '2rem',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: isActive ? 'translateY(-8px)' : hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isActive
          ? `0 20px 60px ${project.color}25, 0 0 0 1px ${project.color}30`
          : hovered ? `0 10px 40px ${project.color}15` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shimmer effect */}
      {(hovered || isActive) && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(105deg, transparent 40%, ${project.color}08 50%, transparent 60%)`,
          animation: 'shimmer 2s ease-in-out infinite',
        }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '2.5rem' }}>{project.emoji}</div>
        <span style={{
          fontSize: '0.65rem', fontFamily: 'var(--font-heading)',
          color: project.color, letterSpacing: '0.2em', textTransform: 'uppercase',
          background: `${project.color}12`, border: `1px solid ${project.color}30`,
          padding: '0.2rem 0.75rem', borderRadius: 20,
        }}>Project 0{project.id}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800,
        color: 'var(--white)', marginBottom: '1rem', letterSpacing: '-0.02em',
      }}>
        {project.title}
      </h3>

      <AnimatePresence>
        {(isActive || hovered) && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem', overflow: 'hidden' }}
          >
            {project.description}
          </motion.p>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '0.72rem', fontFamily: 'var(--font-heading)',
            color: project.tagColor, background: `${project.tagColor}12`,
            border: `1px solid ${project.tagColor}25`, borderRadius: 20,
            padding: '0.2rem 0.65rem', letterSpacing: '0.05em',
          }}>{tag}</span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.8rem', fontFamily: 'var(--font-heading)', fontWeight: 600,
          color: project.color, textDecoration: 'none',
          transition: 'gap 0.3s',
        }}
      >
        View on GitHub
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </a>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" style={{ padding: '8rem 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: 600, height: 400,
        background: 'radial-gradient(ellipse at bottom right, rgba(112,0,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-label">Featured Work</div>
          <h2 className="section-title">
            Projects that <span className="neon-purple">push limits</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '1rem' }}>Click any card for more details</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isActive={active === project.id}
              onClick={() => setActive(active === project.id ? null : project.id)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
