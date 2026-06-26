'use client'

import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-hover]')
      if (el) cursor.classList.add('hovering')
    }
    const handleOut = () => cursor.classList.remove('hovering')

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseout', handleOut, { passive: true })

    // Smooth follow — use transform for GPU compositing, no layout
    let rafId: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const isTouch = 'ontouchstart' in window
    if (isTouch) cursor.style.display = 'none'

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [])

  return <div ref={cursorRef} className="cursor-follower" />
}
