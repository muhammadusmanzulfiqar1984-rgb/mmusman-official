'use client'
import { useEffect, useRef } from 'react'

export default function VoiceOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = 60
    canvas.height = 60
    let frame = 0
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, 60, 60)
      const cx = 30, cy = 30, r = 18
      frame++

      // Pulse rings
      for (let i = 0; i < 3; i++) {
        const phase = ((frame * 0.02) + i * 0.4) % 1
        const ringR = r + phase * 18
        const alpha = (1 - phase) * 0.18
        ctx.beginPath()
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200,169,110,${alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Core sphere gradient
      const grad = ctx.createRadialGradient(cx - 5, cy - 5, 2, cx, cy, r)
      grad.addColorStop(0, '#e8c97a')
      grad.addColorStop(0.5, '#c8a96e')
      grad.addColorStop(1, '#8a6e3a')
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // Audio bars
      const bars = 5
      const barW = 3
      const gap = 4
      const totalW = bars * barW + (bars - 1) * gap
      let bx = cx - totalW / 2
      for (let i = 0; i < bars; i++) {
        const h = 4 + Math.abs(Math.sin(frame * 0.08 + i * 0.9 + Math.random() * 0.2)) * 10
        ctx.fillStyle = 'rgba(10,10,10,0.6)'
        ctx.fillRect(bx, cy - h / 2, barW, h)
        bx += barW + gap
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      role="complementary"
      aria-label="AI-powered experience indicator"
      title="AI-Powered Experience"
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '28px',
        zIndex: 200,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <canvas ref={canvasRef} width={60} height={60} style={{ display: 'block' }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(200,169,110,0.5)',
      }}>
        AI
      </span>
    </div>
  )
}
