'use client'

import useGsapHome from '@/gsap/useGsapHome'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import TrustBar from '@/components/TrustBar'
import GlobalNetwork from '@/components/GlobalNetwork'
import PlanCTA from '@/components/PlanCTA'
import ServicesSection from '@/components/ServicesSection'
import WhyUsSection from '@/components/WhyUsSection'
import ProcessSection from '@/components/ProcessSection'
import ValueAddedServices from '@/components/ValueAddedServices'
import QualityGuarantee from '@/components/QualityGuarantee'
import ShippingSection from '@/components/ShippingSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  useGsapHome()

  return (
    <>
      <Header />
      <main className="relative z-10">
        {/* Hero */}
        <div className="section-hero">
          <HeroSection />
        </div>

        {/* TrustBar */}
        <div className="section-white border-y border-[#b8860b]/8">
          <TrustBar />
        </div>

        {/* Global Network */}
        <div className="section-cool">
          <GlobalNetwork />
        </div>

        {/* Plans CTA */}
        <div className="section-warm">
          <PlanCTA />
        </div>

        {/* Services */}
        <div className="section-white">
          <ServicesSection />
        </div>

        {/* Why Us */}
        <div className="section-muted">
          <WhyUsSection />
        </div>

        {/* Process */}
        <div className="section-cool">
          <ProcessSection />
        </div>

        {/* Value Added Services */}
        <div className="section-warm">
          <ValueAddedServices />
        </div>

        {/* Quality Guarantee */}
        <div className="section-white">
          <QualityGuarantee />
        </div>

        {/* Shipping */}
        <div className="section-muted">
          <ShippingSection />
        </div>

        {/* FAQ CTA */}
        <div className="section-warm">
          <section className="section-padding relative">
            <div className="section-container">
              <div className="text-center rounded-2xl p-12 md:p-16 border border-[#b8860b]/10 bg-white shadow-lg max-w-3xl mx-auto relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#b8860b]/3 via-transparent to-[#2c6e6e]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="section-badge relative justify-center">FAQ</span>
                <h2 className="section-title gradient-text relative">FAQ</h2>
                <p className="section-subtitle relative mx-auto mb-6">常见问题 / Frequently Asked Questions</p>
                <a href="/faq" className="btn-primary relative">
                  查看 FAQ <span>→</span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Contact */}
        <div className="section-cool">
          <ContactSection />
        </div>
      </main>

      <Footer />

      <button className="gsap-backtotop fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-[#b8860b] to-[#d4a017] text-white font-bold text-lg shadow-lg shadow-[#b8860b]/30 z-50 flex items-center justify-center opacity-0 scale-0 pointer-events-none">
        ↑
      </button>
    </>
  )
}
