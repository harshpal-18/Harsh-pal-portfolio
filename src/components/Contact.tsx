import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useInView } from './hooks/useInView'
import { Mail, Github, Linkedin, MapPin, Clock, Send, MessageCircle, CheckCircle, AlertCircle, Loader } from 'lucide-react'

// ── EmailJS config — replace with your real keys ──────────────────────────
const EMAILJS_SERVICE_ID  = 'service_xki9ime'   // 👈 from emailjs.com dashboard
const EMAILJS_TEMPLATE_ID = 'template_2nqxk3r'  // 👈 from emailjs.com dashboard
const EMAILJS_PUBLIC_KEY  = 'WU-SsX5iMH-dmQGzW'     // 👈 from emailjs.com Account tab

const ease = [0.16, 1, 0.3, 1] as const

const info = [
  { icon: Mail,          label: 'Email',    value: 'its.me.harshp0@gmail.com',      href: 'mailto:its.me.harshp0@gmail.com'        },
  { icon: Github,        label: 'GitHub',   value: 'github.com/harshpal-18',         href: 'https://github.com/harshpal-18'         },
  { icon: Linkedin,      label: 'LinkedIn', value: 'linkedin.com/in/harsh-pal-018h', href: 'https://linkedin.com/in/harsh-pal-018h' },
  { icon: MessageCircle, label: 'Discord',  value: 'harsh#dev',                      href: '#'                                      },
  { icon: MapPin,        label: 'Location', value: 'India',                          href: '#'                                      },
  { icon: Clock,         label: 'Status',   value: 'Open for Internships',           href: '#'                                      },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { ref, isInView } = useInView(0.08)
  const state = isInView ? 'visible' : 'hidden'

  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [status,  setStatus]  = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:       form.name,       // matches {{name}} in your template
          from_name:  form.name,       // matches {{from_name}} in From Name field
          from_email: form.email,      // matches {{from_email}} in From Email field
          email:      form.email,      // matches {{email}} in Reply To field
          message:    form.message,    // matches {{message}} in your template
        },
        EMAILJS_PUBLIC_KEY
    )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      // Reset back to idle after 4 seconds
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputStyle = (f: string) => ({
    background: focused === f ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
    border: `1px solid rgba(0,0,0,${focused === f ? 0.1 : 0.05})`,
    boxShadow: focused === f ? '0 0 20px rgba(0,0,0,0.03)' : 'none',
  })

  const buttonLabel = () => {
    if (status === 'sending') return <><Loader size={14} className="animate-spin" /> Sending...</>
    if (status === 'sent')    return <><CheckCircle size={14} /> Sent!</>
    if (status === 'error')   return <><AlertCircle size={14} /> Try Again</>
    return <><Send size={14} /> Send Message</>
  }

  const buttonColor = () => {
    if (status === 'sent')  return { background: '#22c55e', borderColor: '#22c55e' }
    if (status === 'error') return { background: '#ef4444', borderColor: '#ef4444' }
    return {}
  }

  return (
    <section id="contact" className="relative">
      <div className="section-container" ref={ref}>

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-16"
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          initial="hidden"
          animate={state}
        >
          <motion.p
            className="section-label"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate={state}
          >
            {'Contact'.split('').map((ch, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.p>

          <h2 className="section-heading">
            Let's{' '}
            <motion.span
              style={{ color: '#b4a58c' }}
              variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.28, ease } } }}
              initial="hidden"
              animate={state}
            >
              connect
            </motion.span>
          </h2>

          <motion.p
            className="section-subtext mx-auto"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.35, ease } } }}
            initial="hidden"
            animate={state}
          >
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </motion.p>

          <motion.div
            className="section-divider mx-auto"
            variants={{ hidden: { scaleX: 0, originX: 0.5 }, visible: { scaleX: 1, transition: { duration: 0.85, delay: 0.45, ease } } }}
            initial="hidden"
            animate={state}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* ── Form ── */}
          <motion.div
            variants={{
              hidden:  { opacity: 0, x: -40, filter: 'blur(4px)' },
              visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.75, delay: 0.15, ease } },
            }}
            initial="hidden"
            animate={state}
          >
            <form onSubmit={handleSubmit} className="premium-card space-y-4">

              {/* Name + Email */}
              {(['name', 'email'] as const).map((f, fi) => (
                <motion.div
                  key={f}
                  className="relative"
                  variants={{
                    hidden:  { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.3 + fi * 0.08, ease } },
                  }}
                  initial="hidden"
                  animate={state}
                >
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focused === f || form[f] ? 'top-2 text-[9px]' : 'top-3.5 text-[13px]'}`}
                    style={{ color: '#8b8b93' }}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </label>
                  <input
                    type={f === 'email' ? 'email' : 'text'}
                    value={form[f]}
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                    onFocus={() => setFocused(f)}
                    onBlur={() => setFocused(null)}
                    required
                    disabled={status === 'sending'}
                    className="w-full pt-6 pb-2.5 px-4 rounded-xl text-sm outline-none transition-all duration-300 disabled:opacity-60"
                    style={{ ...inputStyle(f), color: '#111111' }}
                  />
                </motion.div>
              ))}

              {/* Message */}
              <motion.div
                className="relative"
                variants={{
                  hidden:  { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.46, ease } },
                }}
                initial="hidden"
                animate={state}
              >
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focused === 'message' || form.message ? 'top-2 text-[9px]' : 'top-3.5 text-[13px]'}`}
                  style={{ color: '#8b8b93' }}
                >
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                  rows={4}
                  disabled={status === 'sending'}
                  className="w-full pt-6 pb-2.5 px-4 rounded-xl text-sm outline-none resize-none transition-all duration-300 disabled:opacity-60"
                  style={{ ...inputStyle('message'), color: '#111111' }}
                />
              </motion.div>

              {/* Submit button */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.54, ease } } }}
                initial="hidden"
                animate={state}
              >
                <motion.button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{ ...buttonColor() }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={status}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      {buttonLabel()}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                {/* Status messages */}
                <AnimatePresence>
                  {status === 'sent' && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-[11px] text-center mt-2.5 font-mono"
                      style={{ color: '#22c55e' }}
                    >
                      ✓ Message sent! I'll get back to you soon.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-[11px] text-center mt-2.5 font-mono"
                      style={{ color: '#ef4444' }}
                    >
                      ✕ Something went wrong. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

            </form>
          </motion.div>

          {/* ── Info cards ── */}
          <motion.div
            className="space-y-2"
            variants={{
              hidden:  { opacity: 0, x: 40, filter: 'blur(4px)' },
              visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.75, delay: 0.25, ease } },
            }}
            initial="hidden"
            animate={state}
          >
            {/* Status badge */}
            <motion.div
              className="premium-card !p-4 flex items-center gap-3.5 mb-3"
              variants={{ hidden: { opacity: 0, y: -12, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, delay: 0.3, ease } } }}
              initial="hidden"
              animate={state}
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
                <div className="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-40" style={{ background: '#22c55e' }} />
              </div>
              <div>
                <p className="font-heading text-[13px] font-semibold" style={{ color: '#111111' }}>Open for Internships</p>
                <p className="text-[10px]" style={{ color: '#8b8b93' }}>Actively looking for opportunities</p>
              </div>
            </motion.div>

            {/* Contact rows */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.38 } } }}
              initial="hidden"
              animate={state}
            >
              {info.map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="premium-card !p-3.5 flex items-center gap-3.5 group block mb-2"
                  variants={{
                    hidden:  { opacity: 0, x: 20, scale: 0.97 },
                    visible: { opacity: 1, x: 0,  scale: 1,    transition: { duration: 0.4, ease } },
                  }}
                  whileHover={{ x: -4, scale: 1.02, transition: { duration: 0.22, ease: 'easeOut' } }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.025)' }}
                    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                  >
                    <c.icon size={14} className="transition-colors duration-300" style={{ color: '#8b8b93' }} />
                  </motion.div>
                  <div>
                    <p className="text-[10px]" style={{ color: '#8b8b93' }}>{c.label}</p>
                    <p className="text-[12px] group-hover:text-zinc-800 transition-colors" style={{ color: '#71717a' }}>{c.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}