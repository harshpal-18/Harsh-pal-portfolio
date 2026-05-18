import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'Full-Stack Developer', 'Mobile App Developer']

const floatingTags = [
  { label: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',       x: -150, y: -95, d: 0 },
  { label: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', x: 150, y: -75, d: 0.8 },
  { label: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', x: -140, y: 90, d: 1.6 },
  { label: 'Firebase',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',    x: 155, y: 85, d: 2.4 },
]

// Letter-by-letter split animation
function SplitText({ text, className, style, delay = 0 }: { text: string; className?: string; style?: React.CSSProperties; delay?: number }) {
  return (
    <span className={className} style={{ ...style, display: 'inline-block' }}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : undefined }}
          initial={{ opacity: 0, y: 40, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const ease = [0.16, 1, 0.3, 1] as const

  useEffect(() => {
    const current = roles[roleIndex]
    let t: ReturnType<typeof setTimeout>
    if (!isDeleting) {
      if (displayText.length < current.length) {
        t = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 90)
      } else {
        t = setTimeout(() => setIsDeleting(true), 2400)
      }
    } else {
      if (displayText.length > 0) {
        t = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 45)
      } else {
        setIsDeleting(false)
        setRoleIndex((p) => (p + 1) % roles.length)
      }
    }
    return () => clearTimeout(t)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Left ── */}
          <div className="relative z-10" style={{ perspective: '800px' }}>

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10"
              style={{ background: 'var(--pill-bg)', border: '1px solid var(--pill-border)' }}
            >
              <motion.span
                className="w-[5px] h-[5px] rounded-full"
                style={{ background: 'var(--status-green)' }}
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[11px] font-mono" style={{ color: 'var(--text-faint)' }}>Available for opportunities</span>
            </motion.div>

            {/* Heading with split-letter animation */}
            <h1
              className="font-heading font-bold leading-[1.02] tracking-[-0.04em] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', color: 'var(--text-primary)' }}
            >
              <SplitText text="Hey, I'm" delay={0.3} /><br />
              <SplitText
                text="Harsh Pal"
                delay={0.5}
                style={{
                  background: `linear-gradient(to right, var(--name-gradient-from), var(--name-gradient-to))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              />
            </h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-7 h-7"
            >
              <span className="font-mono text-sm" style={{ color: 'var(--text-faint)' }}>
                {'> '}{displayText}
                <span className="animate-pulse ml-0.5" style={{ color: 'var(--text-ghost)' }}>▌</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease }}
              className="text-[15px] leading-[1.8] max-w-[420px] mb-12"
              style={{ color: 'var(--text-muted)' }}
            >
              I craft high-performance, visually refined web experiences
              with modern technologies — blending code precision with design obsession.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15, ease }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View Projects <ArrowRight size={15} strokeWidth={2} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                <Mail size={15} strokeWidth={2} /> Contact Me
              </motion.button>
            </motion.div>

            {/* Stats — count-up feel via stagger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex gap-12 mt-16"
            >
              {[{ v: '10+', l: 'Projects' }, { v: '5+', l: 'Technologies' }, { v: '1+', l: 'Years' }].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.5, ease }}
                >
                  <div className="font-heading text-xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>{s.v}</div>
                  <div className="text-[11px] mt-1.5" style={{ color: 'var(--text-faint)' }}>{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Avatar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease }}
            className="relative flex justify-center items-center"
            style={{ minHeight: '400px' }}
          >
            {/* Ambient glow */}
            <motion.div
              className="absolute w-[420px] h-[420px] rounded-full"
              style={{ background: `radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)` }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Outer rotating ring */}
            <motion.div
              className="absolute w-[320px] h-[320px] sm:w-[370px] sm:h-[370px] rounded-full"
              style={{ border: '1px solid var(--ring-border)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-dot)' }} />
            </motion.div>

            {/* Inner dashed ring — counter-rotate */}
            <motion.div
              className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full"
              style={{ border: '1px dashed var(--ring-dashed)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />

            {/* Avatar */}
            <motion.div
              className="relative w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] rounded-full overflow-hidden flex items-center justify-center z-10"
              style={{ background: 'var(--avatar-bg)', border: '1px solid var(--avatar-border)', boxShadow: 'var(--avatar-shadow)' }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span
                className="font-heading text-6xl sm:text-7xl font-bold select-none"
                style={{
                  background: `linear-gradient(to bottom, var(--avatar-gradient-from), var(--avatar-gradient-to))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                HP
              </span>
            </motion.div>

            {/* Floating orbs */}
            <motion.div className="absolute z-5" style={{ left: 'calc(50% - 180px)', top: 'calc(50% - 140px)' }}
              animate={{ y: [0, -10, 0], x: [0, 4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="w-8 h-8 rounded-full" style={{ background: 'var(--orb-bg)', border: '1px solid var(--orb-border)', boxShadow: 'var(--tag-shadow)' }} />
            </motion.div>
            <motion.div className="absolute z-5" style={{ left: 'calc(50% + 160px)', top: 'calc(50% + 120px)' }}
              animate={{ y: [0, 8, 0], x: [0, -3, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
              <div className="w-5 h-5 rounded-full" style={{ background: 'var(--orb-bg)', border: '1px solid var(--orb-border)' }} />
            </motion.div>

            {/* Floating icon tags */}
            {floatingTags.map((tag, i) => (
              <motion.div
                key={tag.label}
                className="absolute z-20"
                style={{ left: `calc(50% + ${tag.x}px)`, top: `calc(50% + ${tag.y}px)` }}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: tag.d + 1.0, ease },
                  scale:   { duration: 0.5, delay: tag.d + 1.0, ease: [0.34, 1.56, 0.64, 1] },
                  y:       { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: tag.d },
                }}
              >
                <motion.div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{ color: 'var(--text-muted)', background: 'var(--tag-bg)', border: '1px solid var(--tag-border)', boxShadow: 'var(--tag-shadow)', backdropFilter: 'blur(8px)' }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <img src={tag.icon} alt={tag.label} width={14} height={14} style={{ objectFit: 'contain', flexShrink: 0 }} />
                  <span className="text-[10px] font-mono font-medium">{tag.label}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}