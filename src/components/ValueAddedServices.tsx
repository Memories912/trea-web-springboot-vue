'use client'

import Link from 'next/link'
import { useT } from '@/i18n'

export default function ValueAddedServices() {
  const { t } = useT()

  const services = [
    { slug: 'product-photography', icon: '📸', title: t('vas.1.title'), desc: t('vas.1.desc') },
    { slug: 'custom-packaging', icon: '📦', title: t('vas.2.title'), desc: t('vas.2.desc') },
    { slug: 'labels-and-manuals', icon: '🏷️', title: t('vas.3.title'), desc: t('vas.3.desc') },
    { slug: 'full-inspection', icon: '🔍', title: t('vas.4.title'), desc: t('vas.4.desc') },
    { slug: 'warehousing', icon: '🏭', title: t('vas.5.title'), desc: t('vas.5.desc') },
    { slug: 'factory-followup', icon: '👷', title: t('vas.6.title'), desc: t('vas.6.desc') },
  ]

  return (
    <section id="services" className="vas-section section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#2c6e6e]/4 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#b8860b]/3 rounded-full blur-[80px]" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16 gsap-reveal-up">
          <span className="section-badge justify-center">
            <span className="w-6 h-px bg-[#b8860b]/40" />
            {t('vas.section')}
            <span className="w-6 h-px bg-[#b8860b]/40" />
          </span>
          <h2 className="section-title gradient-text">{t('vas.title')}</h2>
          <p className="section-subtitle mx-auto">{t('vas.desc')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <Link key={s.title} href={`/services/${s.slug}`}
              className="card-accent p-5 flex gap-4 group cursor-pointer items-start transition-transform hover:-translate-y-1">
              <span className="text-2xl w-12 h-12 rounded-xl bg-[#f5f3ef] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {s.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#1a1a2e] text-sm mb-1.5 group-hover:text-[#b8860b] transition-colors flex items-center gap-1.5">
                  {s.title}
                  <span className="text-[#b8860b]/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </h3>
                <p className="text-xs text-[#6b6b7b] leading-relaxed">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
