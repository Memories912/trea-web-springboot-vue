'use client'

// framer-motion removed
import Link from 'next/link'
import { useT } from '@/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function AboutPage() {
  const { t } = useT()
  const stats = [
    { value: t('about.stats1'), label: t('about.stats1Label') },
    { value: t('about.stats2'), label: t('about.stats2Label') },
    { value: t('about.stats3'), label: t('about.stats3Label') },
    { value: t('about.stats4'), label: t('about.stats4Label') },
  ]

  const missions = [
    { emoji: '🌉', title: t('about.mission1'), desc: t('about.mission1Desc') },
    { emoji: '🛡️', title: t('about.mission2'), desc: t('about.mission2Desc') },
    { emoji: '🚀', title: t('about.mission3'), desc: t('about.mission3Desc') },
  ]

  const team = [
    { emoji: '👨‍💼', name: t('about.team1Name'), role: t('about.team1Role'), bio: t('about.team1Bio') },
    { emoji: '👩‍💼', name: t('about.team2Name'), role: t('about.team2Role'), bio: t('about.team2Bio') },
    { emoji: '👨‍🔧', name: t('about.team3Name'), role: t('about.team3Role'), bio: t('about.team3Bio') },
  ]

  const values = [
    { emoji: '⭐', title: t('about.value1'), desc: t('about.value1Desc') },
    { emoji: '✅', title: t('about.value2'), desc: t('about.value2Desc') },
    { emoji: '💬', title: t('about.value3'), desc: t('about.value3Desc') },
    { emoji: '💡', title: t('about.value4'), desc: t('about.value4Desc') },
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
            <div 
             
             
             
              className="mb-8"
            >
              <Link href="/" className="text-sm text-gray-500 hover:text-[#b8860b] transition-colors">
                {t('nav.home')}
              </Link>
              <span className="text-sm text-gray-500 mx-2">/</span>
              <span className="text-sm text-foreground font-medium">{t('about.heroBadge')}</span>
            </div>

            <div 
             
             
             
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                <span className="text-xs font-semibold tracking-widest text-[#b8860b] uppercase">{t('about.heroBadge')}</span>
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text mb-6 leading-tight">
                {t('about.heroTitle')}
              </h1>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
                {t('about.heroDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* ─── Story + Stats ─── */}
        <section className="section-padding relative">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#2c6e6e]/5 rounded-full blur-[100px]" />
          <div className="section-container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div 
               
               
               
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
                  <span className="w-6 h-px bg-[#b8860b]/50" />
                  {t('about.storyTitle')}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mb-6">
                  {t('about.storyTitle')}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {t('about.storyDesc')}
                </p>
              </div>

              <div 
               
               
               
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 text-center">
                    <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Mission ─── */}
        <section className="section-padding relative bg-gradient-to-b from-transparent via-[#b8860b]/[0.02] to-transparent">
          <div className="section-container">
            <div {...fadeUp} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                {t('about.missionTitle')}
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mb-4">
                {t('about.missionTitle')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {missions.map((m, i) => (
                <div 
                  key={m.title}
                 
                 
                 
                 
                  className="glass-card rounded-2xl p-8 text-center"
                >
                  <span className="text-4xl mb-5 block">{m.emoji}</span>
                  <h3 className="text-lg font-bold text-foreground mb-3">{m.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Team ─── */}
        <section className="section-padding relative">
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-[#b8860b]/5 rounded-full blur-[100px]" />
          <div className="section-container relative z-10">
            <div {...fadeUp} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                {t('about.teamTitle')}
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mb-4">
                {t('about.teamTitle')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((member, i) => (
                <div 
                  key={member.name}
                 
                 
                 
                 
                  className="glass-card flowing-card rounded-2xl p-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#b8860b]/20 to-[#2c6e6e]/20 flex items-center justify-center text-3xl mx-auto mb-5">
                    {member.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <div className="text-xs font-semibold text-[#b8860b] mb-4">{member.role}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Values ─── */}
        <section className="section-padding relative bg-gradient-to-b from-transparent via-[#2c6e6e]/[0.02] to-transparent">
          <div className="section-container">
            <div {...fadeUp} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                {t('about.valuesTitle')}
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mb-4">
                {t('about.valuesTitle')}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {values.map((v, i) => (
                <div 
                  key={v.title}
                 
                 
                 
                 
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <span className="text-3xl mb-4 block">{v.emoji}</span>
                  <h3 className="font-bold text-foreground text-sm mb-2">{v.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="section-padding relative">
          <div className="section-container">
            <div 
             
             
             
              className="flowing-card rounded-2xl p-10 md:p-14 text-center border border-[#b8860b]/20 bg-gradient-to-br from-[#b8860b]/5 via-[#2c6e6e]/5 to-transparent max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 mb-4 justify-center">
                <span className="w-6 h-px bg-[#b8860b]/50" />
                <span className="text-xs font-semibold tracking-widest text-[#b8860b] uppercase">{t('about.heroBadge')}</span>
                <span className="w-6 h-px bg-[#b8860b]/50" />
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold gradient-text mb-4">{t('about.ctaTitle')}</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">{t('about.ctaDesc')}</p>
              <a href="/#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
              >
                {t('about.ctaBtn')}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
