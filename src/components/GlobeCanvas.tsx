'use client'

import { useRef, useEffect } from 'react'
import { continents, hubCities } from '@/data/globeData'

interface GlobeCanvasProps {
  className?: string
  width?: number
  height?: number
}

const R = 130
const FOCAL = 400

function ll3d(lat: number, lng: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = (lng * Math.PI) / 180
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  }
}

function ry(p: { x: number; y: number; z: number }, a: number) {
  const c = Math.cos(a), s = Math.sin(a)
  return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c }
}

function pr(p: { x: number; y: number; z: number }, cx: number, cy: number) {
  const sc = FOCAL / (FOCAL + p.z)
  return { x: cx + p.x * sc, y: cy - p.y * sc, z: p.z, sc }
}

const cont3D = continents.map(c => c.points.map(([lat, lng]) => ll3d(lat, lng, R * 0.98)))
const city3D = hubCities.map(c => ll3d(c.lat, c.lng, R * 0.98))

export default function GlobeCanvas({ className = '', width = 300, height = 300 }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotRef = useRef(0)
  const velRef = useRef(0)

  const draw = (rot: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.clientWidth || width
    const h = canvas.clientHeight || height
    canvas.width = w
    canvas.height = h
    const cx = w / 2, cy = h / 2

    ctx.clearRect(0, 0, w, h)

    // Sphere
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R)
    g.addColorStop(0, 'rgba(56,76,96,0.18)')
    g.addColorStop(0.6, 'rgba(40,55,72,0.14)')
    g.addColorStop(1, 'rgba(20,30,45,0.10)')
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.fillStyle = g
    ctx.fill()

    // Continents
    for (const pts of cont3D) {
      const screen: { x: number; y: number }[] = []
      for (const p of pts) {
        const rp = ry(p, rot)
        if (rp.z > 0) screen.push(pr(rp, cx, cy) as { x: number; y: number })
      }
      if (screen.length < 3) continue
      ctx.beginPath(); ctx.moveTo(screen[0].x, screen[0].y)
      for (let i = 1; i < screen.length; i++) ctx.lineTo(screen[i].x, screen[i].y)
      ctx.closePath()
      ctx.fillStyle = 'rgba(184,134,11,0.10)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(184,134,11,0.12)'
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // Cities
    for (let i = 0; i < city3D.length; i++) {
      const rp = ry(city3D[i], rot)
      if (rp.z <= 0) continue
      const p = pr(rp, cx, cy)
      const zf = Math.max(0.3, p.sc)
      ctx.beginPath(); ctx.arc(p.x, p.y, (i === 0 ? 3 : 2) * zf, 0, Math.PI * 2)
      ctx.fillStyle = i === 0 ? '#b8860b' : '#2c6e6e'
      ctx.fill()
      if (zf > 0.5) {
        ctx.font = `${(i === 0 ? 8 : 7) * zf}px Inter, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillStyle = `rgba(200,200,220,${(0.35 * zf).toFixed(3)})`
        ctx.fillText(`${hubCities[i].flag} ${hubCities[i].name}`, p.x, p.y + (i === 0 ? -12 : -9) * zf)
      }
    }
  }

  useEffect(() => {
    // Draw initial state once
    draw(rotRef.current)

    const canvas = canvasRef.current
    if (!canvas) return

    // Redraw only on drag — no auto-timer
    const down = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId)
      const startX = e.clientX
      const startRot = rotRef.current

      const move = (me: PointerEvent) => {
        const dx = me.clientX - startX
        rotRef.current = startRot + dx * 0.006
        draw(rotRef.current)
      }
      const up = () => {
        canvas.removeEventListener('pointermove', move)
        canvas.removeEventListener('pointerup', up)
        canvas.removeEventListener('pointerleave', up)
      }
      canvas.addEventListener('pointermove', move)
      canvas.addEventListener('pointerup', up)
      canvas.addEventListener('pointerleave', up)
    }

    canvas.addEventListener('pointerdown', down)
    return () => canvas.removeEventListener('pointerdown', down)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full cursor-grab active:cursor-grabbing touch-none ${className}`}
      style={{ width, height }}
    />
  )
}
