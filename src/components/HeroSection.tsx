'use client'

import { useT } from '@/i18n'
import GlobeCanvas from './GlobeCanvas'
import ProductCategories from './ProductCategories'

export default function HeroSection() {
  const { t } = useT()

  const stats = [
    { value: '4,000+', label: t('hero.stat1'), icon: '🏭' },
    { value: '200+', label: t('hero.stat2'), icon: '🌍' },
    { value: '500K+', label: t('hero.stat3'), icon: '📦' },
    { value: '50+', label: t('hero.stat4'), icon: '🤝' },
  ]

  return (
    <section className="gsap-hero relative min-h-screen flex flex-col overflow-hidden pt-16">
      {/* Ambient glow orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#b8860b]/4 rounded-full blur-[120px] animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#2c6e6e]/4 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      {/* Product Categories */}
      <div className="relative z-20 flex-shrink-0">
        <ProductCategories />
      </div>

      <div className="flex-1 flex items-center">
        <div className="section-container relative z-10 w-full py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* ── Left: Text Content ── */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="hero-badge inline-flex items-center gap-2 bg-white/60 border border-[#b8860b]/15 rounded-full px-4 py-2"
                style={{ animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
                <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
                <span className="text-xs font-semibold text-[#b8860b] tracking-wide">
                  {t('hero.badge')}
                </span>
              </div>

              {/* Title */}
              <h1 className="gsap-hero-heading" style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
                <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-[#1a1a2e]">
                  {t('hero.title1')}
                </span>
                <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight gradient-text mt-2">
                  {t('hero.title2')}
                </span>
              </h1>

              {/* Description */}
              <p className="gsap-hero-desc text-lg text-[#6b6b7b] max-w-lg leading-relaxed"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}>
                {t('hero.desc')}
              </p>

              {/* CTA */}
              <div className="gsap-hero-cta-group flex flex-wrap gap-3"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}>
                <a href="#contact" data-scrollto="#contact"
                  className="btn-primary gsap-scrollto text-base px-8 py-3.5">
                  {t('hero.ctaQuote')} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a href="/plans" className="btn-secondary text-base px-8 py-3.5">
                  {t('hero.ctaPlans')}
                </a>
              </div>

              {/* Stats Bar */}
              <div className="gsap-stat-section flex gap-6 md:gap-10 pt-8 border-t border-gray-200/60"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.7s both' }}>
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-2.5">
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <div className="text-lg md:text-xl font-extrabold text-[#1a1a2e] leading-tight">
                        {s.value}
                      </div>
                      <div className="text-[11px] text-[#8a8a9a] mt-0.5 leading-tight">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Globe ── */}
            <div className="relative h-[420px] md:h-[540px] hidden lg:flex items-center justify-center gsap-hero-parallax">
              {/* Orbit rings */}
              <div className="absolute w-[420px] h-[420px] rounded-full border border-[#b8860b]/8 animate-spin-slow" />
              <div className="absolute w-[340px] h-[340px] rounded-full border border-[#2c6e6e]/6"
                style={{ animation: 'spin-slow 25s linear infinite reverse' }} />
              
              {/* Globe */}
              <div className="relative z-10 w-[360px] h-[360px]">
                <GlobeCanvas width={360} height={360} />
              </div>

              {/* City labels */}
              {[
                { flag: '🇨🇳', name: 'Shanghai', x: '92%', y: '38%' },
                { flag: '🇺🇸', name: 'New York', x: '6%', y: '30%' },
                { flag: '🇬🇧', name: 'London', x: '16%', y: '20%' },
                { flag: '🇯🇵', name: 'Tokyo', x: '88%', y: '28%' },
                { flag: '🇦🇪', name: 'Dubai', x: '28%', y: '40%' },
                { flag: '🇧🇷', name: 'São Paulo', x: '14%', y: '72%' },
                { flag: '🇦🇺', name: 'Sydney', x: '88%', y: '76%' },
                { flag: '🇸🇬', name: 'Singapore', x: '78%', y: '60%' },
              ].map((city) => (
                <div key={city.name} className="absolute gsap-city-label"
                  style={{ left: city.x, top: city.y, transform: 'translate(-50%, -50%)' }}>
                  <div className="text-[11px] bg-white/95 rounded-full px-2.5 py-1 shadow-sm border border-gray-100 whitespace-nowrap flex items-center gap-1 select-none">
                    <span>{city.flag}</span>
                    <span className="text-[#4a4a5a] font-medium">{city.name}</span>
                    <span className="w-1 h-1 rounded-full bg-[#b8860b]/60" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
