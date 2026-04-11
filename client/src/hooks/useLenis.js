import { useEffect, useRef, useState } from 'react'

export default function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default
        const lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true,
        })
        lenisRef.current = lenis
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch (e) {
        console.warn('Lenis not available, using default scroll')
      }
    }
    initLenis()
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  return lenisRef
}
