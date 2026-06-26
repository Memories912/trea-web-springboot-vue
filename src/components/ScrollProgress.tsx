'use client'

import { useEffect, useRef } from 'react'

/**
 * Thin gold scroll progress bar at the very top of the page.
 * Uses transform scaleX — no layout thrashing, GPU composited.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let ticking = false

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  )
}
