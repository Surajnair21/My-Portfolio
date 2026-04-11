import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 600)
          }, 300)
          return 100
        }
        return p + Math.random() * 15
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="loading-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            SN
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.7rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '1rem'
            }}>
              Initializing...
            </div>
            <div className="loading-bar">
              <motion.div
                className="loading-bar-fill"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.65rem',
              color: 'var(--cyan)',
              marginTop: '0.75rem',
              letterSpacing: '0.2em'
            }}>
              {Math.round(Math.min(progress, 100))}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
