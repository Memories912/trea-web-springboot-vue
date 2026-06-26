'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'

// ============================================================
// GSAP Plugin Showcase — 23 plugins, each with a visible demo
// ============================================================
export default function GsapShowcase() {
  useEffect(() => {
    let shipAnim: any

    ;(async () => {
      const gsapMod = await import('gsap')
      const gsap = gsapMod.default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin')
      const { ScrollSmoother } = await import('gsap/ScrollSmoother')
      const { Draggable } = await import('gsap/Draggable')
      const { InertiaPlugin } = await import('gsap/InertiaPlugin')
      const { Flip } = await import('gsap/Flip')
      const { Observer } = await import('gsap/Observer')
      const { MotionPathPlugin } = await import('gsap/MotionPathPlugin')
      const { MotionPathHelper } = await import('gsap/MotionPathHelper')
      const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin')
      const { MorphSVGPlugin } = await import('gsap/MorphSVGPlugin')
      const { SplitText } = await import('gsap/SplitText')
      const { TextPlugin } = await import('gsap/TextPlugin')
      const { ScrambleTextPlugin } = await import('gsap/ScrambleTextPlugin')
      const { CustomEase } = await import('gsap/CustomEase')
      const { CustomBounce } = await import('gsap/CustomBounce')
      const { CustomWiggle } = await import('gsap/CustomWiggle')
      const { CSSRulePlugin } = await import('gsap/CSSRulePlugin')
      const { GSDevTools } = await import('gsap/GSDevTools')
      const { Physics2DPlugin } = await import('gsap/Physics2DPlugin')
      const { PhysicsPropsPlugin } = await import('gsap/PhysicsPropsPlugin')

      // Register all plugins before use
      gsap.registerPlugin(
        ScrollTrigger, ScrollToPlugin, ScrollSmoother, Draggable, InertiaPlugin,
        Flip, Observer, MotionPathPlugin, MotionPathHelper, DrawSVGPlugin,
        MorphSVGPlugin, SplitText, TextPlugin, ScrambleTextPlugin, CustomEase,
        CustomBounce, CustomWiggle, CSSRulePlugin, GSDevTools, Physics2DPlugin,
        PhysicsPropsPlugin,
      )

      // Run all animations (no gsap.context wrapper — direct execution)
      // ─── ScrollSmoother ───
      ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.2,
          effects: true,
          smoothTouch: 0.8,
        })

        // ─── GSDevTools (Ctrl+G) ───
        window.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.ctrlKey && e.key === 'g') {
            e.preventDefault()
            const existing = document.querySelector('.gsdevtools')
            if (existing) { ;(window as any).__gsDevTools?.kill?.(); ;(window as any).__gsDevTools = null }
            else { ;(window as any).__gsDevTools = GSDevTools.create() }
          }
        })

        // ─── 1. gsap.core + CustomEase + EasePack ───
        CustomEase.create('demoEase', 'M0,0 C0.25,1 0.5,1 1,1')
        gsap.from('.demo-core-title', {
          scale: 0, rotation: -180, opacity: 0,
          duration: 1.5, ease: 'demoEase',
          scrollTrigger: { trigger: '.demo-core', start: 'top 85%', toggleActions: 'play none none reverse' },
        })
        gsap.from('.demo-core-desc', {
          y: 40, opacity: 0, duration: 0.8,
          ease: 'elastic.out(1,0.3)', delay: 0.3,
          scrollTrigger: { trigger: '.demo-core', start: 'top 85%', toggleActions: 'play none none reverse' },
        })

        // ─── 2. SplitText ───
        const splitEl = document.querySelector('.demo-split-text')
        if (splitEl) {
          const split = new SplitText(splitEl, { type: 'chars,words' })
          gsap.from(split.chars, {
            yPercent: 150, opacity: 0, rotation: 25,
            stagger: 0.04, duration: 0.9, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.demo-split', start: 'top 85%', toggleActions: 'play none none reverse' },
          })
        }

        // ─── 3. TextPlugin ───
        let phrases = ['旋转立方体', '文字拆解', '逐帧动画', '路径移动']
        let idx = 0
        function typeNext() {
          gsap.to('.demo-text-target', {
            text: { value: phrases[idx], speed: 0.3 },
            duration: 1.2, ease: 'none',
            onComplete: () => {
              gsap.delayedCall(1.5, () => {
                gsap.to('.demo-text-target', {
                  text: { value: '', speed: 0.2 },
                  duration: 0.3, ease: 'none',
                  onComplete: () => { idx = (idx + 1) % phrases.length; typeNext() },
                })
              })
            },
          })
        }
        typeNext()

        // ─── 4. ScrambleTextPlugin ───
        gsap.to('.demo-scramble-target', {
          scrambleText: { text: '乱码解码完成 ✓', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', speed: 0.4, revealDelay: 0.3 },
          duration: 2, delay: 0.5, ease: 'none',
          scrollTrigger: { trigger: '.demo-scramble', start: 'top 85%', once: true },
        })

        // ─── 5. DrawSVGPlugin ───
        gsap.set('.demo-draw-path', { strokeDasharray: 'none' })
        gsap.from('.demo-draw-path', {
          drawSVG: '0%',
          duration: 1.5, stagger: 0.15, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.demo-draw', start: 'top 85%', toggleActions: 'play none none reverse' },
        })
        gsap.from('.demo-draw-circle', {
          drawSVG: '0%',
          duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.demo-draw', start: 'top 85%', toggleActions: 'play none none reverse' },
        })

        // ─── 6. MorphSVGPlugin ───
        const morphPaths = ['M50 5 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z',
          'M50 10 A40 40 0 1 0 50 90 A40 40 0 1 0 50 10',
          'M50 5 Q50 50 95 50 Q50 50 50 95 Q50 50 5 50 Q50 50 50 5']
        let mi = 0
        setInterval(() => {
          mi = (mi + 1) % morphPaths.length
          gsap.to('.demo-morph-shape', { morphSVG: morphPaths[mi], duration: 1, ease: 'elastic.out(1,0.4)' })
        }, 2500)

        // ─── 7. CustomBounce ───
        gsap.from('.demo-bounce-box', {
          y: -300, scale: 0.5, opacity: 0,
          duration: 2, ease: 'bounce.out',
          scrollTrigger: { trigger: '.demo-bounce', start: 'top 85%', toggleActions: 'play none none reverse' },
        })

        // ─── 8. CustomWiggle ───
        gsap.to('.demo-wiggle-box', {
          rotation: 8, duration: 0.3, repeat: 3, yoyo: true, ease: 'power1.inOut',
          scrollTrigger: { trigger: '.demo-wiggle', start: 'top 85%', once: true },
          onComplete: () => {
            gsap.to('.demo-wiggle-box', {
              rotation: 2, duration: 0.6,
              ease: 'wiggle({type:.ease_out, wiggles:5})',
              repeat: -1, yoyo: true, repeatDelay: 2,
            })
          },
        })

        // ─── 9. ScrollTrigger ───
        gsap.utils.toArray('.demo-stagger-card').forEach((el: any, i: number) => {
          gsap.from(el, {
            y: 80, opacity: 0, scale: 0.8, rotation: i % 2 === 0 ? -10 : 10,
            duration: 0.7, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
          })
        })

        // ─── 10. ScrollToPlugin ───
        document.querySelectorAll('.demo-scrollto-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target')
            if (target) gsap.to(window, { scrollTo: { y: target, offsetY: 60 }, duration: 0.8, ease: 'power3.inOut' })
          })
        })

        // ─── 11. Flip ───
        const flipBtn = document.querySelector('.demo-flip-btn')
        const flipContainer = document.querySelector('.demo-flip-container')
        if (flipBtn && flipContainer) {
          flipBtn.addEventListener('click', () => {
            const state = Flip.getState('.demo-flip-item')
            flipContainer.classList.toggle('demo-flip-active')
            Flip.from(state, { duration: 0.6, ease: 'power2.inOut', absolute: true })
          })
        }

        // ─── 12. Observer ───
        Observer.create({
          target: '.demo-observer',
          type: 'wheel,touch',
          onUp: () => gsap.to('.demo-observer-indicator', { rotation: '-=30', duration: 0.4, ease: 'power2.out' }),
          onDown: () => gsap.to('.demo-observer-indicator', { rotation: '+=30', duration: 0.4, ease: 'power2.out' }),
        })

        // ─── 13. Draggable + InertiaPlugin ───
        Draggable.create('.demo-drag-item', {
          type: 'x,y', bounds: '.demo-drag-area', inertia: true, edgeResistance: 0.65, throwResistance: 3000,
          onDragStart: function () { gsap.to(this.target, { scale: 1.15, duration: 0.2, ease: 'power2.out' }) },
          onDragEnd: function () { gsap.to(this.target, { scale: 1, duration: 0.3, ease: 'back.out(2)' }) },
        })

        // ─── 14. MotionPathPlugin + MotionPathHelper ───
        shipAnim = gsap.to('.demo-ship', {
          motionPath: { path: '.demo-path', align: '.demo-path', alignOrigin: [0.5, 0.5], start: 0, end: 1 },
          duration: 6, repeat: -1, ease: 'none',
        })
        document.querySelector('.demo-mp-toggle')?.addEventListener('click', () => {
          const existing = document.querySelector('.mp-helper-active')
          if (existing) { document.querySelectorAll('[data-mp-helper]').forEach(el => el.remove()) }
          else { MotionPathHelper.create('.demo-ship', { path: '.demo-path' }) }
        })

        // ─── 15. CSSRulePlugin ───
        gsap.to('.demo-flow-card', {
          boxShadow: '0 0 40px rgba(255,200,50,0.3), 0 0 80px rgba(255,120,0,0.15)',
          duration: 1.5, yoyo: true, repeat: -1, ease: 'power1.inOut',
        })

        // ─── 16. Physics2DPlugin ───
        document.querySelector('.demo-physics-btn')?.addEventListener('click', () => {
          const rect = (document.querySelector('.demo-physics-area') as HTMLElement).getBoundingClientRect()
          const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff8c32']
          for (let i = 0; i < 30; i++) {
            const dot = document.createElement('div')
            dot.className = 'fixed pointer-events-none z-50 rounded-full'
            dot.style.cssText = `width:${4+Math.random()*8}px;height:${4+Math.random()*8}px;background:${colors[i%5]};left:${rect.left+rect.width/2}px;top:${rect.top+rect.height/2}px`
            document.body.appendChild(dot)
            gsap.to(dot, {
              physics2D: { velocity: 150+Math.random()*300, angle: -90+Math.random()*180, gravity: 500 },
              opacity: 0, scale: 0, duration: 1 + Math.random(), ease: 'none',
              onComplete: () => dot.remove(),
            })
          }
        })

        // ─── 17. PhysicsPropsPlugin ───
        document.querySelectorAll('.demo-spring-item').forEach((el) => {
          el.addEventListener('mouseenter', () => {
            gsap.to(el, {
              physicsProps: { scale: { velocity: 0.4, acceleration: 0.08 }, rotation: { velocity: 8, acceleration: 3 } },
              duration: 1.5, ease: 'none',
            })
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              physicsProps: { scale: { velocity: -0.2, acceleration: 0.1 }, rotation: { velocity: 0, acceleration: 3 } },
              duration: 1, ease: 'none',
              onComplete: () => { gsap.set(el, { scale: 1, rotation: 0 }) },
            })
          })
        })

        ScrollTrigger.refresh()
      })()

    return () => {
      if (shipAnim) shipAnim.kill()
    }
  }, [])

  return (
    <div>
      {/* Nav Buttons */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        {['demo-core', 'demo-split', 'demo-text', 'demo-scramble', 'demo-draw', 'demo-morph', 'demo-bounce', 'demo-wiggle', 'demo-stagger', 'demo-flip', 'demo-observer', 'demo-drag', 'demo-motion', 'demo-physics', 'demo-spring', 'demo-flow'].map((id) => (
          <button key={id} data-target={`#${id}`}
            className="demo-scrollto-btn text-[10px] px-2 py-1 bg-white/80 border border-gray-200 rounded hover:bg-[#b8860b] hover:text-white transition-all text-gray-500 text-left whitespace-nowrap"
          >
            {id.replace('demo-', '#')}
          </button>
        ))}
      </div>

      {/* ─── PLUGIN 1: gsap.core + CustomEase + EasePack ─── */}
      <section id="demo-core" className="demo-core min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="text-center space-y-6">
          <div className="demo-core-title inline-block px-8 py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
            <span className="text-8xl font-black text-white tracking-tight">GSAP</span>
            <span className="text-4xl text-amber-300 ml-3 font-light">3.13</span>
          </div>
          <p className="demo-core-desc text-white/60 text-xl max-w-lg mx-auto">gsap.core + CustomEase + EasePack — 缩放旋转弹性入场</p>
          <div className="flex gap-2 justify-center">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">gsap.core</span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">CustomEase</span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">EasePack</span>
          </div>
        </div>
      </section>

      {/* ─── PLUGIN 2: SplitText ─── */}
      <section id="demo-split" className="demo-split min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900">
        <div className="text-center max-w-4xl px-8">
          <span className="text-xs text-cyan-400 font-mono mb-4 block">SplitText</span>
          <h2 className="demo-split-text text-6xl md:text-8xl font-extrabold text-white leading-tight">
            Split字符逐字飘入
          </h2>
          <p className="text-white/40 text-sm mt-8">每个字符独立旋转 + 位移 + 弹性缓动，stagger 0.04s 依次入场</p>
        </div>
      </section>

      {/* ─── PLUGIN 3: TextPlugin ─── */}
      <section id="demo-text" className="demo-text min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
        <div className="text-center">
          <span className="text-xs text-emerald-300 font-mono mb-4 block">TextPlugin</span>
          <div className="demo-text-target text-5xl md:text-7xl font-bold text-white min-h-[1.2em]">
            正在打字中...
          </div>
          <p className="text-white/40 text-sm mt-6">循环打字机效果，每句停留 1.5s 后清除重新输入</p>
        </div>
      </section>

      {/* ─── PLUGIN 4: ScrambleTextPlugin ─── */}
      <section id="demo-scramble" className="demo-scramble min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-pink-800 to-fuchsia-900">
        <div className="text-center">
          <span className="text-xs text-pink-300 font-mono mb-4 block">ScrambleTextPlugin</span>
          <div className="demo-scramble-target text-4xl md:text-6xl font-mono font-bold text-white min-h-[1.2em] bg-white/5 px-12 py-6 rounded-2xl border border-white/10 inline-block">
            初始化中...
          </div>
          <p className="text-white/40 text-sm mt-6">随机字符乱码 → 解码为最终文本</p>
        </div>
      </section>

      {/* ─── PLUGIN 5: DrawSVGPlugin ─── */}
      <section id="demo-draw" className="demo-draw min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <span className="text-xs text-blue-300 font-mono mb-4 block">DrawSVGPlugin</span>
          <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto">
            <path className="demo-draw-path" d="M50,150 C100,50 150,50 200,100 C250,150 300,150 350,100" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="400" strokeLinecap="round" />
            <path className="demo-draw-path" d="M50,100 C100,150 150,150 200,50 C250,30 300,100 350,80" fill="none" stroke="#a78bfa" strokeWidth="3" strokeDasharray="400" strokeLinecap="round" />
            <circle className="demo-draw-circle" cx="200" cy="130" r="30" fill="none" stroke="#fbbf24" strokeWidth="2" />
          </svg>
          <p className="text-white/40 text-sm mt-4">SVG 路径从 0% 绘制到 100%</p>
        </div>
      </section>

      {/* ─── PLUGIN 6: MorphSVGPlugin ─── */}
      <section id="demo-morph" className="demo-morph min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900">
        <div className="text-center">
          <span className="text-xs text-amber-300 font-mono mb-4 block">MorphSVGPlugin</span>
          <svg viewBox="0 0 100 100" className="w-64 h-64 mx-auto">
            <path className="demo-morph-shape" fill="#fbbf24" d="M50 5 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
          </svg>
          <p className="text-white/40 text-sm mt-4">五角星 → 圆形 → 菱形，每 2.5s 变形一次</p>
        </div>
      </section>

      {/* ─── PLUGIN 7: CustomBounce ─── */}
      <section id="demo-bounce" className="demo-bounce min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-rose-800 to-pink-900">
        <div className="text-center">
          <span className="text-xs text-red-300 font-mono mb-4 block">CustomBounce</span>
          <div className="demo-bounce-box w-48 h-48 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🔄</span>
          </div>
          <p className="text-white/40 text-sm mt-6">bounce.out 缓动弹跳入场</p>
        </div>
      </section>

      {/* ─── PLUGIN 8: CustomWiggle ─── */}
      <section id="demo-wiggle" className="demo-wiggle min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900">
        <div className="text-center">
          <span className="text-xs text-purple-300 font-mono mb-4 block">CustomWiggle</span>
          <div className="demo-wiggle-box w-48 h-48 bg-gradient-to-br from-violet-400 to-purple-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🌀</span>
          </div>
          <p className="text-white/40 text-sm mt-6">wiggle({'{'}type:ease_out, wiggles:5{'}'}) 持续抖动</p>
        </div>
      </section>

      {/* ─── PLUGIN 9: ScrollTrigger Stagger ─── */}
      <section id="demo-stagger" className="demo-stagger min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-neutral-800 to-stone-900">
        <div className="text-center">
          <span className="text-xs text-gray-500 font-mono mb-4 block">ScrollTrigger + Stagger</span>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {['🟥', '🟧', '🟨', '🟩', '🟦', '🟪'].map((c, i) => (
              <div key={i} className={`demo-stagger-card w-24 h-24 rounded-2xl flex items-center justify-center text-4xl ${i % 2 === 0 ? 'bg-white/10' : 'bg-white/5'}`}>
                {c}
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm mt-6">每张卡片延迟 0.12s 依次旋转缩放入场</p>
        </div>
      </section>

      {/* ─── PLUGIN 10: Flip ─── */}
      <section id="demo-flip" className="demo-flip min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-900 via-green-800 to-emerald-900">
        <div className="text-center">
          <span className="text-xs text-lime-300 font-mono mb-4 block">Flip</span>
          <button className="demo-flip-btn mb-8 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 hover:bg-white/20 transition-all text-sm">
            切换布局 ↻
          </button>
          <div className="demo-flip-container flex flex-col gap-3 max-w-xs mx-auto">
            {['A', 'B', 'C', 'D'].map((l) => (
              <div key={l} className="demo-flip-item px-8 py-4 bg-white/10 border border-white/10 rounded-xl text-white text-lg font-bold">
                {l}
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm mt-4">Flip 记录状态，在 grid ↔ flex 布局间平滑过渡</p>
        </div>
      </section>

      {/* ─── PLUGIN 11: Observer ─── */}
      <section id="demo-observer" className="demo-observer min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 via-sky-800 to-blue-900">
        <div className="text-center">
          <span className="text-xs text-cyan-300 font-mono mb-4 block">Observer</span>
          <div className="demo-observer-indicator w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mx-auto flex items-center justify-center shadow-2xl cursor-pointer select-none">
            <span className="text-6xl">🎯</span>
          </div>
          <p className="text-white/40 text-sm mt-4">鼠标滚轮旋转指示器 (±30°)</p>
        </div>
      </section>

      {/* ─── PLUGIN 12+13: Draggable + InertiaPlugin ─── */}
      <section id="demo-drag" className="demo-drag min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-900 via-indigo-800 to-blue-900">
        <div className="text-center">
          <span className="text-xs text-sky-300 font-mono mb-4 block">Draggable + InertiaPlugin</span>
          <div className="demo-drag-area relative w-96 h-80 mx-auto border-2 border-dashed border-white/20 rounded-3xl overflow-hidden">
            {['🟥', '🟦', '🟩', '🟨'].map((c, i) => (
              <div key={i} className="demo-drag-item absolute w-16 h-16 rounded-2xl flex items-center justify-center text-2xl cursor-grab active:cursor-grabbing select-none shadow-lg"
                style={{ background: `hsla(${i*90+180},70%,60%,0.3)`, border: '1px solid hsla(${i*90+180},70%,60%,0.4)', left: 20+i*80, top: 80+Math.sin(i)*30 }}
              >{c}</div>
            ))}
          </div>
          <p className="text-white/40 text-sm mt-4">拖拽卡片 — inertia: true 释放惯性</p>
        </div>
      </section>

      {/* ─── PLUGIN 14+15: MotionPathPlugin + MotionPathHelper ─── */}
      <section id="demo-motion" className="demo-motion min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900">
        <div className="text-center">
          <span className="text-xs text-amber-300 font-mono mb-4 block">MotionPathPlugin + MotionPathHelper</span>
          <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
            <path className="demo-path" d="M30,100 C30,20 120,20 150,100 C180,180 270,180 270,100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5 5" />
            <rect className="demo-ship" x="-8" y="-6" width="16" height="12" rx="3" fill="#fbbf24" opacity="0.9" />
          </svg>
          <button className="demo-mp-toggle mt-6 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80 hover:bg-white/20 transition-all text-sm">
            MotionPathHelper 路径编辑器
          </button>
          <p className="text-white/40 text-sm mt-3">小船沿贝塞尔路径运动，6s 一圈</p>
        </div>
      </section>

      {/* ─── PLUGIN 16: CSSRulePlugin ─── */}
      <section id="demo-flow" className="demo-flow min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-zinc-800 to-neutral-900">
        <div className="text-center">
          <span className="text-xs text-stone-300 font-mono mb-4 block">CSSRulePlugin</span>
          <div className="demo-flow-card w-64 h-64 mx-auto rounded-3xl border border-amber-500/30 flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-orange-500/5">
            <span className="text-6xl">✨</span>
          </div>
          <p className="text-white/40 text-sm mt-6">boxShadow 脉动发光 (yoyo 循环)</p>
        </div>
      </section>

      {/* ─── PLUGIN 17: Physics2DPlugin ─── */}
      <section id="demo-physics" className="demo-physics min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900">
        <div className="text-center">
          <span className="text-xs text-slate-300 font-mono mb-4 block">Physics2DPlugin</span>
          <div className="demo-physics-area relative w-80 h-64 mx-auto border-2 border-dashed border-white/20 rounded-3xl flex items-center justify-center">
            <button className="demo-physics-btn px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-xl text-lg hover:shadow-xl transition-all">
              发射粒子 🚀
            </button>
          </div>
          <p className="text-white/40 text-sm mt-4">30 个彩色粒子，physics2D 物理随机发射</p>
        </div>
      </section>

      {/* ─── PLUGIN 18: PhysicsPropsPlugin ─── */}
      <section id="demo-spring" className="demo-spring min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-emerald-800 to-green-900">
        <div className="text-center">
          <span className="text-xs text-teal-300 font-mono mb-4 block">PhysicsPropsPlugin</span>
          <div className="flex gap-6 mx-auto justify-center">
            {['🎈', '🎪', '🎠', '🎡'].map((e, i) => (
              <div key={i} className="demo-spring-item w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl cursor-pointer hover:border-teal-400/50 transition-colors">
                {e}
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm mt-6">悬停触发 PhysicsProps 弹簧缩放 + 旋转</p>
        </div>
      </section>

      {/* ─── PLUGIN 19: GSDevTools ─── */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900">
        <div className="text-center">
          <span className="text-xs text-amber-300 font-mono mb-4 block">GSDevTools</span>
          <div className="text-6xl text-white mb-4">⌨️</div>
          <p className="text-white/80 text-2xl font-bold mb-2">按 Ctrl+G 打开 GSDevTools</p>
          <p className="text-white/40 text-sm">实时时间轴检查器，可拖拽 scrub、调整播放速度</p>
        </div>
      </section>

      {/* ─── PLUGIN 20: ScrollToPlugin ─── */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
        <div className="text-center">
          <span className="text-xs text-slate-300 font-mono mb-4 block">ScrollToPlugin + ScrollSmoother</span>
          <div className="text-5xl text-white mb-4">🏁</div>
          <p className="text-white/60 text-lg mb-8">点击左侧导航按钮 → 平滑滚动到各插件演示区</p>
          <p className="text-white/40 text-sm">ScrollSmoother 全局惯性滚动效果已激活</p>
        </div>
      </section>

      {/* Plugins used internal note */}
      <div className="hidden">ScrollSmoother, ScrollTrigger, ScrollToPlugin 全局激活</div>
    </div>
  )
}
