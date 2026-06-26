'use client'

// framer-motion removed
import Link from 'next/link'
import { useT } from '@/i18n'
import { useContact } from '@/components/ContactModal'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dynamicImport from 'next/dynamic'
const ParticleBackground = dynamicImport(() => import('@/components/ParticleBackground'), { ssr: false })
import useGsapPage from '@/gsap/useGsapPage'

export const dynamic = 'force-static'

export default function PlansPage() {
  const { t } = useT()
  useGsapPage()
  const { open: openContact } = useContact()

  const faqs = [
    { q: t('plansPage.faq1q'), a: t('plansPage.faq1a') },
    { q: t('plansPage.faq2q'), a: t('plansPage.faq2a') },
    { q: t('plansPage.faq3q'), a: t('plansPage.faq3a') },
  ]

  return (
    <>
      <ParticleBackground />
      <Header />

      <main className="relative z-10 pt-24">
        {/* ─── Hero ─── */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-[#b8860b]/10 via-[#b8860b]/5 to-[#2c6e6e]/5 rounded-full blur-[120px]" />
          <div className="section-container relative z-10">
            <div className="page-hero-badge">
              <Link href="/" className="back-home-link">
                <span className="arrow">←</span>
                <span>返回主页</span>
              </Link>
            </div>
            <div className="page-hero-title text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold gradient-text mb-6">
                {t('plansPage.heroTitle')}
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
                {t('plansPage.heroDesc')}
              </p>
              <a href="#compare"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
              >
                {t('plansPage.heroCta')} ↓
              </a>
            </div>
          </div>
        </section>

        {/* ─── Plan Comparison Cards ─── */}
        <section id="compare" className="section-padding relative">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#2c6e6e]/5 rounded-full blur-[100px]" />
          <div className="section-container relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                {t('plansPage.compareTitle')}
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-4">
                {t('plansPage.compareTitle')}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                {t('plansPage.compareDesc')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Basic Card */}
              <div className="page-card glass-card flowing-card rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2c6e6e]/5 rounded-full blur-[60px]" />
                <div className="relative z-10 flex flex-col flex-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-white/10 text-gray-600">
                    {t('plansPage.basicBadge')}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{t('plansPage.basicTitle')}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-extrabold text-foreground">{t('plansPage.basicPrice')}</span>
                    <span className="text-sm text-gray-500 ml-2">{t('plansPage.basicLabel')}</span>
                  </div>

                  <div className="space-y-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <h4 className="text-sm font-semibold text-[#b8860b] mb-1">{t(`plansPage.basicDesc${i}Title`)}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{t(`plansPage.basicDesc${i}`)}</p>
                      </div>
                    ))}
                  </div>

                  <button onClick={openContact}
                    className="mt-auto block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm glass-light text-gray-600 hover:text-gray-900 transition-all"
                  >
                    {t('plansPage.basicCta')}
                  →</button>
                </div>
              </div>

              {/* Pro Card - Featured */}
              <div className="page-card flowing-card rounded-2xl p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#b8860b]/10 via-[#2c6e6e]/5 to-transparent border border-[#b8860b]/20 flex flex-col">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#b8860b]/10 rounded-full blur-[80px]" />
                <div className="relative z-10 flex flex-col flex-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground">
                    {t('plansPage.proBadge')}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{t('plansPage.proTitle')}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-extrabold gradient-text">{t('plansPage.proPrice')}</span>
                    <span className="text-sm text-gray-500 ml-2">{t('plansPage.proLabel')}</span>
                  </div>

                  <div className="space-y-6 mb-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i}>
                        <h4 className="text-sm font-semibold text-[#b8860b] mb-1">{t(`plansPage.proDesc${i}Title`)}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{t(`plansPage.proDesc${i}`)}</p>
                      </div>
                    ))}
                  </div>

                  <button onClick={openContact}
                    className="mt-auto block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
                  >
                    {t('plansPage.proCta')}
                  →</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Feature Comparison Table ─── */}
        <section className="section-padding relative">
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#2c6e6e]/5 rounded-full blur-[100px]" />
          <div className="section-container relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-extrabold gradient-text mb-4">
                {t('plansPage.compareTitle')}
              </h2>
            </div>

            <div className="page-card max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-4 font-semibold text-gray-600 glass-light rounded-tl-xl border-b border-gray-200/50">{t('plans.compareHeader')}</th>
                    <th className="p-4 font-semibold text-gray-600 glass-light border-b border-gray-200/50 text-center">{t('plans.compareBasic')}</th>
                    <th className="p-4 font-semibold text-[#b8860b] glass-light rounded-tr-xl border-b border-[#b8860b]/20 text-center">{t('plans.comparePro')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feat: t('plans.compRow1.feat'), basic: t('plans.compRow1.basic'), pro: t('plans.compRow1.pro') },
                    { feat: t('plans.compRow2.feat'), basic: t('plans.compRow2.basic'), pro: t('plans.compRow2.pro') },
                    { feat: t('plans.compRow3.feat'), basic: t('plans.compRow3.basic'), pro: t('plans.compRow3.pro') },
                    { feat: t('plans.compRow4.feat'), basic: t('plans.compRow4.basic'), pro: t('plans.compRow4.pro') },
                    { feat: t('plans.compRow5.feat'), basic: t('plans.compRow5.basic'), pro: t('plans.compRow5.pro') },
                    { feat: t('plans.compRow6.feat'), basic: t('plans.compRow6.basic'), pro: t('plans.compRow6.pro') },
                    { feat: t('plans.compRow7.feat'), basic: t('plans.compRow7.basic'), pro: t('plans.compRow7.pro') },
                    { feat: t('plans.compRow8.feat'), basic: t('plans.compRow8.basic'), pro: t('plans.compRow8.pro') },
                    { feat: t('plans.compRow9.feat'), basic: t('plans.compRow9.basic'), pro: t('plans.compRow9.pro') },
                    { feat: t('plans.compRow10.feat'), basic: t('plans.compRow10.basic'), pro: t('plans.compRow10.pro') },
                    { feat: t('plans.compRow11.feat'), basic: t('plans.compRow11.basic'), pro: t('plans.compRow11.pro') },
                    { feat: t('plans.compRow12.feat'), basic: t('plans.compRow12.basic'), pro: t('plans.compRow12.pro') },
                    { feat: t('plans.compRow13.feat'), basic: t('plans.compRow13.basic'), pro: t('plans.compRow13.pro') }
                  ].map((row, i) => (
                    <tr key={i} className="group">
                      <td className={`p-4 text-gray-600 ${i % 2 === 0 ? 'glass-light' : ''} ${i === 12 ? 'rounded-bl-xl' : 'border-b border-gray-200/50'}`}>
                        {row.feat}
                      </td>
                      <td className={`p-4 text-gray-400 text-center ${i % 2 === 0 ? 'glass-light' : ''} ${i === 12 ? '' : 'border-b border-gray-200/50'}`}>
                        {row.basic}
                      </td>
                      <td className={`p-4 text-emerald-400 text-center font-medium ${i % 2 === 0 ? 'glass-light' : ''} ${i === 12 ? 'rounded-br-xl' : 'border-b border-gray-200/50'}`}>
                        {row.pro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── CTA Section ─── */}
        <section className="section-padding relative">
          <div className="section-container">
            <div className="page-cta flowing-card rounded-2xl p-10 md:p-14 text-center border border-[#b8860b]/20 bg-gradient-to-br from-[#b8860b]/8 via-[#2c6e6e]/5 to-transparent max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-extrabold gradient-text mb-4">
                {t('plansPage.ctaTitle')}
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">
                {t('plansPage.ctaDesc')}
              </p>
              <button onClick={openContact}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
              >
                {t('plansPage.ctaBtn')} →
              →</button>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="section-padding relative">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-extrabold gradient-text mb-4">
                {t('faq.title')}
              </h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="page-card glass-card rounded-xl overflow-hidden group"
                >
                  <summary className="px-6 py-4 text-sm font-semibold text-foreground/80 cursor-pointer hover:text-[#b8860b] transition-colors flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <span 
                      className="text-[#b8860b] text-xs shrink-0 ml-4"
                    >▼</span>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact Section (inline) ─── */}
        <section id="contact" className="section-padding relative">
          <div className="section-container">
            <div className="page-card glass-card rounded-2xl p-10 md:p-14 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-extrabold gradient-text mb-4">
                {t('services.ctaTitle')}
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                {t('services.ctaDesc')}
              </p>
              <button onClick={openContact}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
              >
                {t('plansPage.ctaBtn')} →
              →</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
