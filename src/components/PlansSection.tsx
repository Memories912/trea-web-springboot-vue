'use client'

import { useRef } from 'react'
import { useT } from '@/i18n'
import { gsap, useGsap, ScrollTrigger, SplitText, CustomBounce, CustomEase, ScrambleTextPlugin, CustomWiggle, Flip, Observer, Physics2DPlugin, Draggable, InertiaPlugin } from '@/lib/gsap'

export default function PlansSection() {
  const { t } = useT()
  const gridRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef(false)

  const plans = [
    {
      name: t('plans.basicName'),
      badge: t('plans.basicBadge'),
      subtitle: t('plans.basicSubtitle'),
      price: t('plans.basicPrice'),
      priceLabel: t('plans.basicPriceLabel'),
      cta: t('plans.basicCta'),
      featured: false,
      features: [1,2,3,4,5,6,7].map(i => ({ text: t(`plans.basicFeat${i}`), ok: i !== 3 && i !== 7 })),
    },
    {
      name: t('plans.proName'),
      badge: t('plans.proBadge'),
      subtitle: t('plans.proSubtitle'),
      price: t('plans.proPrice'),
      priceLabel: t('plans.proPriceLabel'),
      cta: t('plans.proCta'),
      featured: true,
      features: [1,2,3,4,5,6,7].map(i => ({ text: t(`plans.proFeat${i}`), ok: true })),
    },
  ]

  const containerRef = useGsap(({ gsap }) => {
    // ScrollTrigger: section reveal
    gsap.from('.plans-header', {
      scrollTrigger: { trigger: '.plans-section', start: 'top 80%' },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'customEase',
    })

    gsap.from('.plan-card', {
      scrollTrigger: { trigger: '.plans-section', start: 'top 80%' },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [])

  const handleFlipToggle = () => {
    if (!gridRef.current) return
    const state = Flip.getState('.plan-card')
    toggleRef.current = !toggleRef.current
    const grid = gridRef.current
    grid.classList.toggle('md:grid-cols-2', !toggleRef.current)
    grid.classList.toggle('flex', toggleRef.current)
    grid.classList.toggle('flex-col', toggleRef.current)
    grid.classList.toggle('gap-6', toggleRef.current)
    Flip.from(state, { duration: 0.7, ease: 'elastic.out(1,0.4)', absolute: false, stagger: 0.05 })
  }

  return (
    <section id="plans" className="plans-section section-padding relative">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#2c6e6e]/5 rounded-full blur-[100px]" />
      <div className="section-container relative z-10">
        <div className="plans-header text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
            <span className="w-6 h-px bg-[#b8860b]/50" />
            {t('plans.section')}
            <span className="w-6 h-px bg-[#b8860b]/50" />
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-4">
            {t('plans.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('plans.desc')}
          </p>

          {/* Flip toggle button */}
          <button
            onClick={handleFlipToggle}
            className="mt-4 px-4 py-2 text-xs font-medium text-[#b8860b] border border-[#b8860b]/30 rounded-lg hover:bg-[#b8860b]/5 transition-all"
          >
            Flip Layout
          </button>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`plan-card flowing-card rounded-2xl p-8 md:p-10 ${
                plan.featured
                  ? 'bg-gradient-to-br from-[#b8860b]/10 via-[#2c6e6e]/5 to-transparent border border-[#b8860b]/20'
                  : 'glass-card'
              }`}
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                plan.featured
                  ? 'bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground'
                  : 'bg-black/[0.05] text-gray-600'
              }`}>
                {plan.badge}
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${plan.featured ? 'text-foreground' : 'text-foreground/90'}`}>
                {plan.name}
              </h3>
              <p className="text-sm text-gray-500 mb-6">{plan.subtitle}</p>
              <div className="mb-8">
                <span className={`text-5xl font-extrabold ${plan.featured ? 'gradient-text' : 'text-foreground'}`}>
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500 ml-2">{plan.priceLabel}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-500">
                    <span className={`mt-0.5 ${f.ok ? 'text-emerald-400' : 'text-red-400/60'}`}>
                      {f.ok ? '✓' : '✗'}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <a href="/plans"
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                  plan.featured
                    ? 'bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white hover:shadow-lg hover:shadow-[#b8860b]/20'
                    : 'glass-light text-gray-600 hover:text-gray-900'
                }`}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
