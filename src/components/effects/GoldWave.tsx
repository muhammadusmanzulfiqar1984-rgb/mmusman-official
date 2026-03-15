'use client'
import { useEffect, useRef } from 'react'

// Three slow sine-displaced gold wave bands — very low opacity ambient layer.
// Paused when tab hidden or prefers-reduced-motion.

export default function GoldWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let raf: number
    let t = 0
    let running = !document.hidden

    document.addEventListener('visibilitychange', () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(render)
    })

    // Reduced motion: render one static frame and stop
    if (reduced) {
      renderFrame()
      return () => window.removeEventListener('resize', resize)
    }

    function renderFrame() {
      if (!canvas) return
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Hue breathing — slow sine oscillation between cool-gold and warm-gold (~21 s period)
      const breath = 0.5 + 0.5 * Math.sin(t * 0.3)
      const gr = Math.round(188 + breath * 28)   // 188 → 216
      const gg = Math.round(158 + breath * 24)   // 158 → 182
      const gb = Math.round(100 + breath * 22)   // 100 → 122
      const grC = Math.round(gr  * 0.72)          // darker crest shadow
      const ggC = Math.round(gg  * 0.70)
      const gbC = Math.round(gb  * 0.70)

      const waves = [
        { amp: H * 0.055, freq: 0.0016, phase: 0,            speed: 0.9,  yBase: H * 0.25, alpha: 0.032 },
        { amp: H * 0.042, freq: 0.0022, phase: Math.PI,       speed: 0.65, yBase: H * 0.52, alpha: 0.024 },
        { amp: H * 0.048, freq: 0.0013, phase: Math.PI * 0.6, speed: 1.2,  yBase: H * 0.76, alpha: 0.022 },
      ]

      waves.forEach(w => {
        // Fill body
        ctx.beginPath()
        for (let x = 0; x <= W; x += 3) {
          const y = w.yBase
            + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp
            + Math.sin(x * w.freq * 2.1 - t * 0.45 + w.phase) * w.amp * 0.32
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()

        const fill = ctx.createLinearGradient(0, w.yBase - w.amp, 0, w.yBase + w.amp * 2)
        fill.addColorStop(0,    `rgba(${gr},${gg},${gb},0)`)
        fill.addColorStop(0.45, `rgba(${gr},${gg},${gb},${w.alpha})`)
        fill.addColorStop(1,    `rgba(${grC},${ggC},${gbC},0)`)
        ctx.fillStyle = fill
        ctx.fill()

        // Glowing crest line
        ctx.beginPath()
        for (let x = 0; x <= W; x += 3) {
          const y = w.yBase
            + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp
            + Math.sin(x * w.freq * 2.1 - t * 0.45 + w.phase) * w.amp * 0.32
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }

        // Metallic shimmer on crest — gradient stroke (also breathes)
        const cr = Math.round(gr  + 20); const cg = Math.round(gg  + 18); const cb = Math.round(gb  + 12)
        const crest = ctx.createLinearGradient(0, 0, W, 0)
        crest.addColorStop(0,    `rgba(${gr},${gg},${gb},0)`)
        crest.addColorStop(0.25, `rgba(${cr},${cg},${cb},${w.alpha * 3})`)
        crest.addColorStop(0.5,  `rgba(${cr + 12},${cg + 12},${cb + 8},${w.alpha * 4})`)
        crest.addColorStop(0.75, `rgba(${cr},${cg},${cb},${w.alpha * 3})`)
        crest.addColorStop(1,    `rgba(${gr},${gg},${gb},0)`)
        ctx.strokeStyle = crest
        ctx.lineWidth = 1.2
        ctx.stroke()
      })
    }

    const render = () => {
      if (!running) return
      t += 0.004
      renderFrame()
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      id="gold-wave-canvas"
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  )
}
