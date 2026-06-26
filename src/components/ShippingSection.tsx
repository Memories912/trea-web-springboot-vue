'use client'

import { useT } from '@/i18n'

export default function ShippingSection() {
  const { t } = useT()

  const ships = [
    { icon: '📦', title: t('ship.1.title'), desc: t('ship.1.desc') },
    { icon: '🚢', title: t('ship.2.title'), desc: t('ship.2.desc') },
    { icon: '✈️', title: t('ship.3.title'), desc: t('ship.3.desc') },
    { icon: '🚄', title: t('ship.4.title'), desc: t('ship.4.desc') },
    { icon: '🚪', title: t('ship.5.title'), desc: t('ship.5.desc') },
    { icon: '📋', title: t('ship.6.title'), desc: t('ship.6.desc') },
  ]

  return (
    <section className="shipping-section section-padding relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#2c6e6e]/4 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b8860b]/3 rounded-full blur-[80px]" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16 gsap-reveal-up">
          <span className="section-badge justify-center">
            <span className="w-6 h-px bg-[#b8860b]/40" />
            {t('ship.section')}
            <span className="w-6 h-px bg-[#b8860b]/40" />
          </span>
          <h2 className="section-title gradient-text">{t('ship.title')}</h2>
          <p className="section-subtitle mx-auto">{t('ship.desc')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ships.map((s) => (
            <div key={s.title} className="card-elevated p-6 text-center group transition-transform hover:-translate-y-1">
              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{s.icon}</span>
              <h3 className="font-bold text-[#1a1a2e] text-base mb-2">{s.title}</h3>
              <p className="text-xs text-[#6b6b7b] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
