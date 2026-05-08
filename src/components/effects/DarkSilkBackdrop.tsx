'use client'

import { useEffect, useRef } from 'react'

export default function DarkSilkBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    let raf = 0
    let t = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    const draw = () => {
      t += 0.007
      ctx.clearRect(0, 0, w, h)

      const baseGradient = ctx.createLinearGradient(0, 0, w, h)
      baseGradient.addColorStop(0, 'rgba(200,169,110,0.06)')
      baseGradient.addColorStop(0.45, 'rgba(18,12,6,0.02)')
      baseGradient.addColorStop(1, 'rgba(200,169,110,0.09)')
      ctx.fillStyle = baseGradient
      ctx.fillRect(0, 0, w, h)

      const bands = 6
      for (let i = 0; i < bands; i++) {
        const y0 = (h * i) / bands
        const y1 = (h * (i + 1)) / bands
        const phase = i * 0.72 + t
        const amp = 28 + 18 * Math.sin(phase * 0.55)
        const alpha = 0.1 + 0.08 * Math.sin(phase)

        const grad = ctx.createLinearGradient(0, y0, w, y1)
        grad.addColorStop(0, 'rgba(200,169,110,0)')
        grad.addColorStop(0.22, `rgba(245,223,176,${alpha * 0.22})`)
        grad.addColorStop(0.35 + 0.2 * Math.sin(phase), `rgba(200,169,110,${alpha})`)
        grad.addColorStop(0.65 + 0.15 * Math.cos(phase * 0.7), `rgba(155,120,70,${alpha * 0.74})`)
        grad.addColorStop(0.82, `rgba(255,236,194,${alpha * 0.16})`)
        grad.addColorStop(1, 'rgba(200,169,110,0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(0, y0)

        for (let x = 0; x <= w; x += 4) {
          const wave =
            Math.sin(x * 0.012 + phase) * amp +
            Math.sin(x * 0.0068 + phase * 1.3) * amp * 0.5
          ctx.lineTo(x, y0 + wave)
        }

        ctx.lineTo(w, y1)

        for (let x = w; x >= 0; x -= 4) {
          const wave = Math.sin(x * 0.012 + phase + Math.PI) * amp
          ctx.lineTo(x, y1 + wave)
        }

        ctx.closePath()
        ctx.fill()
      }

      const sheen = ctx.createRadialGradient(w * 0.72, h * 0.22, 0, w * 0.72, h * 0.22, Math.max(w, h) * 0.55)
      sheen.addColorStop(0, 'rgba(255,228,170,0.16)')
      sheen.addColorStop(0.35, 'rgba(200,169,110,0.08)')
      sheen.addColorStop(1, 'rgba(200,169,110,0)')
      ctx.fillStyle = sheen
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}
