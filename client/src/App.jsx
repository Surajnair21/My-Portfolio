import { useState, useEffect, lazy, Suspense, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/ui/Navbar'
import LoadingScreen from './components/ui/LoadingScreen'
import useLenis from './hooks/useLenis'
import useMousePosition from './hooks/useMousePosition'

// Theme Context for Dark/Light mode
export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

// Lazy-loaded sections
const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Certifications = lazy(() => import('./sections/Certifications'))
const Contact = lazy(() => import('./sections/Contact'))

const GlobalBackground = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#000', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.8,
        }}
      >
        <source src="/nebula.mp4" type="video/mp4" />
      </video>
      <div className="grid-dots" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
    </div>
  )
}

function HomePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ width: 2, height: 40, background: 'var(--cyan)', animation: 'pulse 1s infinite' }} />
      </div>
    }>
      <main style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </Suspense>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [theme, setTheme] = useState('dark')
  useLenis()

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      return next
    })
  }

  const handleLoadComplete = () => {
    setLoaded(true)
    document.body.classList.remove('loading')
  }

  useEffect(() => {
    document.body.classList.add('loading')
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GlobalBackground />
      <BrowserRouter>
        <AnimatePresence>
          {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
        </AnimatePresence>
        <AnimatePresence>
          {loaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}
