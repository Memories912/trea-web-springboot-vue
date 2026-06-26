'use client'

import { useT } from '@/i18n'

export default function TrustBar() {
  const { t } = useT()

  const brands = [
    t('trust.brand1'), t('trust.brand2'), t('trust.brand3'),
    t('trust.brand4'), t('trust.brand5'),
  ]

  return (
    <section className="py-4 border-y border-gray-200/50">
      <div className="section-container flex items-center gap-4 md:gap-6 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium shrink-0">
          {t('trust.label')}
        </span>
        {brands.map((logo) => (
          <span key={logo}
            className="text-xs text-gray-500 font-medium px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 shrink-0">
            {logo}
          </span>
        ))}
      </div>
    </section>
  )
}
