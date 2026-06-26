'use client'

import { useState, useEffect, useRef } from 'react'
import { useT, langNames, langFlags } from '@/i18n'
import gsap from 'gsap'

export default function LangSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useT()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Animate arrow
  useEffect(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { rotate: open ? 180 : 0, duration: 0.25, ease: 'gsapHero' })
    }
  }, [open])

  // Dropdown enter/exit
  const showDropdown = () => {
    setMounted(true)
    setOpen(true)
    requestAnimationFrame(() => {
      if (dropdownRef.current) {
        gsap.fromTo(dropdownRef.current,
          { opacity: 0, y: -4, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'gsapElastic' }
        )
      }
    })
  }

  const closeDropdown = () => {
    if (dropdownRef.current && open) {
      gsap.to(dropdownRef.current, {
        opacity: 0, y: -4, scale: 0.95, duration: 0.2, ease: 'gsapHero',
        onComplete: () => { setOpen(false); setMounted(false) }
      })
    } else {
      setOpen(false)
      setMounted(false)
    }
  }

  const toggleOpen = () => {
    if (open) {
      closeDropdown()
    } else {
      showDropdown()
    }
  }

  const langs = Object.entries(langNames) as [string, string][]

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={toggleOpen}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-[#b8860b] hover:bg-black/[0.03] transition-all border border-gray-200/50"
      >
        <span>{langFlags[lang as keyof typeof langFlags]}</span>
        <span>{langNames[lang as keyof typeof langNames]}</span>
        <span ref={arrowRef} className="text-[8px] text-gray-500 inline-block">▼</span>
      </button>

      {mounted && (
        <div ref={dropdownRef} className="absolute top-full right-0 mt-1.5 glass rounded-xl overflow-hidden border border-gray-200/50 shadow-2xl min-w-[130px] z-50">
          {langs.map(([code, label]) => (
            <button
              key={code}
              onClick={() => {
                setLang(code as 'zh' | 'en' | 'ja' | 'ko')
                closeDropdown()
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-all ${
                lang === code
                  ? 'text-[#b8860b] bg-[#b8860b]/10'
                  : 'text-gray-600 hover:text-[#b8860b] hover:bg-black/[0.03]'
              }`}
            >
              <span>{langFlags[code as keyof typeof langFlags]}</span>
              <span>{label}</span>
              {lang === code && <span className="ml-auto text-[8px] text-[#b8860b]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
