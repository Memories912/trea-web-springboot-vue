'use client'

import { useEffect, useRef } from 'react'

export default function GsapRegistry({ children }: { children: React.ReactNode }) {
  const inited = useRef(false)

  useEffect(() => {
    if (inited.current) return
    inited.current = true

    // Dynamically import GSAP + all plugins
    ;(async () => {
      const gsap = (await import('gsap')).default
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
      const { EasePack } = await import('gsap/EasePack')

      // Register ALL 23 plugins + base
      gsap.registerPlugin(
        ScrollTrigger,
        ScrollToPlugin,
        ScrollSmoother,
        Draggable,
        InertiaPlugin,
        Flip,
        Observer,
        MotionPathPlugin,
        MotionPathHelper,
        DrawSVGPlugin,
        MorphSVGPlugin,
        SplitText,
        TextPlugin,
        ScrambleTextPlugin,
        CustomEase,
        CustomBounce,
        CustomWiggle,
        CSSRulePlugin,
        GSDevTools,
        Physics2DPlugin,
        PhysicsPropsPlugin,
        EasePack,
      )

      // Store globally for devtools access
      ;(window as any).__GSAP = {
        gsap,
        ScrollTrigger,
        Draggable,
        Flip,
        Observer,
        MotionPathPlugin,
        MotionPathHelper,
        DrawSVGPlugin,
        MorphSVGPlugin,
        SplitText,
        CustomEase,
        CustomBounce,
        CustomWiggle,
        GSDevTools,
        Physics2DPlugin,
        PhysicsPropsPlugin,
      }

      // CustomEase: create brand easing curves
      CustomEase.create('gsapHero', 'M0,0 C0.2,0.05 0.4,0.99 1,1')
      CustomEase.create('gsapBounce', 'M0,0 C0.06,0.72 0.22,1 0.34,1 C0.44,1 0.54,0.78 0.66,0.78 C0.77,0.78 0.83,0.95 1,1')
      CustomEase.create('gsapElastic', 'M0,0 C0.2,0.9 0.3,1.1 0.4,1 C0.5,0.9 0.55,1.22 0.66,1.14 C0.77,1.06 0.83,0.95 1,1')

      console.log('[GSAP] All 23 plugins registered ✓')
    })()
  }, [])

  return <>{children}</>
}
