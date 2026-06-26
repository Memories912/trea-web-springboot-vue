'use client'

import { useEffect, useRef } from 'react'

/**
 * Shared GSAP animations for all sub-pages (about, faq, payment, plans, products, services).
 * Lightweight — only runs ScrollTrigger + ScrollToPlugin.
 */
export default function useGsapPage() {
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const triggers: { kill: () => void }[] = []

    ;(async () => {
      const gsap = (await import('gsap')).default
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
      gsap.registerPlugin(ScrollTrigger)

      // ─── 1. Hero entrance ───
      const heroBadge = document.querySelector('.page-hero-badge')
      const heroTitle = document.querySelector('.page-hero-title')
      const heroDesc = document.querySelector('.page-hero-desc')
      const heroExtra = document.querySelector('.page-hero-extra')

      if (heroBadge || heroTitle || heroDesc || heroExtra) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        if (heroBadge) tl.fromTo(heroBadge, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0)
        if (heroTitle) tl.fromTo(heroTitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.15)
        if (heroDesc) tl.fromTo(heroDesc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.35)
        if (heroExtra) tl.fromTo(heroExtra, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5)
      }

      // ─── 2. Card stagger reveal ───
      document.querySelectorAll('.page-card').forEach((el, i) => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, delay: i * 0.06, ease: 'power2.out' }
            )
          },
        })
        triggers.push(st as any)
      })

      // ─── 3. Section reveal (fade-up for any section wrapper) ───
      document.querySelectorAll('.page-section').forEach((el) => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
          },
        })
        triggers.push(st as any)
      })

      // ─── 4. FAQ accordion smooth toggle ───
      document.querySelectorAll('.faq-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
          const content = (btn as HTMLElement).nextElementSibling as HTMLElement | null
          if (!content) return
          const isOpen = content.classList.contains('faq-open')
          if (isOpen) {
            gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut', onComplete: () => content.classList.remove('faq-open') })
          } else {
            content.classList.add('faq-open')
            gsap.fromTo(content, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' })
          }
        })
      })

      // ─── 5. CTA entrance ───
      document.querySelectorAll('.page-cta').forEach((el) => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(el, { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' })
          },
        })
        triggers.push(st as any)
      })

      ScrollTrigger.refresh()
    })()

    return () => { triggers.forEach((st) => { try { st.kill() } catch {} }) }
  }, [])
}
