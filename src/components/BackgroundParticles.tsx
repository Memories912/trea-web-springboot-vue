'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  alphaBase: number
}

export default function BackgroundParticles({ count = 40, speed = 0.3 }: { count?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)
  const dimsRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dimsRef.current = { w: window.innerWidth, h: window.innerHeight }
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    const init = () => {
      resize()
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * dimsRef.current.w,
        y: Math.random() * dimsRef.current.h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 1 + Math.random() * 2,
        alpha: 0,
        alphaBase: 0.08 + Math.random() * 0.12,
      }))
    }

    init()

    let running = true
    let time = 0

    const loop = () => {
      if (!running) return
      time += 0.016

      const ctx = canvas.getContext('2d')
      if (!ctx || !canvas) { frameRef.current = requestAnimationFrame(loop); return }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { w, h } = dimsRef.current

      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // Fade in
        p.alpha = Math.min(p.alpha + 0.005, p.alphaBase)

        ctx.beginPath()
        ctx.arc(p.x * dpr, p.y * dpr, p.r * dpr, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184,134,11,${p.alpha.toFixed(3)})`
        ctx.fill()
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]
          const b = particlesRef.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 150

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08
            ctx.beginPath()
            ctx.moveTo(a.x * dpr, a.y * dpr)
            ctx.lineTo(b.x * dpr, b.y * dpr)
            ctx.strokeStyle = `rgba(184,134,11,${alpha.toFixed(3)})`
            ctx.lineWidth = 0.5 * dpr
            ctx.stroke()
          }
        }
      }

      frameRef.current = requestAnimationFrame(loop)
    }

    frameRef.current = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [count, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    />
  )
}
