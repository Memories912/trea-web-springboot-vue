'use client'

import { useT } from '@/i18n'
import { useContact } from '@/components/ContactModal'

export default function QualityGuarantee() {
  const { t } = useT()
  const { open: openContact } = useContact()

  const items = [
    { title: t('quality.item1.title'), desc: t('quality.item1.desc'), icon: '✅' },
    { title: t('quality.item2.title'), desc: t('quality.item2.desc'), icon: '🔒' },
    { title: t('quality.item3.title'), desc: t('quality.item3.desc'), icon: '📋' },
  ]

  return (
    <section className="quality-section section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#b8860b]/5 via-[#b8860b]/3 to-[#2c6e6e]/5 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="gsap-reveal-left">
            <span className="section-badge">{t('quality.section')}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a2e] leading-[1.1] mb-4">
              {t('quality.title1')}<br />
              <span className="gradient-text">{t('quality.title2')}</span>
            </h2>
            <p className="text-[#6b6b7b] text-base max-w-md mb-8 leading-relaxed">
              {t('quality.desc')}
            </p>

            <div className="space-y-4 mb-8">
              {items.map((item, i) => (
                <div key={i} className="flex gap-4 items-start card-elevated p-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b8860b]/8 flex items-center justify-center flex-shrink-0 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <strong className="block text-[#1a1a2e] text-sm mb-0.5">{item.title}</strong>
                    <span className="text-sm text-[#6b6b7b]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={openContact} className="btn-primary glow-amber">
              {t('quality.cta')} →
            </button>
          </div>

          <div className="gsap-reveal-right flex items-center justify-center">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b8860b]/15 to-[#b8860b]/5 blur-2xl animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-[#b8860b]/10 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-dashed border-[#b8860b]/15 animate-spin-slow"
                style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
              <div className="absolute inset-12 rounded-full bg-white shadow-lg border border-[#b8860b]/8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-1">🛡️</div>
                  <div className="text-3xl font-extrabold gradient-text">{t('quality.percent')}</div>
                  <div className="text-[10px] text-[#8a8a9a] mt-1 uppercase tracking-wider">{t('quality.guarantee')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
