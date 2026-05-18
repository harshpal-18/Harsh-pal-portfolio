import { motion, useAnimationFrame, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from './hooks/useInView'
import { ExternalLink, Github, BarChart3, CheckSquare, LayoutDashboard, ShieldCheck, FileText } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const projects = [
  {
    title: 'StatForge',
    sub: 'Esports Analytics Platform',
    desc: 'A comprehensive esports analytics dashboard with match statistics, performance visualizations, and a modern UI built for competitive gamers.',
    tech: ['React', 'Firebase', 'TailwindCSS', 'Chart.js'],
    icon: BarChart3,
    feat: ['Real-time tracking', 'Performance analytics', 'Leaderboards', 'Data viz'],
    preview: 'dashboard',
    github: 'https://github.com/harshpal-18/esports-analyzer.git',
    live: 'https://esports-analyzer.vercel.app',
  },
  {
    title: 'Task Planner',
    sub: 'Smart Productivity App',
    desc: 'A premium task management app with intelligent scheduling, clean animations, and an intuitive interface for organized workflows.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    icon: CheckSquare,
    feat: ['Smart organization', 'Priority system', 'Progress tracking', 'Animations'],
    preview: 'dashboard',
    github: 'https://github.com/harshpal-18/Nexus-AI.git',
    live: 'https://nexus-ai-10w.pages.dev',
  },
  {
    title: 'Resume Builder',
    sub: 'Career Development',
    desc: 'A modern resume builder platform that helps users create professional ATS-friendly resumes with live preview, customizable templates, and seamless export functionality.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Firebase', 'Framer Motion'],
    icon: FileText,
    feat: ['Live Resume Preview', 'ATS-Friendly Templates', 'PDF Exports', 'Responsive Design'],
    preview: 'dashboard',
    github: 'https://github.com/yourusername/project',
    live: 'https://yourproject.vercel.app',
  },
  {
    title: 'Analytics Dashboard',
    sub: 'Data Visualization',
    desc: 'A modern analytics dashboard with interactive charts, real-time metrics, and comprehensive data visualization.',
    tech: ['React', 'Chart.js', 'TailwindCSS', 'Node.js'],
    icon: LayoutDashboard,
    feat: ['Interactive charts', 'Real-time metrics', 'Custom filters', 'Export'],
    preview: 'dashboard',
    github: 'https://github.com/yourusername/project',
    live: 'https://yourproject.vercel.app',
  },
  {
    title: 'SecureVault',
    sub: 'Data Encryption Tool',
    desc: 'A robust data protection tool that secures your information with advanced encryption algorithms and industry-standard security protocols.',
    tech: ['Python', 'AES-256', 'React', 'Node.js'],
    icon: ShieldCheck,
    feat: ['AES-256 encryption', 'Data protection', 'Secure storage', 'Key management'],
    preview: 'encryption',
    github: 'https://github.com/yourusername/securevault',
    live: 'https://yourproject.vercel.app',
  },
]

// ── Encryption preview ──────────────────────────────────────────────────────

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'
const randCh = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

function EncryptionPreview() {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: 8 }, () => Array.from({ length: 10 }, () => randCh(CHARS.split(''))))
  )
  const frameRef = useRef(0)
  useAnimationFrame(() => {
    frameRef.current++
    if (frameRef.current % 6 !== 0) return
    setGrid(g => g.map(col => col.map(ch => (Math.random() < 0.18 ? randCh(CHARS.split('')) : ch))))
  })

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden" style={{ background: 'var(--mockup-bg)' }}>
      <div className="absolute inset-0 flex justify-around items-start pt-4 opacity-30 pointer-events-none select-none">
        {grid.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {col.map((ch, ri) => (
              <motion.span
                key={`${ci}-${ri}`}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2 + Math.random(), repeat: Infinity, delay: ci * 0.1 + ri * 0.05 }}
                className="font-mono text-[10px] leading-none"
                style={{ color: 'var(--accent)' }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <div className="relative flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute w-20 h-20 rounded-full" style={{ border: '1px solid var(--accent)' }} />
          <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            className="absolute w-20 h-20 rounded-full" style={{ border: '1px solid var(--accent)' }} />
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: '1.5px solid var(--accent)' }}>
            <ShieldCheck size={28} style={{ color: 'var(--accent)' }} />
          </div>
        </div>
        <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border: '1px solid var(--accent)' }}>
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
          <span className="font-mono text-[11px]" style={{ color: 'var(--accent)' }}>Encryption</span>
        </motion.div>
      </motion.div>
      <p className="absolute bottom-5 text-center font-mono text-[10px] px-6 leading-relaxed" style={{ color: 'var(--text-faint)' }}>
        Securing your data with advanced encryption algorithms
      </p>
    </div>
  )
}

// ── Dashboard preview ───────────────────────────────────────────────────────

