'use client'

import { useState, useRef, useEffect } from 'react'
import { useT } from '@/i18n'
import { gsap, useGsap, ScrollTrigger, SplitText, CustomBounce, CustomEase, ScrambleTextPlugin, CustomWiggle, Flip, Observer, Physics2DPlugin, Draggable, InertiaPlugin } from '@/lib/gsap'

export default function FAQSection() {
  const { t } = useT()
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const contentRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const arrowRefs = useRef<Map<number, HTMLSpanElement>>(new Map())

  const faqs = [
    { q: t('faq.1.q'), a: t('faq.1.a') },
    { q: t('faq.2.q'), a: t('faq.2.a') },
    { q: t('faq.3.q'), a: t('faq.3.a') },
    { q: t('faq.4.q'), a: t('faq.4.a') },
    { q: t('faq.5.q'), a: t('faq.5.a') },
    { q: t('faq.6.q'), a: t('faq.6.a') },
  ]

  const toggleFAQ = (i: number) => {
    const newOpen = openIdx === i ? null : i

    // Close previous
    if (openIdx !== null && openIdx !== i) {
      const prevContent = contentRefs.current.get(openIdx)
      const prevArrow = arrowRefs.current.get(openIdx)
      if (prevContent) {
        gsap.to(prevContent, { height: 0, opacity: 0, duration: 0.35, ease: 'customEase' })
      }
      if (prevArrow) {
        gsap.to(prevArrow, { rotate: 0, duration: 0.3, ease: 'power2.out' })
      }
    }

    // Open/close target
    const content = contentRefs.current.get(i)
    const arrow = arrowRefs.current.get(i)
    if (content && newOpen !== null) {
      content.style.height = 'auto'
      const h = content.offsetHeight
      content.style.height = '0px'
      // Force reflow
      content.offsetHeight
      gsap.to(content, { height: h, opacity: 1, duration: 0.4, ease: 'elastic.out(1,0.4)' })
    } else if (content) {
      gsap.to(content, { height: 0, opacity: 0, duration: 0.35, ease: 'customEase' })
    }
    if (arrow) {
      gsap.to(arrow, { rotate: newOpen === i ? 180 : 0, duration: 0.3, ease: 'power2.out' })
    }

    setOpenIdx(newOpen)
  }

  const containerRef = useGsap(({ gsap }) => {
    // ScrollTrigger reveal for FAQ section
    gsap.from('.faq-header', {
      scrollTrigger: { trigger: '.faq-section', start: 'top 85%' },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'customEase',
    })

    // Stagger reveal FAQ items
    gsap.from('.faq-item', {
      scrollTrigger: { trigger: '.faq-section', start: 'top 85%' },
      y: 20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [])

  const setContentRef = (i: number, el: HTMLDivElement | null) => {
    if (el) contentRefs.current.set(i, el)
  }
  const setArrowRef = (i: number, el: HTMLSpanElement | null) => {
    if (el) arrowRefs.current.set(i, el)
  }

  return (
    <section id="faq" className="faq-section section-padding relative">
      <div className="section-container">
        <div className="faq-header text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
            <span className="w-6 h-px bg-[#b8860b]/50" />
            {t('faq.section')}
            <span className="w-6 h-px bg-[#b8860b]/50" />
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-4">
            {t('faq.title')}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                onClick={() => toggleFAQ(i)}
                className={`w-full text-left glass-card rounded-xl p-5 transition-all ${
                  openIdx === i ? 'border-[#b8860b]/20' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-foreground/90">{faq.q}</span>
                  <span
                    ref={(el) => setArrowRef(i, el)}
                    className="text-[#b8860b]/60 flex-shrink-0 inline-block"
                  >
                    ▼
                  </span>
                </div>
                <div
                  ref={(el) => setContentRef(i, el)}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <p className="text-sm text-gray-500 leading-relaxed pt-4 border-t border-gray-200/50 mt-4">
                    {faq.a}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
