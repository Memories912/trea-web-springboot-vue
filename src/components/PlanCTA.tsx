'use client'

import { useT } from '@/i18n'

export default function PlanCTA() {
  const { t } = useT()

  return (
    <section className="section-padding relative">
      <div className="section-container">
        <div className="rounded-3xl p-12 md:p-16 text-center bg-white border border-[#b8860b]/10 shadow-xl shadow-[#b8860b]/3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/3 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2c6e6e]/3 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3" />

          <h2 className="section-title gradient-text relative z-10 gsap-reveal-up">{t('plans.title')}</h2>
          <p className="section-subtitle mx-auto mb-8 relative z-10">{t('plans.desc')}</p>
          <a href="/plans" className="btn-primary text-base px-10 py-4 relative z-10">
            {t('nav.plans')} →
          </a>
        </div>
      </div>
    </section>
  )
}