function DashboardPreview() {
  return (
    <div className="absolute inset-5 sm:inset-6 rounded-xl overflow-hidden" style={{ background: 'var(--mockup-inner)', border: '1px solid var(--mockup-inner-border)', boxShadow: 'var(--mockup-inner-shadow)' }}>
      <div className="flex items-center gap-1.5 px-3.5 py-2 border-b" style={{ borderColor: 'var(--surface-border)' }}>
        {['var(--mockup-dot-1)', 'var(--mockup-dot-2)', 'var(--mockup-dot-3)'].map((bg, i) => (
          <div key={i} className="w-[6px] h-[6px] rounded-full" style={{ background: bg }} />
        ))}
        <div className="flex-1 h-3.5 rounded ml-3 max-w-[140px]" style={{ background: 'var(--icon-bg)' }} />
      </div>
      <div className="p-3 space-y-2.5">
        <div className="grid grid-cols-3 gap-1.5">
          {['2.4K', '89%', '156'].map((v, j) => (
            <div key={j} className="h-12 rounded-lg p-2" style={{ background: 'var(--mockup-stat-bg)', border: '1px solid var(--mockup-stat-border)' }}>
              <div className="h-1 rounded w-8 mb-1.5" style={{ background: 'var(--mockup-label-bg)' }} />
              <div className="text-[9px] font-mono" style={{ color: 'var(--text-muted)' }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="h-16 rounded-lg p-2.5" style={{ background: 'var(--mockup-stat-bg)', border: '1px solid var(--mockup-stat-border)' }}>
          <div className="h-1 rounded w-14 mb-2" style={{ background: 'var(--mockup-label-bg)' }} />
          <div className="flex items-end gap-[2px] h-8">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 65].map((h, k) => (
              <div key={k} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `rgba(196,169,125,${0.08 + h / 600})` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ p, i, isInView }: { p: typeof projects[0]; i: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [20, -20])
  const smoothY = useSpring(rawY, { stiffness: 50, damping: 16 })
  const state = isInView ? 'visible' : 'hidden'

  return (
    <motion.div
      ref={cardRef}
      style={{ y: smoothY }}
      variants={{
        hidden:  { opacity: 0, y: 60, scale: 0.97 },
        visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.75, delay: 0.1 * i, ease } },
      }}
      initial="hidden"
      animate={state}
    >
      <motion.div
        className="grid lg:grid-cols-2 gap-0 premium-card !p-0 overflow-hidden group"
        whileHover={{ scale: 1.01, boxShadow: '0 24px 60px -12px rgba(0,0,0,0.13)', transition: { duration: 0.3 } }}
      >
        {/* Preview */}
        <div
          className={`relative min-h-[260px] lg:min-h-[320px] overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}
          style={{ background: 'var(--mockup-bg)' }}
        >
          {p.preview === 'encryption' ? <EncryptionPreview /> : <DashboardPreview />}
        </div>

        {/* Details */}
        <div className={`p-7 lg:p-9 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
          <motion.div
            className="flex items-center gap-3 mb-4"
            variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 * i + 0.15, ease } } }}
            initial="hidden"
            animate={state}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--icon-bg)' }}>
              <p.icon size={15} style={{ color: 'var(--icon-color)' }} />
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
              <p className="text-[10px] font-mono" style={{ color: 'var(--text-faint)' }}>{p.sub}</p>
            </div>
          </motion.div>

          <motion.p
            className="text-[13px] leading-[1.7] mb-5"
            style={{ color: 'var(--text-muted)' }}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 * i + 0.22, ease } } }}
            initial="hidden"
            animate={state}
          >
            {p.desc}
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-1 mb-5"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 * i + 0.28 } } }}
            initial="hidden"
            animate={state}
          >
            {p.feat.map((f) => (
              <motion.div
                key={f}
                className="flex items-center gap-2 text-[11px]"
                style={{ color: 'var(--text-muted)' }}
                variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35 } } }}
              >
                <div className="w-[3px] h-[3px] rounded-full" style={{ background: 'var(--text-ghost)' }} /> {f}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-1.5 mb-6"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 * i + 0.35 } } }}
            initial="hidden"
            animate={state}
          >
            {p.tech.map((t) => (
              <motion.span
                key={t}
                className="px-2.5 py-1 text-[10px] font-mono rounded-full"
                style={{ color: 'var(--text-muted)', background: 'var(--pill-bg)', border: '1px solid var(--pill-border)' }}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } } }}
                whileHover={{ scale: 1.08, y: -1 }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* ── Buttons with real links ── */}
          <motion.div
            className="flex gap-2.5"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.1 * i + 0.45, ease } } }}
            initial="hidden"
            animate={state}
          >
            <motion.a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !text-[12px] !py-2 !px-5"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={12} /> Live Demo
            </motion.a>
            <motion.a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !text-[12px] !py-2 !px-5"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={12} /> Source
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  const { ref, isInView } = useInView(0.04)
  const state = isInView ? 'visible' : 'hidden'

  return (
    <section id="projects" className="relative">
      <div className="section-container" ref={ref}>

        {/* Heading */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          initial="hidden"
          animate={state}
          className="mb-16"
        >
          <motion.p
            className="section-label"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045 } } }}
            initial="hidden"
            animate={state}
          >
            {'Projects'.split('').map((ch, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
                {ch}
              </motion.span>
            ))}
          </motion.p>
          <h2 className="section-heading">
            Selected{' '}
            <motion.span
              style={{ color: 'var(--accent)' }}
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.3, ease } } }}
              initial="hidden"
              animate={state}
            >
              work
            </motion.span>
          </h2>
          <motion.div
            className="section-divider"
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: 0.85, delay: 0.4, ease } } }}
            initial="hidden"
            animate={state}
          />
        </motion.div>

        <div className="space-y-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  )
}