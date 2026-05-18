import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'
import { BookOpen, Code2, GraduationCap, Atom, Layers, Blocks } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const items = [
  { year: '2012', title: 'The Beginning',   desc: 'Started academic journey at Mercy Memorial School.',                                              icon: BookOpen, tag: 'Learning'     },
  { year: '2023', title: 'Discovery of Code',        desc: 'Started focusing on Computer Science and programming fundamentals. Began learning Java and Python.',                                          icon: Code2,    tag: 'Learning'     },
  { year: '2019 – 2025', title: 'Foundation Years',   desc: 'Developed strong foundation in Mathematics and Science. Actively participated in school-level competitions and technical activities.',                                                         icon: GraduationCap,    tag: 'Growth' },
  { year: '2025', title: 'React & Modern Frontend',           desc: 'Dived deep into React ecosystem — hooks, state management, routing, and component architecture.',                                                                          icon: Atom,  tag: 'Learning'     },
  { year: '2026', title: 'First Full-Stack Project',        desc: 'Built StatForge — a complete esports analytics platform with React, Firebase, and data visualization.',                                    icon: Layers,   tag: 'Milestone'    },
  { year: '2026-Present', title: 'Advanced Frontend Architecture',  desc: 'Mastered TypeScript, Framer Motion, TailwindCSS, and modern build tools.',                                                                 icon: Blocks,     tag: 'Milestone'    },
]

export default function Experience() {
  const { ref, isInView } = useInView(0.08)
  const state = isInView ? 'visible' : 'hidden'

  return (
    <section id="experience" className="relative">
      <div className="section-container" ref={ref}>

        {/* ── Heading ── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          initial="hidden"
          animate={state}
          className="mb-16"
        >
          <motion.p
            className="section-label"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate={state}
          >
            {'Experience'.split('').map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden:  { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.p>

          <h2 className="section-heading">
            Growth{' '}
            <motion.span
              style={{ color: 'var(--accent)' }}
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.3, ease } } }}
              initial="hidden"
              animate={state}
            >
              timeline
            </motion.span>
          </h2>

          <motion.div
            className="section-divider"
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: 0.85, delay: 0.4, ease } } }}
            initial="hidden"
            animate={state}
          />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative max-w-2xl mx-auto">

          {/* Vertical line — draws down as section enters */}
          <motion.div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: 'var(--timeline-line)', originY: 0 }}
            variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1.2, delay: 0.2, ease } } }}
            initial="hidden"
            animate={state}
          />

          {items.map((m, i) => (
            <motion.div
              key={i}
              className="relative pl-14 pb-8 last:pb-0"
              variants={{
                hidden:  { opacity: 0, x: -32, filter: 'blur(4px)' },
                visible: {
                  opacity: 1, x: 0, filter: 'blur(0px)',
                  transition: { duration: 0.6, delay: 0.15 + i * 0.1, ease },
                },
              }}
              initial="hidden"
              animate={state}
            >
              {/* Timeline dot — pops in with spring */}
              <motion.div
                className="absolute left-[16px] top-2 w-[7px] h-[7px] rounded-full"
                style={{ background: 'var(--timeline-dot-bg)', border: '1.5px solid var(--timeline-dot-border)' }}
                variants={{
                  hidden:  { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] } },
                }}
                initial="hidden"
                animate={state}
              />

              {/* Card */}
              <motion.div
                className="premium-card !py-5 !px-6"
                whileHover={{
                  x: 6,
                  boxShadow: '0 12px 32px -8px rgba(0,0,0,0.10)',
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                <div className="flex items-start gap-3">

                  {/* Icon badge — spins in */}
                  <motion.div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'var(--icon-bg)' }}
                    variants={{
                      hidden:  { rotate: -20, scale: 0.4, opacity: 0 },
                      visible: { rotate: 0,   scale: 1,   opacity: 1, transition: { duration: 0.45, delay: 0.25 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] } },
                    }}
                    initial="hidden"
                    animate={state}
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                  >
                    <m.icon size={14} style={{ color: 'var(--icon-color)' }} />
                  </motion.div>

                  <div className="flex-1">
                    {/* Year + tag */}
                    <motion.div
                      className="flex items-center gap-2 mb-1"
                      variants={{
                        hidden:  { opacity: 0, y: -6 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.3 + i * 0.1, ease } },
                      }}
                      initial="hidden"
                      animate={state}
                    >
                      <span className="text-[10px] font-mono font-medium" style={{ color: 'var(--text-faint)' }}>{m.year}</span>
                      <motion.span
                        className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                        style={{ color: 'var(--text-faint)', background: 'var(--icon-bg)' }}
                        whileHover={{ scale: 1.08 }}
                      >
                        {m.tag}
                      </motion.span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="font-heading text-[13px] font-semibold mb-1"
                      style={{ color: 'var(--text-primary)' }}
                      variants={{
                        hidden:  { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.35 + i * 0.1, ease } },
                      }}
                      initial="hidden"
                      animate={state}
                    >
                      {m.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-[12px] leading-[1.7]"
                      style={{ color: 'var(--text-muted)' }}
                      variants={{
                        hidden:  { opacity: 0, y: 6 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 + i * 0.1, ease } },
                      }}
                      initial="hidden"
                      animate={state}
                    >
                      {m.desc}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}