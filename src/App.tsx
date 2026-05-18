import { useEffect, useState, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function AppContent() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 })

  const handleScroll = useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
  }, [])

  const handleMouse = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [handleScroll, handleMouse])

  return (
    <div className="relative min-h-screen transition-colors duration-500" style={{ background: 'var(--bg)' }}>
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="cursor-glow hidden lg:block" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="subtle-grid" />
      <div className="noise-overlay" />

      {/* Ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full"
          style={{ background: `radial-gradient(ellipse, var(--ambient-1) 0%, transparent 60%)` }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(circle, var(--ambient-2) 0%, transparent 60%)` }} />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
