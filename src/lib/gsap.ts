'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Register all available plugins
import { CSSPlugin } from 'gsap/CSSPlugin'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { CustomEase } from 'gsap/CustomEase'
import { CustomBounce } from 'gsap/CustomBounce'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { Draggable } from 'gsap/Draggable'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { EasePack } from 'gsap/EasePack'
import { Flip } from 'gsap/Flip'
import { GSDevTools } from 'gsap/GSDevTools'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { MotionPathHelper } from 'gsap/MotionPathHelper'
import { Observer } from 'gsap/Observer'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { TextPlugin } from 'gsap/TextPlugin'

// ─── Register all plugins ───────────────────────────────

gsap.registerPlugin(
  CSSPlugin,
  CSSRulePlugin,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  Draggable,
  DrawSVGPlugin,
  EasePack,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  MotionPathHelper,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  TextPlugin,
)

// ─── Custom Eases ────────────────────────────────────────

CustomEase.create('heroEnter', 'M0,0 C0.25,0.1 0.25,1 1,1')
CustomEase.create('bounce', 'M0,0 C0.25,0.46 0.45,0.94 0.5,1 C0.55,1.06 0.75,0.54 1,1')
CustomEase.create('elastic', 'M0,0 C0.2,0.05 0.16,1.12 0.25,1.12 C0.34,1.12 0.34,0.82 0.5,0.82 C0.66,0.82 0.66,1.12 0.75,1.12 C0.84,1.12 0.8,0.05 1,1')

// ─── ScrollTrigger Defaults ──────────────────────────────

ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
})

// ─── ScrollSmoother Config ───────────────────────────────

export function initScrollSmoother() {
  if (typeof window === 'undefined') return null
  try {
    return ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.8,
    })
  } catch {
    return null
  }
}

// ─── useGsap hook (auto-cleanup) ────────────────────────

export function useGsap(
  callback: (ctx: { gsap: typeof gsap; container?: React.RefObject<HTMLElement | null> }) => void,
  deps: unknown[] = [],
) {
  const container = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback({ gsap, container: container as React.RefObject<HTMLElement | null> })
    }, container.current ? [container.current] : undefined)
    return () => ctx.revert()
  }, deps)

  return container
}

// ─── Re-export for convenience ──────────────────────────

export {
  gsap,
  CSSRulePlugin,
  CustomBounce,
  CustomEase,
  CustomWiggle,
  Draggable,
  DrawSVGPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  MotionPathHelper,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  TextPlugin,
}

export type GsapContext = { gsap: typeof gsap; container?: React.RefObject<HTMLElement | null> }
