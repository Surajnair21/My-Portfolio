import { useEffect, useRef } from 'react'

export default function useMousePosition() {
  const mouseRef = useRef({ x: 0, y: 0, normalX: 0, normalY: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        normalX: (e.clientX / window.innerWidth) * 2 - 1,
        normalY: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mouseRef
}
