'use client'

import { useEffect, useRef } from 'react'
import { useT } from '@/i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

export default function Footer() {
  const { t } = useT()
  const brandDescRef = useRef<HTMLParagraphElement>(null)

  const col1Items = [t('footer.col1Item1-4'), t('footer.col1Item2-4'), t('footer.col1Item3-4'), t('footer.col1Item4-4')]
  const col2Items = [t('footer.col2Item1-3'), t('footer.col2Item2-3'), t('footer.col2Item3-3')]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrambleText for brand description
      if (brandDescRef.current) {
        gsap.fromTo(brandDescRef.current,
          { text: '' },
          {
            text: t('footer.brandDesc'),
            duration: 1.5,
            ease: 'none',
            scrollTrigger: {
              trigger: brandDescRef.current,
              start: 'top 90%',
            },
            scrambleText: { text: t('footer.brandDesc'), chars: '!@#$%^&*()_+-=[]{}|;:,.<>?/~abcdefghijklmnopqrstuvwxyz0123456789', revealDelay: 0.4, speed: 0.07 },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [t])

  return (
    <footer className="py-12 border-t border-gray-200/50">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1 gsap-reveal-up">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="GlobalTrade" className="h-16 w-auto" />
            </div>
            <p ref={brandDescRef} className="text-xs text-gray-500 leading-relaxed max-w-xs">
              {/* ScrambleText fills this */}
            </p>
          </div>

          <div className="gsap-reveal-up">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-4">{t('footer.col1Title')}</h4>
            <div className="space-y-2">
              {col1Items.map((item) => (
                <a key={item} href="#" className="block text-xs text-gray-500 hover:text-[#b8860b] transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="gsap-reveal-up">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-4">{t('footer.col2Title')}</h4>
            <div className="space-y-2">
              {col2Items.map((item) => (
                <a key={item} href="#" className="block text-xs text-gray-500 hover:text-[#b8860b] transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="gsap-reveal-up">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-4">{t('footer.col3Title')}</h4>
            <div className="space-y-2 text-xs text-gray-500">
              <p>✉️ {t('footer.email')}</p>
              <p>📞 {t('footer.phone')}</p>
              <p>📍 {t('footer.address')}</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200/50 flex flex-wrap justify-between gap-4">
          <span className="text-xs text-gray-600">{t('footer.copyright')}</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#b8860b]/40">{t('footer.tagline')}</span>
            <button className="gsap-backtotop text-xs text-gray-500 hover:text-[#b8860b] transition-colors cursor-pointer">
              ↑ 返回顶部
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
