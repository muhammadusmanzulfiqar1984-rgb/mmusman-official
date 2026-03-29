'use client'
import { useEffect, useRef, useState } from 'react'
import { getParticleCount } from '@/lib/deviceTier'

// Sparse slow-floating gold dust motes — 30–40 particles max.
// Paused under prefers-reduced-motion and tab hidden.
// Optimized for mobile: particle count adapts based on device capability.

interface Mote {
  x: number; y: number
  vx: number; vy: number
  r: number
  alpha: number
  targetAlpha: number
  life: number
  maxLife: number
}

const COUNT_BASE = 18  // sparse at 60fps; auto-tunes down

export default function GoldDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    // Lazy activation: wait 2 seconds before starting animation
    const activationTimer = setTimeout(() => setActive(true), 2000)
    return () => clearTimeout(activationTimer)
  }, [])

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (): Mote => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.25 + 0.08),
      r: Math.random() * 0.9 + 0.3,
      alpha: 0,
      targetAlpha: Math.random() * 0.10 + 0.03,
      life: 0,
      maxLife: Math.random() * 400 + 300,
    })

    // Adjust particle count based on device capability
    const particleCount = getParticleCount(COUNT_BASE)
    const motes: Mote[] = Array.from({ length: particleCount }, () => {
      const m = spawn(); m.y = Math.random() * canvas.height; m.life = Math.random() * m.maxLife; return m
    })

    let raf: number
    let running = !document.hidden
    document.addEventListener('visibilitychange', () => { running = !document.hidden })

    // FPS auto-tune — trim mote count if FPS drops below 40
    let lastTs   = performance.now()
    let fpsSmooth = 60
    let activeCount = COUNT_BASE

    const render = (ts: number) => {
      if (!running) { raf = requestAnimationFrame(render); return }

      // FPS tracking with exponential smoothing
      const dt = ts - lastTs
      lastTs = ts
      fpsSmooth = fpsSmooth * 0.9 + (1000 / Math.max(dt, 1)) * 0.1
      if (fpsSmooth < 40 && activeCount > 4)  activeCount = Math.max(4, activeCount - 2)
      if (fpsSmooth > 55 && activeCount < COUNT_BASE) activeCount++

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < activeCount; i++) {
        const m = motes[i]
        m.life++
        m.x += m.vx
        m.y += m.vy
        m.vx += (Math.random() - 0.5) * 0.005

        const progress = m.life / m.maxLife
        if (progress < 0.15) m.alpha = m.targetAlpha * (progress / 0.15)
        else if (progress > 0.8) m.alpha = m.targetAlpha * ((1 - progress) / 0.2)
        else m.alpha = m.targetAlpha

        if (m.life >= m.maxLife || m.y < -10) motes[i] = spawn()

        const grd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 2.5)
        grd.addColorStop(0, `rgba(240,210,150,${m.alpha})`)
        grd.addColorStop(1, `rgba(200,169,110,0)`)
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      }

      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      id="gold-dust-canvas"
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none', mixBlendMode: 'screen' }}
    />
  )
}
