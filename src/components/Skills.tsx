import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from './hooks/useInView'
import { Code2, Server, Palette, BarChart3, Wrench } from 'lucide-react'

interface Skill { name: string; level: number; icon?: string }
interface Cat { title: string; icon: React.ElementType; skills: Skill[] }

const ease = [0.16, 1, 0.3, 1] as const

const cats: Cat[] = [
  {
    title: 'Frontend', icon: Code2, skills: [
      { name: 'React',         level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript',    level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'TailwindCSS',   level: 92, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Framer Motion', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' },
      { name: 'HTML/CSS',      level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'JavaScript',    level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ]
  },
  {
    title: 'Backend', icon: Server, skills: [
      { name: 'Node.js',    level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Firebase',   level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'MongoDB',    level: 68, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ]
  },
  {
    title: 'Design', icon: Palette, skills: [
      { name: 'Figma',             level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Responsive Design', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Design Systems',    level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg' },
    ]
  },
  {
    title: 'Analytics', icon: BarChart3, skills: [
      { name: 'Chart.js', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg' },
      { name: 'Python',   level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Data Viz', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    ]
  },
  {
    title: 'Tools', icon: Wrench, skills: [
      { name: 'Git / GitHub', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code',      level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Vite',         level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'Vercel',       level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    ]
  },
]

function Bar({ skill, isInView, delay }: { skill: Skill; isInView: boolean; delay: number }) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, x: -16 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
      }}
    >
      <div className="flex justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {skill.icon && (
            <motion.img
              variants={{
                hidden:  { opacity: 0, scale: 0.3, rotate: -25 },
                visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.38, ease: [0.34, 1.56, 0.64, 1] } },
              }}
              src={skill.icon}
              alt={skill.name}
              width={14}
              height={14}
              style={{ objectFit: 'contain', flexShrink: 0 }}
            />
          )}
          <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{skill.name}</span>
        </div>
        <motion.span
          className="text-[10px] font-mono font-medium"
          style={{ color: 'var(--text-faint)' }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.7 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--mockup-bar-bg)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay, ease }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, var(--accent-divider-end), var(--accent-divider))` }}
        />
      </div>
    </motion.div>
  )
}

function SkillCard({ cat, ci, isInView }: { cat: Cat; ci: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [28, -28])
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 18 })
  const state = isInView ? 'visible' : 'hidden'

  return (
    <motion.div
      ref={cardRef}
      style={{ y: smoothY }}
      variants={{
        hidden:  { opacity: 0, y: 56, scale: 0.96 },
        visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.7, delay: ci * 0.09, ease } },
      }}
      initial="hidden"
      animate={state}
      whileHover={{ y: -8, boxShadow: '0 20px 48px -10px rgba(0,0,0,0.12)', transition: { duration: 0.3 } }}
      className="premium-card"
    >
      <div className="flex items-center gap-3 mb-5">
        <motion.div
          variants={{
            hidden:  { opacity: 0, rotate: -20, scale: 0.4 },
            visible: { opacity: 1, rotate: 0,   scale: 1,   transition: { duration: 0.5, delay: ci * 0.09 + 0.1, ease: [0.34, 1.56, 0.64, 1] } },
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--icon-bg)' }}
          whileHover={{ rotate: [0, -12, 12, 0], transition: { duration: 0.45 } }}
        >
          <cat.icon size={15} style={{ color: 'var(--icon-color)' }} />
        </motion.div>
        <motion.h3
          className="font-heading text-[13px] font-semibold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
          variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, delay: ci * 0.09 + 0.15, ease } } }}
        >
          {cat.title}
        </motion.h3>
      </div>

      <motion.div
        className="space-y-4"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
        initial="hidden"
        animate={state}
      >
        {cat.skills.map((s, si) => (
          <Bar key={s.name} skill={s} isInView={isInView} delay={ci * 0.06 + si * 0.08 + 0.12} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, isInView } = useInView(0.08)
  const sectionRef = useRef<HTMLDivElement>(null)
  const state = isInView ? 'visible' : 'hidden'

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center start'] })
  const headingY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -20]), { stiffness: 60, damping: 20 })

  return (
    <section id="skills" className="relative" ref={sectionRef}>
      <div className="section-container" ref={ref}>

        {/* Heading */}
        <motion.div style={{ y: headingY }} className="mb-16">
          <motion.p
            className="section-label"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045 } } }}
            initial="hidden"
            animate={state}
          >
            {'Skills'.split('').map((ch, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
                {ch}
              </motion.span>
            ))}
          </motion.p>
          <h2 className="section-heading">
            Technologies I{' '}
            <motion.span
              style={{ color: 'var(--accent)' }}
              variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, delay: 0.28, ease } } }}
              initial="hidden"
              animate={state}
            >
              work with
            </motion.span>
          </h2>
          <motion.div
            className="section-divider"
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, delay: 0.42, ease } } }}
            initial="hidden"
            animate={state}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((c, ci) => (
            <SkillCard key={c.title} cat={c} ci={ci} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  )
}