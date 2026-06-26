'use client'

import { useState } from 'react'
// framer-motion removed
import Link from 'next/link'
import { useT } from '@/i18n'
import { useContact } from '@/components/ContactModal'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'

export default function FAQPage() {
  const { t } = useT()
  const { open: openContact } = useContact()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs = [
    { q: t('faq.1.q'), a: t('faq.1.a') },
    { q: t('faq.2.q'), a: t('faq.2.a') },
    { q: t('faq.3.q'), a: t('faq.3.a') },
    { q: t('faq.4.q'), a: t('faq.4.a') },
    { q: t('faq.5.q'), a: t('faq.5.a') },
    { q: t('faq.6.q'), a: t('faq.6.a') },
  ]

  return (
    <>
      <ParticleBackground />
      <Header />
      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#b8860b]/10 via-[#b8860b]/5 to-[#2c6e6e]/10 rounded-full blur-[120px]" />
          <div className="section-container relative z-10">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#b8860b] transition-colors mb-6">
                {t('nav.backHome')}
              </Link>
            </div>
            <div 
             
             
             
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                {t('faq.section')}
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold gradient-text mb-4 leading-tight">
                {t('faq.title')}
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
                {t('faq.desc')}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div 
                  key={i}
                 
                 
                 
                 
                >
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className={`w-full text-left glass-card rounded-xl p-5 md:p-6 transition-all ${
                      openIdx === i ? 'border-[#b8860b]/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm md:text-base font-medium text-foreground/90">{faq.q}</span>
                      <span 
                       
                        className="text-[#b8860b]/60 flex-shrink-0"
                      >
                        ▼
                      </span>
                    </div>
                    <div>
                      {openIdx === i && (
                        <div 
                         
                         
                         
                         
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-gray-500 leading-relaxed pt-4 border-t border-gray-200/50 mt-4">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <div 
             
             
             
              className="text-center flowing-card rounded-2xl p-10 md:p-14 border border-[#b8860b]/20 max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-4xl font-extrabold gradient-text mb-4">{t('faq.ctaTitle')}</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">{t('faq.ctaDesc')}</p>
              <button onClick={openContact}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
              >
                {t('faq.ctaBtn')} →
              →</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
