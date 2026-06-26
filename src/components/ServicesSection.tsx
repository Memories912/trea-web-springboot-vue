'use client'

import { useT } from '@/i18n'

export default function ServicesSection() {
  const { t } = useT()

  const services = [
    { icon: '🛒', color: '#FF9900', bg: '#FFF8F0', title: t('services.amazon'), desc: t('services.amazonDesc') },
    { icon: '📦', color: '#3B82F6', bg: '#F0F5FF', title: t('services.dropshipper'), desc: t('services.dropshipperDesc') },
    { icon: '🏪', color: '#10B981', bg: '#F0FDF7', title: t('services.retailer'), desc: t('services.retailerDesc') },
    { icon: '🏛️', color: '#8B5CF6', bg: '#F6F0FF', title: t('services.enterprise'), desc: t('services.enterpriseDesc') },
  ]

  return (
    <section className="services-section section-padding relative">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="section-container relative z-10">
        <div className="services-header text-center mb-16 gsap-reveal-up">
          <span className="section-badge justify-center">
            <span className="w-6 h-px bg-[#b8860b]/40" />
            {t('services.section')}
            <span className="w-6 h-px bg-[#b8860b]/40" />
          </span>
          <h2 className="section-title gradient-text">{t('services.title')}</h2>
          <p className="section-subtitle mx-auto">{t('services.desc')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div key={s.title} className="service-card card-elevated p-6 text-center group transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1a1a2e] mb-3">{s.title}</h3>
              <p className="text-sm text-[#6b6b7b] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
