import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // On mobile, use a lower threshold so animations start earlier
    const isMobile = window.innerWidth < 768
    const mobileThreshold = Math.min(threshold, 0.05)
    const finalThreshold = isMobile ? mobileThreshold : threshold

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: finalThreshold,
        // Start observing 100px before element enters viewport on mobile
        rootMargin: isMobile ? '0px 0px -20px 0px' : '0px',
      }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}