import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const cursorRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const onHoverIn = () => setHovering(true)
    const onHoverOut = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    const interactables = document.querySelectorAll(
      'a, button, .btn-primary, .btn-secondary, [data-cursor]'
    )
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll(
        'a, button, .btn-primary, .btn-secondary, [data-cursor]'
      )
      els.forEach((el) => {
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={cursorRef} className={`cursor ${hovering ? 'hovering' : ''}`}>
      <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99999 }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99998 }} />
    </div>
  )
}
