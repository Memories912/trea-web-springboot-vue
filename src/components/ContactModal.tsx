'use client'

import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { useT } from '@/i18n'
import gsap from 'gsap'

interface ContactContextType {
  open: () => void
  close: () => void
}

const ContactContext = createContext<ContactContextType>({
  open: () => {},
  close: () => {},
})

export function useContact() {
  return useContext(ContactContext)
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const open = () => {
    setMounted(true)
    setIsOpen(true)
  }

  const close = () => {
    if (tlRef.current) {
      tlRef.current.reverse()
    }
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 })
    gsap.to(panelRef.current, {
      opacity: 0, scale: 0.9, y: 20, duration: 0.3,
      ease: 'gsapHero',
      onComplete: () => {
        setIsOpen(false)
        setMounted(false)
      }
    })
  }

  useEffect(() => {
    if (isOpen && backdropRef.current && panelRef.current) {
      // Animate in
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(panelRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'gsapElastic' }
      )
      // GSDevTools hint: type GSDevTools.open() in console to debug this animation
    }
  }, [isOpen])

  // Cleanup
  useEffect(() => {
    return () => {
      tlRef.current?.kill()
    }
  }, [])

  return (
    <ContactContext.Provider value={{ open, close }}>
      {children}
      {mounted && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            onClick={close}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <div ref={panelRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <PanelContent onClose={close} />
          </div>
        </>
      )}
    </ContactContext.Provider>
  )
}

function PanelContent({ onClose }: { onClose: () => void }) {
  const { t } = useT()
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (linksRef.current) {
      gsap.from(linksRef.current.children, {
        opacity: 0, x: -20, stagger: 0.08, delay: 0.4, duration: 0.4, ease: 'gsapHero'
      })
    }
  }, [])

  return (
    <div className="w-full max-w-md glass rounded-3xl p-8 pointer-events-auto border border-gray-200 shadow-2xl">
      {/* Close */}
      <button
        onClick={onClose}
        className="float-right w-8 h-8 flex items-center justify-center rounded-full bg-black/[0.03] hover:bg-black/[0.05] text-gray-500 hover:text-gray-900 transition-colors"
      >
        ✕
      </button>

      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#b8860b] to-[#9a7209] flex items-center justify-center text-2xl">
        📞
      </div>

      <h3 className="text-2xl font-extrabold text-foreground text-center mb-2">
        {t('contactModal.title')}
      </h3>
      <p className="text-sm text-gray-500 text-center mb-8">
        {t('contactModal.desc')}
      </p>

      {/* Contact Options */}
      <div ref={linksRef} className="space-y-3">
        {/* Phone */}
        <a
          href="tel:+8612345678901"
          className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:border-[#b8860b]/20 transition-all group"
        >
          <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#b8860b]/20 to-[#9a7209]/20 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            📱
          </span>
          <div className="flex-1">
            <p className="text-xs text-gray-500">{t('contactModal.phone')}</p>
            <p className="text-sm font-semibold text-foreground group-hover:text-[#b8860b] transition-colors">
              +86 123 4567 8901
            </p>
          </div>
          <span className="text-gray-500 group-hover:text-[#b8860b] transition-colors">→</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/8612345678901"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:border-[#b8860b]/20 transition-all group"
        >
          <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            💬
          </span>
          <div className="flex-1">
            <p className="text-xs text-gray-500">WhatsApp</p>
            <p className="text-sm font-semibold text-foreground group-hover:text-[#b8860b] transition-colors">
              +86 123 4567 8901
            </p>
          </div>
          <span className="text-gray-500 group-hover:text-[#b8860b] transition-colors">→</span>
        </a>

        {/* Email */}
        <a
          href="mailto:contact@globaltradesupply.com"
          className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:border-[#b8860b]/20 transition-all group"
        >
          <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            ✉️
          </span>
          <div className="flex-1">
            <p className="text-xs text-gray-500">{t('contactModal.email')}</p>
            <p className="text-sm font-semibold text-foreground group-hover:text-[#b8860b] transition-colors">
              contact@globaltradesupply.com
            </p>
          </div>
          <span className="text-gray-500 group-hover:text-[#b8860b] transition-colors">→</span>
        </a>
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-[#b8860b] transition-colors underline underline-offset-4"
        >
          {t('contactModal.contactForm')}
        </button>
      </div>
    </div>
  )
}
