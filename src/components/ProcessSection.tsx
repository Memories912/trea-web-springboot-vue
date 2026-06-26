'use client'

import { useT } from '@/i18n'

export default function ProcessSection() {
  const { t } = useT()

  const steps = [
    { num: '01', icon: '💬', title: t('process.1.title'), desc: t('process.1.desc') },
    { num: '02', icon: '🔍', title: t('process.2.title'), desc: t('process.2.desc') },
    { num: '03', icon: '🤝', title: t('process.3.title'), desc: t('process.3.desc') },
    { num: '04', icon: '🚀', title: t('process.4.title'), desc: t('process.4.desc') },
  ]

  return (
    <section className="process-section section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2c6e6e]/3 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16 gsap-reveal-up">
          <span className="section-badge justify-center">
            <span className="w-6 h-px bg-[#b8860b]/40" />
            {t('process.section')}
            <span className="w-6 h-px bg-[#b8860b]/40" />
          </span>
          <h2 className="section-title gradient-text">{t('process.title')}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-5 mb-4 last:mb-0">
              <div className="flex flex-col items-center flex-shrink-0" style={{ width: 56 }}>
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#b8860b]/20 flex items-center justify-center text-lg relative z-10 shadow-sm">
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 w-px bg-gradient-to-b from-[#b8860b]/40 to-[#b8860b]/5 my-1" style={{ minHeight: 40 }} />
                )}
              </div>
              <div className="card-elevated p-5 flex-1 mb-2">
                <span className="text-[10px] font-bold text-[#b8860b]/50 uppercase tracking-widest mb-1 block">
                  Step {step.num}
                </span>
                <h3 className="text-base font-bold text-[#1a1a2e] mb-1.5">{step.title}</h3>
                <p className="text-sm text-[#6b6b7b] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
