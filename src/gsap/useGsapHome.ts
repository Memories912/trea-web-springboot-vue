'use client'

import { useEffect, useRef } from 'react'

export default function useGsapHome() {
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    // Respect reduced motion — skip most GSAP animations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const triggers: { kill: () => void }[] = []

    ;(async () => {
      const gsap = (await import('gsap')).default
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
      const ScrollToPlugin = (await import('gsap/ScrollToPlugin')).default

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

      // ─── 1. Hero Entrance — smooth timeline ───
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      const heroBadge = document.querySelector('.hero-badge')
      const heroHeading = document.querySelector('.gsap-hero-heading')
      const heroDesc = document.querySelector('.gsap-hero-desc')
      const heroCta = document.querySelector('.gsap-hero-cta-group')
      const heroStats = document.querySelector('.gsap-stat-section')
      const cityLabels = document.querySelectorAll('.gsap-city-label')

      if (heroBadge) gsap.set(heroBadge, { opacity: 0 })
      if (heroHeading) gsap.set(heroHeading, { opacity: 0 })
      if (heroDesc) gsap.set(heroDesc, { opacity: 0 })
      if (heroCta) gsap.set(heroCta, { opacity: 0 })
      if (heroStats) gsap.set(heroStats, { opacity: 0 })

      if (heroBadge) heroTimeline.to(heroBadge, { opacity: 1, y: 0, duration: 0.5 }, 0.15)
      if (heroHeading) heroTimeline.fromTo(heroHeading,
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.3
      )
      if (heroDesc) heroTimeline.fromTo(heroDesc,
        { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.5
      )
      if (heroCta) heroTimeline.fromTo(heroCta,
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.65
      )
      if (heroStats) heroTimeline.fromTo(heroStats,
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.75
      )
      if (cityLabels.length) {
        heroTimeline.fromTo(cityLabels,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)' },
          0.6
        )
      }

      // ─── 2. Hero parallax ───
      const heroSection = document.querySelector('.gsap-hero')
      if (heroSection) {
        ScrollTrigger.create({
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self: any) => {
            gsap.set(heroSection, { y: -(self.progress * 80) })
          },
        } as any)
      }

      // ─── 3. Section reveals ───
      document.querySelectorAll('.gsap-reveal-up, .gsap-reveal-left, .gsap-reveal-right').forEach((el) => {
        const isLeft = el.classList.contains('gsap-reveal-left')
        const isRight = el.classList.contains('gsap-reveal-right')
        const from = isLeft ? { x: -30 } : isRight ? { x: 30 } : { y: 40 }
        const to = Object.keys(from).reduce((a: any, k) => ({ ...a, [k]: 0 }), {})
        const st = ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => gsap.fromTo(el, { ...from, opacity: 0 }, { ...to, opacity: 1, duration: 0.7, ease: 'power3.out' }),
        } as any)
        triggers.push(st as any)
      })

      // ─── 4. Stats counter ───
      const statValues = document.querySelectorAll('.gsap-stat-value')
      if (statValues.length) {
        type Counter = { el: Element; target: number; current: number }
        const counters: Counter[] = []
        statValues.forEach((el) => {
          const raw = el.textContent?.replace(/[^0-9.]/g, '') || '0'
          counters.push({ el, target: parseFloat(raw), current: 0 })
        })

        ScrollTrigger.create({
          trigger: statValues[0].closest('.gsap-stat-section') || statValues[0],
          start: 'top 85%',
          once: true,
          onEnter: () => {
            counters.forEach((c) => {
              const duration = 1200
              const start = performance.now()
              const anim = (now: number) => {
                const t = Math.min((now - start) / duration, 1)
                c.current = Math.round(c.target * (1 - Math.pow(1 - t, 3)))
                c.el.textContent = c.target >= 1000 ? c.current.toLocaleString() + '+' : String(c.current) + '+'
                if (t < 1) requestAnimationFrame(anim)
              }
              requestAnimationFrame(anim)
            })
          },
        } as any)
      }

      // ─── 5. Back to top ───
      const btt = document.querySelector('.gsap-backtotop')
      if (btt) {
        btt.addEventListener('click', () => gsap.to(window, { scrollTo: { y: 0 }, duration: 0.8, ease: 'power3.inOut' }))
        ScrollTrigger.create({
          start: 400,
          onEnter: () => gsap.to(btt, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }),
          onLeaveBack: () => gsap.to(btt, { opacity: 0, scale: 0, duration: 0.25 }),
        } as any)
      }

      // ─── 6. Scroll-to links ───
      document.querySelectorAll('.gsap-scrollto').forEach((l) => {
        l.addEventListener('click', (e: Event) => {
          e.preventDefault()
          const target = (l as HTMLElement).getAttribute('data-scrollto') || (l as HTMLAnchorElement).getAttribute('href')
          if (target) gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 0.8, ease: 'power3.inOut' })
        })
      })

      // ─── 7. Parallax backgrounds ───
      document.querySelectorAll('[data-parallax-speed]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.3')
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self: any) => gsap.set(el, { y: (self.progress - 0.5) * speed * 60 }),
        } as any)
      })

      ScrollTrigger.refresh()
    })()

    return () => { triggers.forEach((st) => { try { st.kill() } catch {} }) }
  }, [])
}
