'use client'

// framer-motion removed
import Link from 'next/link'
import { useT } from '@/i18n'
import { useContact } from '@/components/ContactModal'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import useGsapPage from '@/gsap/useGsapPage'

export default function PaymentPage() {
  const { t } = useT()
  const { open: openContact } = useContact()
  useGsapPage()

  const paymentMethods = [
    {
      id: 'wire-transfer',
      number: '01',
      title: t('payment.method1Title'),
      icon: '🏦',
      description: [t('payment.method1Desc1'), t('payment.method1Desc2')],
      bankDetails: [
        { label: t('payment.method1Name'), value: t('payment.method1AccName') },
        { label: t('payment.method1AccNum'), value: t('payment.method1AccNumVal') },
        { label: t('payment.method1Addr'), value: t('payment.method1AddrVal') },
        { label: t('payment.method1Swift'), value: t('payment.method1SwiftVal') },
        { label: t('payment.method1Bank'), value: t('payment.method1BankName') },
        { label: t('payment.method1BankAddr'), value: t('payment.method1BankAddrVal') },
      ],
      bgAccent: 'from-amber-500/5',
      showBank: true,
    },
    {
      id: 'payoneer',
      number: '02',
      title: t('payment.method2Title'),
      icon: '💳',
      description: [t('payment.method2Desc1'), t('payment.method2Desc2')],
      accountInfo: [
        { label: t('payment.method2Acc'), value: t('payment.method2AccVal') },
      ],
      bgAccent: 'from-emerald-500/5',
    },
    {
      id: 'paypal',
      number: '03',
      title: t('payment.method3Title'),
      icon: '🅿️',
      description: [t('payment.method3Desc1'), t('payment.method3Desc2')],
      accountInfo: [
        { label: t('payment.method3Acc'), value: t('payment.method3AccVal') },
        { label: t('payment.method3Name'), value: t('payment.method3NameVal') },
      ],
      bgAccent: 'from-blue-500/5',
    },
    {
      id: 'alibaba',
      number: '04',
      title: t('payment.method4Title'),
      icon: '🌐',
      description: [t('payment.method4Desc1'), t('payment.method4Desc2'), t('payment.method4Desc3')],
      bgAccent: 'from-orange-500/5',
    },
  ]

  function PaymentMethodCard({ method, index }: { method: typeof paymentMethods[0]; index: number }) {
    return (
      <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden page-card">
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${method.bgAccent} to-transparent rounded-full blur-[60px]`} />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl md:text-6xl font-black text-[#b8860b]/10 select-none">{method.number}</span>
            <span className="text-3xl">{method.icon}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{method.title}</h2>

          <div className="space-y-3 mb-6">
            {method.description.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </div>

          {method.showBank && method.bankDetails && (
            <div className="bg-muted/50 rounded-xl p-5 md:p-6 border border-border">
              <h3 className="text-sm font-semibold text-[#b8860b] uppercase tracking-wider mb-4">{t('payment.method1BankTitle')}</h3>
              <div className="space-y-3">
                {method.bankDetails.map((detail, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[140px] shrink-0">
                      {detail.label}
                    </span>
                    <span className="text-sm text-foreground break-all">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {method.accountInfo && (
            <div className="bg-muted/50 rounded-xl p-5 md:p-6 border border-border">
              <div className="space-y-3">
                {method.accountInfo.map((info, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[140px] shrink-0">
                      {info.label}
                    </span>
                    <span className="text-sm text-foreground break-all">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-20">
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#b8860b]/10 via-[#b8860b]/5 to-[#2c6e6e]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#2c6e6e]/10 via-transparent to-[#b8860b]/5 rounded-full blur-[100px]" />

          <div className="section-container relative z-10">
            {/* Breadcrumb */}
            <div className="mb-8 page-hero-badge">
              <Link href="/" className="back-home-link">
                <span className="arrow">←</span>
                <span>返回主页</span>
              </Link>
            </div>

            {/* Header */}
            <div className="max-w-3xl mb-16 page-hero-title">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                <span className="text-xs font-semibold tracking-widest text-[#b8860b] uppercase">{t('payment.badge')}</span>
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text mb-6 leading-tight">
                {t('payment.heroTitle')}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {t('payment.heroDesc')}
              </p>
            </div>

            {/* Methods */}
            <div className="space-y-8">
              {paymentMethods.map((method, index) => (
                <PaymentMethodCard key={method.id} method={method} index={index} />
              ))}
            </div>

            {/* CTA */}
            <div className="page-cta flowing-card rounded-2xl p-10 md:p-14 text-center border border-[#b8860b]/20 bg-gradient-to-br from-[#b8860b]/5 via-[#2c6e6e]/5 to-transparent max-w-3xl mx-auto mt-16">
              <div className="inline-flex items-center gap-2 mb-4 justify-center">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                <span className="text-xs font-semibold tracking-widest text-[#b8860b] uppercase">{t('payment.badge')}</span>
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold gradient-text mb-4">{t('payment.ctaSection')}</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                {t('payment.ctaDesc')}
              </p>
              <button
                onClick={openContact}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
              >
                {t('payment.ctaBtn')}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
