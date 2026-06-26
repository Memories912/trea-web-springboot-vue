'use client'

import { useMemo, useRef } from 'react'
import { gsap, useGsap, ScrollTrigger } from '@/lib/gsap'
import { useT } from '@/i18n'

const categories = [
  { key: 'apparel', emoji: '👕' },
  { key: 'electronics', emoji: '📱' },
  { key: 'home-supplies', emoji: '🏠' },
  { key: 'bags-cases', emoji: '🎒' },
  { key: 'beauty', emoji: '💄' },
  { key: 'toys', emoji: '🧸' },
  { key: 'sports', emoji: '⚽' },
  { key: 'furniture', emoji: '🪑' },
  { key: 'jewelry', emoji: '💎' },
  { key: 'lighting', emoji: '💡' },
  { key: 'pet-supplies', emoji: '🐾' },
  { key: 'mother-kids', emoji: '👶' },
  { key: 'hardware', emoji: '🔧' },
  { key: 'automotive', emoji: '🚗' },
  { key: 'industrial', emoji: '🏭' },
  { key: 'packaging', emoji: '📦' },
  { key: 'outdoors', emoji: '⛺' },
  { key: 'office-supplies', emoji: '📎' },
  { key: 'garden-tools', emoji: '🛠️' },
]

// Seeded PRNG for SSR-safe shuffle — same result server & client
function seededShuffle<T>(arr: T[], seed = 42): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807 + 1) % 2147483647
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ProductCategories() {
  const { t } = useT()

  const tween1 = useRef<gsap.core.Tween | null>(null)
  const tween2 = useRef<gsap.core.Tween | null>(null)

  const { row1, row2 } = useMemo(() => {
    const shuffled = seededShuffle(categories)
    const mid = Math.ceil(shuffled.length / 2)
    return {
      row1: [...shuffled.slice(0, mid), ...shuffled.slice(0, mid)],
      row2: [...shuffled.slice(mid), ...shuffled.slice(mid)],
    }
  }, [])

  const containerRef = useGsap(({ gsap }) => {
    // Only run on desktop via matchMedia
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      // Entry stagger animation
      gsap.from('.cat-pill', {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.04,
        ease: 'back.out(1.7)',
      })

      // Row 1: scrolls left
      tween1.current = gsap.to('.cat-row-1', {
        xPercent: -50,
        duration: 45,
        repeat: -1,
        ease: 'none',
      })

      // Row 2: scrolls right
      tween2.current = gsap.to('.cat-row-2', {
        xPercent: 50,
        duration: 50,
        repeat: -1,
        ease: 'none',
      })
    })
  }, [])

  const handleMouseEnter = () => {
    if (tween1.current) tween1.current.timeScale(0)
    if (tween2.current) tween2.current.timeScale(0)
  }

  const handleMouseLeave = () => {
    if (tween1.current) tween1.current.timeScale(1)
    if (tween2.current) tween2.current.timeScale(1)
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement | null>}
      className="gsap-cat-scroll relative pt-4 pb-2 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient fade edges - minimal */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#eef2f8] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#eef2f8] to-transparent z-10 pointer-events-none" />

      {/* ─── Row 1: scrolls left ─── */}
      <div className="mb-2.5">
        <div className="cat-row-1 flex gap-2">
          {row1.map((cat, i) => (
            <a
              key={`r1-${cat.key}-${i}`}
              href={`/products/${cat.key}`}
              className="cat-pill group flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-white/60 hover:bg-white/90 hover:border-[#b8860b]/30 hover:shadow-sm transition-all duration-300"
            >
              <span className="text-sm leading-none">{cat.emoji}</span>
              <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-800 whitespace-nowrap">
                {t(`catSelect.${cat.key}`)}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ─── Row 2: scrolls right ─── */}
      <div>
        <div className="cat-row-2 flex gap-2">
          {row2.map((cat, i) => (
            <a
              key={`r2-${cat.key}-${i}`}
              href={`/products/${cat.key}`}
              className="cat-pill group flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-white/60 hover:bg-white/90 hover:border-[#2c6e6e]/30 hover:shadow-sm transition-all duration-300"
            >
              <span className="text-sm leading-none">{cat.emoji}</span>
              <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-800 whitespace-nowrap">
                {t(`catSelect.${cat.key}`)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
