'use client'

// framer-motion removed
import Link from 'next/link'
import { useT } from '@/i18n'
import useGsapPage from '@/gsap/useGsapPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })

export default function ProductsPage() {
  const { t } = useT()
  useGsapPage()

  const categories = [
    { slug: 'apparel', icon: '👕', name: t('catSelect.apparel'), desc: t('catDesc.apparel') },
    { slug: 'furniture', icon: '🪑', name: t('catSelect.furniture'), desc: t('catDesc.furniture') },
    { slug: 'bags-cases', icon: '👜', name: t('catSelect.bags-cases'), desc: t('catDesc.bags-cases') },
    { slug: 'beauty', icon: '💄', name: t('catSelect.beauty'), desc: t('catDesc.beauty') },
    { slug: 'toys', icon: '🧸', name: t('catSelect.toys'), desc: t('catDesc.toys') },
    { slug: 'sports', icon: '⚽', name: t('catSelect.sports'), desc: t('catDesc.sports') },
    { slug: 'home-supplies', icon: '🏠', name: t('catSelect.home-supplies'), desc: t('catDesc.home-supplies') },
    { slug: 'garden-tools', icon: '🔧', name: t('catSelect.garden-tools'), desc: t('catDesc.garden-tools') },
    { slug: 'electronics', icon: '🔌', name: t('catSelect.electronics'), desc: t('catDesc.electronics') },
    { slug: 'pet-supplies', icon: '🐾', name: t('catSelect.pet-supplies'), desc: t('catDesc.pet-supplies') },
    { slug: 'mother-kids', icon: '👶', name: t('catSelect.mother-kids'), desc: t('catDesc.mother-kids') },
    { slug: 'hardware', icon: '⚙️', name: t('catSelect.hardware'), desc: t('catDesc.hardware') },
    { slug: 'office-supplies', icon: '📎', name: t('catSelect.office-supplies'), desc: t('catDesc.office-supplies') },
    { slug: 'automotive', icon: '🚗', name: t('catSelect.automotive'), desc: t('catDesc.automotive') },
    { slug: 'industrial', icon: '🏭', name: t('catSelect.industrial'), desc: t('catDesc.industrial') },
    { slug: 'packaging', icon: '📦', name: t('catSelect.packaging'), desc: t('catDesc.packaging') },
    { slug: 'outdoors', icon: '⛺', name: t('catSelect.outdoors'), desc: t('catDesc.outdoors') },
    { slug: 'jewelry', icon: '💍', name: t('catSelect.jewelry'), desc: t('catDesc.jewelry') },
    { slug: 'lighting', icon: '💡', name: t('catSelect.lighting'), desc: t('catDesc.lighting') },
  ]

  return (
    <>
      <ParticleBackground />
      <Header />

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#b8860b]/10 via-[#b8860b]/5 to-[#2c6e6e]/10 rounded-full blur-[120px]" />
          <div className="section-container relative z-10">
            <div className="page-hero-badge">
              <Link href="/" className="back-home-link">
                <span className="arrow">←</span>
                <span>返回主页</span>
              </Link>
            </div>
            <div 
              className="page-hero-title max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
                <span className="text-xs font-medium text-[#b8860b]/80">{t('products.badge')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold gradient-text mb-4 leading-tight">
                {t('products.title')}
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
                {t('products.desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="section-padding relative">
          <div className="section-container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <div 
                  key={cat.slug}
                  className="page-card"
                >
                  <Link href={`/products/${cat.slug}`}
                    className="block glass-card rounded-xl p-5 hover:border-[#b8860b]/30 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <h3 className="font-bold text-foreground group-hover:text-[#b8860b] transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {cat.desc}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
