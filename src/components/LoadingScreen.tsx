import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')

  useEffect(() => {
    // Smoothly increment progress bar
    const duration = 2000 // 2 seconds total
    const interval = 16 // ~60fps
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current++
      const p = Math.min(100, Math.round((current / steps) * 100))
      setProgress(p)
      if (p >= 100) {
        clearInterval(timer)
        setTimeout(() => setPhase('done'), 300)
        setTimeout(() => setVisible(false), 900)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          {/* ── Centre content ── */}
          <div className="flex flex-col items-center gap-8">

            {/* HP monogram with animated rings */}
            <div className="relative flex items-center justify-center">

              {/* Outer slow-spin ring */}
              <motion.div
                className="absolute w-28 h-28 rounded-full"
                style={{ border: '1px solid var(--ring-border)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--accent-dot)' }}
                />
              </motion.div>

              {/* Inner counter-spin dashed ring */}
              <motion.div
                className="absolute w-20 h-20 rounded-full"
                style={{ border: '1px dashed var(--ring-dashed)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Avatar circle */}
              <motion.div
                className="relative w-16 h-16 rounded-full flex items-center justify-center z-10"
                style={{
                  background: 'var(--avatar-bg)',
                  border: '1px solid var(--avatar-border)',
                  boxShadow: 'var(--avatar-shadow)',
                }}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.span
                  className="font-heading text-xl font-bold select-none"
                  style={{
                    background: `linear-gradient(to bottom, var(--avatar-gradient-from), var(--avatar-gradient-to))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={phase === 'done' ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  HP
                </motion.span>
              </motion.div>

              {/* Pulse glow */}
              <motion.div
                className="absolute w-28 h-28 rounded-full"
                style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Name + role */}
            <div className="flex flex-col items-center gap-1">
              <motion.p
                className="font-heading font-bold tracking-[-0.03em]"
                style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                Harsh Pal
              </motion.p>
              <motion.p
                className="font-mono text-[11px] tracking-[0.18em] uppercase"
                style={{ color: 'var(--text-faint)' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                Frontend Developer
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Track */}
              <div
                className="w-48 h-[2px] rounded-full overflow-hidden"
                style={{ background: 'var(--mockup-bar-bg)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, var(--accent-divider-end), var(--accent-divider))`,
                    transition: 'width 0.016s linear',
                  }}
                />
              </div>

              {/* Percentage */}
              <motion.span
                className="font-mono text-[10px]"
                style={{ color: 'var(--text-faint)' }}
              >
                {progress}%
              </motion.span>
            </motion.div>

          </div>

          {/* Bottom label */}
          <motion.p
            className="absolute bottom-8 font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{ color: 'var(--text-ghost)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Portfolio · {new Date().getFullYear()}
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  )
}