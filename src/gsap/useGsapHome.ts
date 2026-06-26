'use client'

import { useEffect, useRef } from 'react'

export default function useGsapHome() {
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    let triggers: globalThis.ScrollTrigger[] = []

    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin')

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

      // ─── Section reveals — light fade-up only ───
      document.querySelectorAll('.gsap-reveal-up, .gsap-reveal-left, .gsap-reveal-right').forEach((el) => {
        const dir: any = el.classList.contains('gsap-reveal-left') ? { x: -30 }
          : el.classList.contains('gsap-reveal-right') ? { x: 30 }
          : { y: 40 }
        const st = ScrollTrigger.create({
          trigger: el, start: 'top 92%', once: true,
          onEnter: () => gsap.fromTo(el, { ...dir, opacity: 0 }, { ...Object.keys(dir).reduce((a: any, k) => ({ ...a, [k]: 0 }), {}), opacity: 1, duration: 0.6, ease: 'power2.out' }),
        })
        triggers.push(st)
      })

      // ─── Back to top ───
      const btt = document.querySelector('.gsap-backtotop')
      if (btt) {
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
        ScrollTrigger.create({
          start: 400,
          onEnter: () => gsap.to(btt, { opacity: 1, scale: 1, duration: 0.3 }),
          onLeaveBack: () => gsap.to(btt, { opacity: 0, scale: 0, duration: 0.3 }),
        })
      }

      // Hero entrance handled via CSS animations in HeroSection.tsx

      // ─── Scroll-to links ───
      document.querySelectorAll('.gsap-scrollto').forEach((l) => {
        l.addEventListener('click', (e: Event) => {
          e.preventDefault()
          const t = (l as HTMLElement).getAttribute('data-scrollto') || (l as HTMLAnchorElement).getAttribute('href')
          if (t) gsap.to(window, { scrollTo: { y: t, offsetY: 80 }, duration: 0.8, ease: 'power2.out' })
        })
      })

      ScrollTrigger.refresh()
    })()

    return () => { triggers.forEach((st) => { try { st.kill() } catch {} }) }
  }, [])
}
