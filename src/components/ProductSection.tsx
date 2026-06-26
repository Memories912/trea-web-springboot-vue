'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

const categories = [
  { key: '全部', icon: '📋', label: '全部产品', bg: 'from-[#b8860b]/20 to-[#2c6e6e]/20' },
  { key: '电动工具', icon: '⚡', label: '电动工具', bg: 'from-blue-500/20 to-indigo-600/20' },
  { key: '小家电', icon: '🍟', label: '小家电', bg: 'from-pink-500/20 to-rose-600/20' },
  { key: '酒精测试仪', icon: '🍷', label: '酒精测试仪', bg: 'from-amber-500/20 to-amber-600/20' },
  { key: '激光水平仪', icon: '📐', label: '激光水平仪', bg: 'from-amber-400/20 to-yellow-500/20' },
  { key: '高压清洗机', icon: '🚿', label: '高压清洗机', bg: 'from-teal-500/20 to-cyan-600/20' },
  { key: '潜水泵', icon: '💧', label: '潜水泵', bg: 'from-indigo-500/20 to-blue-600/20' },
]

const products = [
  { id: 1, cat: '电动工具', name: '无刷电动冲击扳手', bg: 'from-amber-400/20 to-yellow-600/20', icon: '⚡',
    specs: ['MOQ: 500台', 'CE/UKCA', '1800W'], tag: '🔥' },
  { id: 2, cat: '电动工具', name: '充电式角磨机', bg: 'from-blue-400/20 to-indigo-600/20', icon: '🔧',
    specs: ['MOQ: 300台', 'CE/FCC', '20V'] },
  { id: 3, cat: '小家电', name: '便携式搅拌杯', bg: 'from-pink-400/20 to-rose-600/20', icon: '🥤',
    specs: ['MOQ: 1000台', 'CE/FCC/ROHS', '400ml'], tag: '✨' },
  { id: 4, cat: '小家电', name: '空气炸锅', bg: 'from-emerald-400/20 to-green-600/20', icon: '🍟',
    specs: ['MOQ: 500台', 'CE/UKCA/GS', '5.5L'] },
  { id: 5, cat: '酒精测试仪', name: '专业酒精测试仪', bg: 'from-amber-400/20 to-amber-600/20', icon: '🍷',
    specs: ['MOQ: 200台', 'CE/FCC/KC', '±0.01%BAC'], tag: '✅' },
  { id: 6, cat: '激光水平仪', name: '绿光激光水平仪', bg: 'from-amber-300/20 to-yellow-500/20', icon: '📐',
    specs: ['MOQ: 300台', 'CE/FCC/UKCA', '±1mm/10m'], tag: '✨' },
  { id: 7, cat: '高压清洗机', name: '高压清洗机', bg: 'from-teal-400/20 to-cyan-600/20', icon: '🚿',
    specs: ['MOQ: 200台', 'CE/UKCA/GS', '160bar'], tag: '🔥' },
  { id: 8, cat: '潜水泵', name: '不锈钢潜水泵', bg: 'from-indigo-400/20 to-blue-600/20', icon: '💧',
    specs: ['MOQ: 100台', 'CE/UKCA/ROHS', '25m'] },
]

export default function ProductSection() {
  const [active, setActive] = useState('全部')
  const filtered = active === '全部' ? products : products.filter(p => p.cat === active)
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  // GSAP ScrollTrigger reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-ps-title', {
        scrollTrigger: { trigger: '.gsap-ps-section', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.6, ease: 'gsapHero'
      })
      gsap.from('.gsap-ps-cats', {
        scrollTrigger: { trigger: '.gsap-ps-section', start: 'top 75%' },
        y: 20, opacity: 0, duration: 0.5, delay: 0.15, ease: 'gsapHero'
      })
    })
    return () => ctx.revert()
  }, [])

  // Flip animation when category changes
  const changeCategory = (cat: string) => {
    if (!gridRef.current || !titleRef.current) {
      setActive(cat)
      return
    }
    gsap.registerPlugin(Flip)
    const state = Flip.getState([gridRef.current, titleRef.current], { props: 'opacity' })
    setActive(cat)
    requestAnimationFrame(() => {
      if (gridRef.current && titleRef.current) {
        Flip.from(state, {
          duration: 0.5,
          ease: 'gsapHero',
          absolute: true,
          onComplete: () => {
            if (gridRef.current) {
              gsap.set(gridRef.current, { clearProps: 'all' })
            }
          }
        })
        // Animate new title
        gsap.from(titleRef.current, { opacity: 0, y: 10, duration: 0.3, ease: 'gsapHero' })
      }
    })
  }

  // Card hover effect
  const onCardEnter = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1.03, duration: 0.25, ease: 'gsapHero' })
  }
  const onCardLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: 'gsapHero' })
  }

  return (
    <section id="products" className="gsap-ps-section section-padding relative overflow-hidden">
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-[#2c6e6e]/5 rounded-full blur-[120px]" />
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="gsap-ps-title text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
            <span className="w-6 h-px bg-[#b8860b]/50" />
            产品中心
            <span className="w-6 h-px bg-[#b8860b]/50" />
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-4">
            Product Categories
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Browse through our product database to find the ideal items for your business.
          </p>
        </div>

        {/* Category Cards */}
        <div className="gsap-ps-cats grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => changeCategory(cat.key)}
              className={`rounded-2xl p-4 md:p-5 text-center transition-all ${
                active === cat.key
                  ? 'bg-gradient-to-br from-[#b8860b] to-[#9a7209] text-white shadow-lg shadow-[#b8860b]/15'
                  : `bg-gradient-to-br ${cat.bg} text-gray-500 hover:text-gray-900 hover:shadow-lg border border-gray-200/50`
              }`}
            >
              <span className={`text-2xl md:text-3xl block mb-2 ${active === cat.key ? '' : 'opacity-80'}`}>
                {cat.icon}
              </span>
              <span className={`text-xs md:text-sm font-medium ${active === cat.key ? 'text-foreground/80' : 'text-gray-600'}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Active category title */}
        <div ref={titleRef} className="flex items-center gap-2 mb-6">
          <span className="text-lg">{categories.find(c => c.key === active)?.icon}</span>
          <span className="text-foreground font-bold">{active}</span>
          <span className="text-xs text-gray-500">({filtered.length} 个产品)</span>
          <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </div>

        {/* Product Grid — Flip layout */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              onMouseEnter={onCardEnter}
              onMouseLeave={onCardLeave}
              className="flowing-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className={`h-40 bg-gradient-to-br ${p.bg} flex items-center justify-center text-4xl relative`}>
                {p.tag && <span className="absolute top-3 left-3 text-lg">{p.tag}</span>}
                <span className="group-hover:scale-110 transition-transform duration-300">{p.icon}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground mb-3">{p.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {p.specs.map((s, j) => (
                    <span key={j} className="px-2.5 py-1 rounded-lg bg-black/[0.03] text-xs text-gray-500">
                      {s}
                    </span>
                  ))}
                </div>
                <a href="#contact"
                  className="mt-4 block w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-[#b8860b]/10 text-[#b8860b] hover:bg-[#b8860b]/20 transition-all"
                >
                  立即询盘 →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* More categories */}
        {active !== '全部' && (
          <div className="mt-10 text-center">
            <div className="glass rounded-2xl p-6 md:p-8 max-w-xl mx-auto">
              <p className="text-sm text-gray-500 mb-2">Are you looking for more categories?</p>
              <p className="text-xs text-gray-500 mb-4">如果你需要其他产品品类，欢迎联系我们的采购代理。</p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
              >
                联系采购代理 →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
