'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; triggerOnce?: boolean }
) {
  const { triggerOnce = true, threshold = 0.1, rootMargin = '0px' } = options || {}
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [triggerOnce, threshold, rootMargin])

  return { ref, isVisible }
}

// ─── Counter animation hook ──────────────────────────────

export function useCounter(target: number, enabled: boolean, duration = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let current = 0
    const increment = Math.max(1, Math.ceil(target / (duration / 16)))
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setValue(current)
    }, 16)
    return () => clearInterval(timer)
  }, [target, enabled, duration])

  return value
}
