'use client'

import { useParams, notFound } from 'next/navigation'
import { useT } from '@/i18n'
import { useContact } from '@/components/ContactModal'
import { serviceT } from '@/i18n/services_data'
import Link from 'next/link'
// framer-motion removed
import { services } from '@/data/services'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })
import useGsapPage from '@/gsap/useGsapPage'

function loadTranslations(lang: string) {
  try { return (serviceT as any)[lang] || {} } catch { return {} }
}

function slugToKey(slug: string): string {
  const map: Record<string, string> = {
    'product-photography': 'productPhotography',
    'custom-packaging': 'customPackaging',
    'labels-and-manuals': 'labelsAndManuals',
    'full-inspection': 'fullInspection',
    'warehousing': 'warehousing',
    'factory-followup': 'factoryFollowup',
  }
  return map[slug] || slug
}

export default function ServiceDetailPage() {
  const { t, lang } = useT()
  useGsapPage()
  const { open: openContact } = useContact()
  const { slug } = useParams<{ slug: string }>()
  const service = services.find(s => s.slug === slug)
  const key = slugToKey(slug)

  if (!service) {
    notFound()
    return null
  }

  return (
    <>
      <ParticleBackground />
      <Header />

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#b8860b]/10 via-[#b8860b]/5 to-[#2c6e6e]/10 rounded-full blur-[120px]" />
          <div className="section-container relative z-10">
            <div className="max-w-3xl">
              <div className="page-hero-badge">
                <Link href="/" className="back-home-link">
                  <span className="arrow">←</span>
                  <span>返回主页</span>
                </Link>
              </div>
              <div className="page-hero-title flex items-center gap-3 mb-4">
                <span className="text-4xl">{service.icon}</span>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-[#b8860b] uppercase">{service.subtitle}</div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-foreground">{t(`services.${key}.title`)}</h1>
                </div>
              </div>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
                {t(`services.${key}.heroDesc`)}
              </p>
              <div className="mt-8">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground font-bold rounded-xl text-base hover:shadow-xl hover:shadow-[#b8860b]/20 transition-all"
                >
                  {t(`services.${key}.cta`)} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sections */}
        {service.sections.map((section, si) => (
          <section key={si} className={`section-padding ${si % 2 === 1 ? 'bg-gradient-to-b from-transparent via-[#b8860b]/[0.02] to-transparent' : ''}`}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-extrabold gradient-text mb-2">
                  {t(`services.${key}.section${si + 1}`)}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {section.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="glass-card page-card rounded-2xl p-5 flex gap-4"
                  >
                    <span className="text-2xl w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-foreground text-sm mb-1.5">{serviceT[lang]?.[key + '.item' + ii + '.title'] || item.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{serviceT[lang]?.[key + '.item' + ii + '.desc'] || item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#b8860b]/[0.03] to-transparent" />
          <div className="section-container relative z-10 text-center">
            <div className="page-cta">
              <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
                {t('services.ctaTitle')}
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                {t('services.ctaDesc')}
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground font-bold rounded-xl text-base hover:shadow-xl hover:shadow-[#b8860b]/20 transition-all"
              >
                {t(`services.${key}.cta`)} →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
