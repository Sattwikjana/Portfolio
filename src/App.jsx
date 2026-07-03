import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from 'lenis'

const Scene = lazy(() => import('./scene/Scene'))
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Flagship from './components/Flagship'
import Ventures from './components/Ventures'
import Projects from './components/Projects'
import Leadership from './components/Leadership'
import Contact from './components/Contact'
import { scrollState, lenisRef } from './utils/scrollState'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: !reduceMotion,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis
    window.__lenis = lenis

    lenis.on('scroll', ({ progress, velocity }) => {
      scrollState.progress = progress
      scrollState.velocity = velocity
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Lock scroll while the preloader is up
  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden'
  }, [loaded])

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Cursor />
      <Navbar />
      <div className="grain" aria-hidden="true" />
      <main className="content">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Flagship />
        <Ventures />
        <Projects />
        <Leadership />
        <Contact />
      </main>
    </>
  )
}
