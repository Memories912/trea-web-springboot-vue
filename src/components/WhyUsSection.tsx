'use client'

import { useT } from '@/i18n'

export default function WhyUsSection() {
  const { t } = useT()

  const whys = [
    { num: '01', title: t('why.1.title'), desc: t('why.1.desc'), icon: '🎯' },
    { num: '02', title: t('why.2.title'), desc: t('why.2.desc'), icon: '💎' },
    { num: '03', title: t('why.3.title'), desc: t('why.3.desc'), icon: '⚡' },
    { num: '04', title: t('why.4.title'), desc: t('why.4.desc'), icon: '🛡️' },
    { num: '05', title: t('why.5.title'), desc: t('why.5.desc'), icon: '🔗' },
    { num: '06', title: t('why.6.title'), desc: t('why.6.desc'), icon: '📊' },
  ]

  return (
    <section className="why-section section-padding relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#2c6e6e]/4 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#b8860b]/3 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        <div className="why-header text-center mb-16 gsap-reveal-up">
          <span className="section-badge justify-center">
            <span className="w-6 h-px bg-[#b8860b]/40" />
            {t('why.section')}
            <span className="w-6 h-px bg-[#b8860b]/40" />
          </span>
          <h2 className="section-title gradient-text">{t('why.title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whys.map((w) => (
            <div key={w.num} className="card-elevated p-6 group relative overflow-hidden transition-transform hover:-translate-y-1">
              <div className="absolute -top-4 -right-2 text-7xl font-black text-[#b8860b]/4 select-none leading-none">
                {w.num}
              </div>
              <div className="relative z-10 text-2xl mb-4 w-12 h-12 rounded-xl bg-[#b8860b]/5 flex items-center justify-center group-hover:bg-[#b8860b]/10 transition-colors">
                {w.icon}
              </div>
              <h3 className="relative z-10 text-base font-bold text-[#1a1a2e] mb-2">{w.title}</h3>
              <p className="relative z-10 text-sm text-[#6b6b7b] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
