import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const skillCategories = {
  Frontend: {
    color: '#00f2ff',
    icon: '⚡',
    skills: [
      { name: 'React', level: 88 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML/CSS', level: 95 },
    ],
  },
  Backend: {
    color: '#7000ff',
    icon: '🔧',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 85 },
      { name: 'FastAPI', level: 78 },
      { name: 'REST API', level: 85 },
    ],
  },
  Database: {
    color: '#bc13fe',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'Firebase', level: 78 },
    ],
  },
  Security: {
    color: '#00ff88',
    icon: '🔐',
    skills: [
      { name: 'Kali Linux', level: 72 },
      { name: 'Linux Admin', level: 78 },
      { name: 'Git', level: 88 },
      { name: 'C (Systems)', level: 65 },
    ],
  },
}

function SkillOrb({ name, level, color, index, onClick, isActive }) {
  const size = 90 + (level / 100) * 40

  return (
    <motion.div
      layout
      onClick={onClick}
      style={{ position: 'relative', cursor: 'pointer' }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.15, zIndex: 10 }}
    >
      <motion.div
        animate={isActive ? { scale: 1.2 } : { scale: 1 }}
        style={{
          width: isActive ? size + 20 : size,
          height: isActive ? size + 20 : size,
          borderRadius: '50%',
          background: isActive
            ? `radial-gradient(circle at 35% 35%, ${color}40, ${color}15)`
            : `radial-gradient(circle at 35% 35%, ${color}25, ${color}08)`,
          border: `1px solid ${color}${isActive ? '80' : '35'}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: isActive
            ? `0 0 30px ${color}50, 0 0 60px ${color}20`
            : `0 0 15px ${color}20`,
          cursor: 'pointer',
          transition: 'all 0.3s',
          padding: '0.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700, color: isActive ? color : 'var(--muted)', letterSpacing: '0.03em' }}>
          {name}
        </div>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{ fontSize: '1.1rem', fontWeight: 900, color, fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}
            >
              {level}%
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const [activeSkill, setActiveSkill] = useState(null)

  const cat = skillCategories[activeCategory]

  return (
    <section id="skills" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="glass-panel section-card" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-label">Technical Arsenal</div>
          <h2 className="section-title">
            Skills & <span className="neon-text">Expertise</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', marginTop: '1rem' }}>
            Click any orb to reveal proficiency level
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {Object.entries(skillCategories).map(([cat, data]) => (
            <motion.button
              key={cat}
              onClick={() => { setActiveCategory(cat); setActiveSkill(null) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.625rem 1.5rem',
                borderRadius: 30,
                border: `1px solid ${activeCategory === cat ? data.color : 'rgba(255,255,255,0.1)'}`,
                background: activeCategory === cat ? `${data.color}15` : 'transparent',
                color: activeCategory === cat ? data.color : 'var(--muted)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: activeCategory === cat ? `0 0 20px ${data.color}30` : 'none',
                transition: 'all 0.3s',
                letterSpacing: '0.05em',
              }}
            >
              {data.icon} {cat}
            </motion.button>
          ))}
        </div>

        {/* Orbs Galaxy */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
            padding: '2rem',
            background: 'rgba(255,255,255,0.01)',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.04)',
            position: 'relative',
          }}
        >
          {skillCategories[activeCategory].skills.map((skill, i) => (
            <SkillOrb
              key={skill.name}
              {...skill}
              color={skillCategories[activeCategory].color}
              index={i}
              isActive={activeSkill === skill.name}
              onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
            />
          ))}
        </motion.div>

        {/* Active skill detail */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel"
              style={{ marginTop: '2rem', padding: '1.5rem 2rem', maxWidth: 500, margin: '2rem auto 0' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--white)' }}>{activeSkill}</div>
                <div style={{ color: skillCategories[activeCategory].color, fontWeight: 900, fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                  {skillCategories[activeCategory].skills.find(s => s.name === activeSkill)?.level}%
                </div>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skillCategories[activeCategory].skills.find(s => s.name === activeSkill)?.level}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${skillCategories[activeCategory].color}, ${skillCategories[activeCategory].color}80)`,
                    borderRadius: 3,
                    boxShadow: `0 0 10px ${skillCategories[activeCategory].color}50`,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
