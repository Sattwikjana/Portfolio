import { useEffect, useRef, useState } from 'react'

// Custom cursor: instant dot + trailing ring. Ring expands over interactive elements.
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
  )

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    let mx = -100, my = -100
    let rx = -100, ry = -100
    let hovering = false
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      const target = e.target.closest('a, button, [data-cursor], input, textarea, .tilt-card')
      hovering = !!target
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${hovering ? 2.4 : 1})`
      ring.style.opacity = hovering ? 0.45 : 1
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
