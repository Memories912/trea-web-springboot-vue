'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LangSwitcher from './LangSwitcher'
import { useT } from '@/i18n'
import { useContact } from '@/components/ContactModal'

const serviceSlugs = [
  { slug: 'product-photography', icon: '📸', i18n: 'services.productPhotography.title' },
  { slug: 'custom-packaging', icon: '📦', i18n: 'services.customPackaging.title' },
  { slug: 'labels-and-manuals', icon: '🏷️', i18n: 'services.labelsAndManuals.title' },
  { slug: 'full-inspection', icon: '🔍', i18n: 'services.fullInspection.title' },
  { slug: 'warehousing', icon: '🏭', i18n: 'services.warehousing.title' },
  { slug: 'factory-followup', icon: '👷', i18n: 'services.factoryFollowup.title' },
]

export default function Header() {
  const { t } = useT()
  const { open: openContact } = useContact()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setServiceOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { href: '/', key: 'nav.home' },
    { href: '/plans', key: 'nav.plans' },
    { href: '/products', key: 'nav.products' },
    { href: '/faq', key: 'nav.faq' },
    { href: '/payment', key: 'nav.payment' },
    { href: '/about', key: 'nav.about' },
  ]

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href)) || (href === '/' && pathname === '/')

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}>
        <div className="section-container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="GlobalTrade" className="h-24 w-auto md:h-28" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, 3).map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 text-sm transition-colors rounded-lg ${
                  isActive(link.href) ? 'text-[#b8860b] bg-[#b8860b]/5 font-medium' : 'text-[#5a5a6a] hover:text-[#b8860b] hover:bg-[#b8860b]/3'
                }`}>
                {t(link.key)}
              </Link>
            ))}

            {/* Services Dropdown */}
            <li ref={dropdownRef} className="list-none relative">
              <button
                onClick={() => setServiceOpen(!serviceOpen)}
                onMouseEnter={() => setServiceOpen(true)}
                className={`px-4 py-2 text-sm transition-colors rounded-lg flex items-center gap-1.5 ${
                  pathname.startsWith('/services') ? 'text-[#b8860b] bg-[#b8860b]/5 font-medium' : 'text-[#5a5a6a] hover:text-[#b8860b] hover:bg-[#b8860b]/3'
                }`}>
                {t('nav.valueAdded')}
                <span className="text-[10px]">▼</span>
              </button>

              {serviceOpen && (
                <div onMouseLeave={() => setServiceOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass rounded-2xl shadow-xl min-w-[220px] overflow-hidden">
                  <div className="py-2">
                    {serviceSlugs.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`}
                        onClick={() => { setServiceOpen(false); setMobileOpen(false) }}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#5a5a6a] hover:text-[#b8860b] hover:bg-[#b8860b]/3 transition-all group">
                        <span className="text-base w-7 text-center">{s.icon}</span>
                        <span className="flex-1 whitespace-nowrap">{t(s.i18n)}</span>
                        <span className="text-[#b8860b]/30 text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {navLinks.slice(3).map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 text-sm transition-colors rounded-lg ${
                  isActive(link.href) ? 'text-[#b8860b] bg-[#b8860b]/5 font-medium' : 'text-[#5a5a6a] hover:text-[#b8860b] hover:bg-[#b8860b]/3'
                }`}>
                {t(link.key)}
              </Link>
            ))}

            <button onClick={() => scrollTo('#contact')}
              className="ml-3 px-5 py-2 bg-gradient-to-r from-[#b8860b] to-[#c9981e] text-white font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all">
              {t('nav.contact')}
            </button>
            <LangSwitcher className="ml-3" />
          </nav>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher />
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/[0.03] transition-colors"
              aria-label="Menu">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d={mobileOpen ? "M2,4 L22,4" : "M2,4 L22,4"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d={mobileOpen ? "M2,12 L22,12" : "M2,12 L22,12"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"
                  className={mobileOpen ? 'opacity-0' : ''} />
                <path d={mobileOpen ? "M2,20 L22,20" : "M2,20 L22,20"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-white/95 md:hidden">
          {[
            { href: '/', key: 'nav.home' },
            { href: '/plans', key: 'nav.plans' },
            { href: '/products', key: 'nav.products' },
            { href: '#services', key: 'nav.valueAdded' },
            { href: '/faq', key: 'nav.faq' },
            { href: '/payment', key: 'nav.payment' },
            { href: '/about', key: 'nav.about' },
          ].map((item) => {
            if (item.href.startsWith('/')) {
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="text-2xl text-[#5a5a6a] hover:text-[#b8860b] transition-colors">
                  {t(item.key)}
                </Link>
              )
            }
            return (
              <button key={item.href} onClick={() => scrollTo(item.href)}
                className="text-2xl text-[#5a5a6a] hover:text-[#b8860b] transition-colors">
                {t(item.key)}
              </button>
            )
          })}
          <button onClick={() => scrollTo('#contact')}
            className="mt-2 px-8 py-3 bg-gradient-to-r from-[#b8860b] to-[#c9981e] text-white font-bold rounded-xl text-lg">
            {t('nav.contact')}
          </button>
          <LangSwitcher className="mt-4" />
        </div>
      )}
    </>
  )
}
