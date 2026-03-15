'use client'
import { useEffect, useRef } from 'react'

const SEGMENTS = 18
const STIFFNESS = 0.12
const DAMPING = 0.64
const HEAD_W = 3.5
const GOLD = { r: 200, g: 169, b: 110 } // exactly --color-gold: #c8a96e

export default function SilkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type Seg = { x: number; y: number; vx: number; vy: number }
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const segs: Seg[] = Array.from({ length: SEGMENTS }, () => ({ x: cx, y: cy, vx: 0, vy: 0 }))

    const mouse = { x: cx, y: cy }
    let raf: number
    let last = performance.now()
    let active = true

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onVisibility = () => { active = !document.hidden }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    const render = (ts: number) => {
      raf = requestAnimationFrame(render)
      if (!active) return

      const dt = Math.min((ts - last) / 16, 2.5)
      last = ts

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      segs[0].x += (mouse.x - segs[0].x) * 0.24 * dt
      segs[0].y += (mouse.y - segs[0].y) * 0.24 * dt

      for (let i = 1; i < SEGMENTS; i++) {
        const p = segs[i - 1], c = segs[i]
        c.vx = (c.vx + (p.x - c.x) * STIFFNESS) * DAMPING
        c.vy = (c.vy + (p.y - c.y) * STIFFNESS) * DAMPING
        c.x += c.vx * dt
        c.y += c.vy * dt
      }

      ctx.save()
      ctx.lineCap  = 'round'
      ctx.lineJoin = 'round'

      for (let i = 0; i < SEGMENTS - 1; i++) {
        const t = i / (SEGMENTS - 1)
        const width = HEAD_W * Math.pow(1 - t, 1.1)
        if (width < 0.08) continue
        const alpha = Math.pow(1 - t, 1.2) * 0.9
        const mx = (segs[i].x + segs[i + 1].x) * 0.5
        const my = (segs[i].y + segs[i + 1].y) * 0.5
        ctx.beginPath()
        ctx.moveTo(
          i === 0 ? mouse.x : (segs[i - 1].x + segs[i].x) * 0.5,
          i === 0 ? mouse.y : (segs[i - 1].y + segs[i].y) * 0.5
        )
        ctx.quadraticCurveTo(segs[i].x, segs[i].y, mx, my)
        ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha.toFixed(3)})`
        ctx.lineWidth = width
        ctx.stroke()
      }

      // Glow halo
      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 16)
      grd.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.28)`)
      grd.addColorStop(1, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`)
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Solid gold dot — always visible
      ctx.shadowColor = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.8)`
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${GOLD.r},${GOLD.g},${GOLD.b})`
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.restore()
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}


