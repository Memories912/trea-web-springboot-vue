'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  alpha: number
  colorIdx: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []
    let mouseX = -1000
    let mouseY = -1000
    let frameCount = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.width = '100vw'
      canvas.style.height = '100vh'
    }
    resize()
    window.addEventListener('resize', resize)

    // Throttled mouse
    let mousePending = false
    const handleMouse = (e: MouseEvent) => {
      if (!mousePending) {
        mousePending = true
        requestAnimationFrame(() => {
          mouseX = e.clientX
          mouseY = e.clientY
          mousePending = false
        })
      }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })

    // Fewer particles
    const count = 25
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 0.8 + Math.random() * 1.5,
        alpha: 0.08 + Math.random() * 0.15,
        colorIdx: i % 2,
      })
    }

    const colors = ['rgba(184,134,11,', 'rgba(44,110,110,']

    const animate = () => {
      frameCount++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Only draw mouse lines every 3 frames
      const drawMouse = frameCount % 3 === 0

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20

        // Draw dot
        const color = colors[p.colorIdx]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${color}${p.alpha})`
        ctx.fill()

        // Mouse connection (throttled)
        if (drawMouse) {
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const dist = dx * dx + dy * dy
          if (dist < 30000) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouseX, mouseY)
            ctx.strokeStyle = `${color}${(0.04 * (1 - Math.sqrt(dist) / 173)).toFixed(4)})`
            ctx.lineWidth = 0.3
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
