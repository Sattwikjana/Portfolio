// Shared mutable scroll state — written by Lenis in App, read by the 3D scene
// every frame without triggering React re-renders.
export const scrollState = {
  progress: 0, // 0 → 1 across the whole page
  velocity: 0,
}

// Filled in by App once Lenis is created, so any component (e.g. Navbar)
// can smooth-scroll to an anchor.
export const lenisRef = { current: null }

export function scrollToSection(selector) {
  const target = document.querySelector(selector)
  if (!target) return
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset: -70, duration: 1.4 })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
