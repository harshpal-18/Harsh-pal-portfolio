import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from './hooks/useInView'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'What technologies do you specialize in?', a: 'I specialize in React, TypeScript, TailwindCSS, and Framer Motion for frontend. On the backend, I work with Node.js, Firebase, and MongoDB — building premium, high-performance web applications.' },
  { q: 'Do you build full-stack applications?', a: 'Yes! While my primary strength is frontend and UI/UX, I build full-stack applications using Firebase, Node.js, and Express.js. Projects like StatForge demonstrate complete data flow from backend to interactive visualizations.' },
  { q: 'How do you optimize performance?', a: 'Code splitting, lazy loading, memoization, efficient re-renders, optimized assets, and modern build tools like Vite. I prioritize Core Web Vitals and smooth 60fps animations.' },
  { q: 'Are your projects responsive?', a: 'Every project is fully responsive across all devices. I use a mobile-first approach with TailwindCSS and test across multiple screen sizes and browsers.' },
  { q: 'What inspired your esports analytics projects?', a: 'As a competitive gaming enthusiast, I noticed a gap in accessible performance tracking. StatForge was born from the desire to help gamers make data-driven improvement decisions.' },
  { q: 'Are you open for internships or freelance?', a: 'Yes! I\'m currently open to internships and freelance projects. I love working on challenging projects with talented teams. Reach out through the contact section below.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref, isInView } = useInView(0.1)

  return (
    <section id="faq" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="section-label">FAQ</p>
          <h2 className="section-heading">Common <span style={{ color: '#b4a58c' }}>questions</span></h2>
          <div className="section-divider mx-auto" />
        </motion.div>
        <div className="max-w-2xl mx-auto space-y-1.5">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.06 * i }}
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: isOpen ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                  border: `1px solid rgba(0,0,0,${isOpen ? 0.07 : 0.04})`,
                  boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.04)' : 'none',
                }}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-heading text-[13px] font-medium pr-4 transition-colors duration-300" style={{ color: isOpen ? '#111111' : '#71717a' }}>{f.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={14} style={{ color: isOpen ? '#71717a' : '#a1a1aa' }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                      <div className="px-5 pb-5 text-[13px] leading-[1.8]" style={{ color: '#71717a', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '14px' }}>{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
