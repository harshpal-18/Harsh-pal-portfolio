import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'
import { Code2, BookOpen, Sparkles } from 'lucide-react'

const qualities = ['Analytical Thinking', 'Performance First', 'Lifelong Learning', 'Creative Problem Solving', 'Team Collaboration']

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.75, delay, ease } },
  exit:    { opacity: 0, y: 36, filter: 'blur(4px)', transition: { duration: 0.4, ease } },
})

const fadeLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -40, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.75, delay, ease } },
  exit:    { opacity: 0, x: -40, filter: 'blur(4px)', transition: { duration: 0.4, ease } },
})

const fadeRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,  filter: 'blur(0px)', transition: { duration: 0.75, delay, ease } },
  exit:    { opacity: 0, x: 40, filter: 'blur(4px)', transition: { duration: 0.4, ease } },
})

export default function About() {
  const { ref, isInView } = useInView(0.12)
  const state = isInView ? 'visible' : 'hidden'

  return (
    <section id="about" className="relative">
      <div className="section-container" ref={ref}>

        {/* ── Heading ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={state}
          className="mb-16"
        >
          <motion.p
            className="section-label"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            initial="hidden"
            animate={state}
          >
            {'About'.split('').map((ch, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.p>
          <h2 className="section-heading">
            A bit about{' '}
            <motion.span
              style={{ color: 'var(--accent)' }}
              variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.25, ease } } }}
              initial="hidden"
              animate={state}
            >
              me
            </motion.span>
          </h2>
          <motion.div
            className="section-divider"
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.3, ease } } }}
            initial="hidden"
            animate={state}
          />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* ── Left card ── */}
          <motion.div
            variants={fadeLeft(0.1)}
            initial="hidden"
            animate={state}
            className="lg:col-span-2"
          >
            <div className="premium-card !p-5">

              {/* Profile photo */}
              <motion.div
                className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative"
                style={{ border: '1px solid var(--surface-border)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <img
                  src="/portfolio_pic.jpeg"
                  alt="Harsh Pal"
                  className="w-full h-full object-cover object-top"
                  style={{ display: 'block' }}
                />

                {/* Gradient name overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-4"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  }}
                >
                  <p className="font-heading text-white text-[15px] font-semibold leading-tight">Harsh Pal</p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Full Stack Developer</p>
                </div>
              </motion.div>

              {/* Info rows — staggered */}
              <div className="space-y-2">
                {[
                  { icon: Code2,    l: 'Focus',    v: 'Frontend & UI/UX' },
                  { icon: BookOpen, l: 'Learning', v: 'Full-Stack Development' },
                  { icon: Sparkles, l: 'Passion',  v: 'Blending modern design with scalable development' },
                ].map((it, i) => (
                  <motion.div
                    key={it.l}
                    variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, delay: 0.3 + i * 0.1, ease } } }}
                    initial="hidden"
                    animate={state}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: 'var(--icon-bg)' }}
                  >
                    <it.icon size={13} style={{ color: 'var(--icon-color)' }} />
                    <div>
                      <span className="text-[10px] block" style={{ color: 'var(--text-faint)' }}>{it.l}</span>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{it.v}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right text ── */}
          <motion.div
            variants={fadeRight(0.2)}
            initial="hidden"
            animate={state}
            className="lg:col-span-3"
          >
            <div className="space-y-5 text-[15px] leading-[1.85]" style={{ color: 'var(--text-muted)' }}>
              {[
                'I started with curiosity about how interfaces work and evolved into building full experiences — from esports dashboards to productivity apps that feel premium.',
                "As a self-driven learner, I've built my skills through structured courses in web development, complemented by hands-on project building and continuous experimentation with modern frameworks.",
                'My journey has taken me through React, TypeScript, Design Systems, Data Visualization, and Full-stack integration. Every project pushes the bar higher.',
                "I believe great software is built at the intersection of clean code and beautiful design. That's where I thrive — crafting experiences that are both technically solid and visually compelling.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.25 + i * 0.1, ease } } }}
                  initial="hidden"
                  animate={state}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <div className="mt-12">
              <motion.p
                className="text-[10px] font-mono uppercase tracking-[0.2em] mb-4"
                style={{ color: 'var(--accent)' }}
                variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.55, ease } } }}
                initial="hidden"
                animate={state}
              >
                Core Qualities
              </motion.p>
              <div className="flex flex-wrap gap-2">
                {qualities.map((q, i) => (
                  <motion.span
                    key={q}
                    variants={{
                      hidden:  { opacity: 0, scale: 0.75, y: 10 },
                      visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.4, delay: 0.6 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] } },
                    }}
                    initial="hidden"
                    animate={state}
                    whileHover={{ scale: 1.07, y: -2 }}
                    className="px-3.5 py-1.5 rounded-full text-[11px] font-medium cursor-default"
                    style={{ color: 'var(--pill-text)', background: 'var(--pill-bg)', border: '1px solid var(--pill-border)' }}
                  >
                    {q}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}