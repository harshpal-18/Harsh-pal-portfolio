import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Instagram, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { name: 'Home',       href: '#hero'       },
  { name: 'About',      href: '#about'      },
  { name: 'Skills',     href: '#skills'     },
  { name: 'Projects',   href: '#projects'   },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact',    href: '#contact'    },
]

const socials = [
  { icon: Github,   href: 'https://github.com/harshpal-18',   label: 'GitHub'   },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/harsh-pal-018h', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/_harsh_._pal_/?__pwa=1#',        label: 'Instagram'        },
]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeSection,  setActiveSection]  = useState('hero')
  const { theme, toggleTheme }              = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = navLinks.map(l => l.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveSection(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Desktop nav ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 right-0 z-50 mx-auto"
        style={{ width: 'min(90%, 860px)' }}
      >
        <div
          className="grid grid-cols-[1fr_auto_1fr] items-center rounded-full transition-all duration-700"
          style={{
            padding: '10px 20px',
            background:      scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
            backdropFilter:  'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border:          '1px solid var(--nav-border)',
            boxShadow:       scrolled ? 'var(--nav-shadow-scrolled)' : 'var(--nav-shadow)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-start">
            <motion.button
              onClick={() => go('#hero')}
              className="font-heading font-semibold text-[14px] tracking-tight px-1"
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              Harsh
            </motion.button>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center justify-center gap-[2px]">
            {navLinks.map((link) => {
              const active = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.name}
                  onClick={() => go(link.href)}
                  className="relative px-3.5 py-[6px] text-[12.5px] font-medium rounded-full transition-colors duration-300"
                  style={{ color: active ? 'var(--text-primary)' : 'var(--text-faint)' }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-muted)' }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-faint)' }}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--accent-light)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              )
            })}
          </div>

          {/* Socials + theme toggle */}
          <div className="hidden md:flex items-center justify-end gap-[2px]">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-300"
                style={{ color: 'var(--text-faint)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-faint)' }}
              >
                <s.icon size={14} strokeWidth={1.8} />
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-300 ml-1"
              style={{ color: 'var(--text-faint)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.background = 'transparent' }}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                  exit={{    rotate:  90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {theme === 'light' ? <Moon size={13} strokeWidth={2} /> : <Sun size={13} strokeWidth={2} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex items-center justify-end gap-1 md:hidden">
            <button onClick={toggleTheme} className="w-7 h-7 flex items-center justify-center rounded-full" style={{ color: 'var(--text-faint)' }}>
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="w-8 h-8 flex items-center justify-center rounded-full" style={{ color: 'var(--text-muted)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                  exit={{    rotate:  90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] left-0 right-0 z-40 mx-auto w-[84%] max-w-[340px] rounded-2xl p-4 md:hidden"
            style={{
              background:     'var(--nav-bg-scrolled)',
              backdropFilter: 'blur(40px)',
              border:         '1px solid var(--nav-border)',
              boxShadow:      '0 16px 48px rgba(0,0,0,0.15)',
            }}
          >
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0   }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(link.href)}
                  className="text-left px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all"
                  style={{
                    color:      activeSection === link.href.slice(1) ? 'var(--text-primary)' : 'var(--text-faint)',
                    background: activeSection === link.href.slice(1) ? 'var(--accent-light)'  : 'transparent',
                  }}
                >
                  {link.name}
                </motion.button>
              ))}
              <div className="flex items-center gap-2 mt-2 pt-3 px-4" style={{ borderTop: `1px solid var(--surface-border)` }}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: 'var(--text-faint)' }}>
                    <s.icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}