'use client'
import { useEffect, useRef } from 'react'

// Minimalist luxury clock — white dial, gold accents, PKT (UTC+5)
// Original design: open skeleton with sunray guilloche face

export default function VintageClock({ size = 46 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = size * dpr
    canvas.height = size * dpr
    canvas.style.width  = `${size}px`
    canvas.style.height = `${size}px`

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const r  = size / 2 - 2.5

    function draw() {
      // PKT time — UTC+5, independent of local timezone
      const now    = new Date()
      const utcMs  = now.getTime() + now.getTimezoneOffset() * 60000
      const pkt    = new Date(utcMs + 5 * 3600000)
      const h   = pkt.getHours() % 12
      const m   = pkt.getMinutes()
      const s   = pkt.getSeconds()
      const ms  = pkt.getMilliseconds()

      ctx.clearRect(0, 0, size, size)

      // ── Outer deep gold/bronze rim ──
      const rim = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r)
      rim.addColorStop(0,    '#c8a96e')
      rim.addColorStop(0.3,  '#7a5e34')
      rim.addColorStop(0.7,  '#eed9a4')
      rim.addColorStop(1,    '#8b6f42')
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.lineWidth   = 1.5
      ctx.strokeStyle = rim
      ctx.stroke()

      // ── Inner track ──
      ctx.beginPath()
      ctx.arc(cx, cy, r - 3.5, 0, Math.PI * 2)
      ctx.lineWidth   = 0.5
      ctx.strokeStyle = 'rgba(200,169,110,0.15)'
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(cx, cy, r - 5.5, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(200,169,110,0.1)'
      ctx.stroke()

      // ── Minute ticks (60) ──
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2
        const isQuarter = i % 15 === 0
        const isHour = i % 5 === 0

        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(angle) * (r - 3.5), cy + Math.sin(angle) * (r - 3.5))
        
        if (isQuarter || isHour) {
          ctx.lineTo(cx + Math.cos(angle) * (r - 7.5), cy + Math.sin(angle) * (r - 7.5))
          ctx.lineWidth = isQuarter ? 1.5 : 1
          ctx.strokeStyle = isQuarter ? 'rgba(200,169,110,0.95)' : 'rgba(200,169,110,0.45)'
        } else {
          ctx.lineTo(cx + Math.cos(angle) * (r - 5.5), cy + Math.sin(angle) * (r - 5.5))
          ctx.lineWidth = 0.5
          ctx.strokeStyle = 'rgba(200,169,110,0.22)'
        }
        ctx.stroke()
      }

      // ── Roman numerals at 12, 3, 6, 9 ──
      const romans  = ['XII', 'III', 'VI', 'IX'] as const
      const rAngles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]
      ctx.font         = `300 ${Math.round(size * 0.12)}px 'Cormorant Garamond', Georgia, serif`
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle    = 'rgba(200,169,110,0.72)'
      romans.forEach((num, i) => {
        const nr = r - 13
        ctx.fillText(num, cx + Math.cos(rAngles[i]) * nr, cy + Math.sin(rAngles[i]) * nr)
      })

      // ── Helper: draw a needle ──
      const needle = (angle: number, length: number, width: number, tipColor: string, tailColor: string) => {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle)
        ctx.shadowColor = 'rgba(0,0,0,0.65)'
        ctx.shadowBlur  = 4
        const g = ctx.createLinearGradient(0, -length, 0, length * 0.18)
        g.addColorStop(0, tipColor)
        g.addColorStop(1, tailColor)
        ctx.beginPath()
        ctx.moveTo(-width / 2, length * 0.15)
        ctx.lineTo(0,          -length)
        ctx.lineTo(width / 2,  length * 0.15)
        ctx.closePath()
        ctx.fillStyle = g
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.restore()
      }

      // Hour hand
      needle(
        ((h + m / 60) / 12) * Math.PI * 2 - Math.PI / 2,
        r * 0.50, 2.4, '#c8a96e', '#7a5e34'
      )
      // Minute hand
      needle(
        ((m + s / 60) / 60) * Math.PI * 2 - Math.PI / 2,
        r * 0.68, 1.7, '#d4b87a', '#9a7844'
      )

      // ── Second hand — smooth sweep ──
      const sAngle = ((s + ms / 1000) / 60) * Math.PI * 2 - Math.PI / 2
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(sAngle)
      // tail
      ctx.beginPath()
      ctx.moveTo(0, r * 0.22)
      ctx.lineTo(0, -r * 0.76)
      ctx.lineWidth   = 0.85
      ctx.strokeStyle = '#e8c87a'
      ctx.shadowColor = 'rgba(232,200,122,0.55)'
      ctx.shadowBlur  = 5
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.restore()

      // ── Center cap ──
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      const cap = ctx.createRadialGradient(cx - 0.5, cy - 0.5, 0, cx, cy, 3)
      cap.addColorStop(0, '#eed9a4')
      cap.addColorStop(1, '#c8a96e')
      ctx.fillStyle = cap
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, cy, 1.2, 0, Math.PI * 2)
      ctx.fillStyle = '#12100c'
      ctx.fill()
    }

    let raf: number
    const tick = () => { draw(); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      aria-label="Pakistan Standard Time clock"
      title="Pakistan Standard Time (UTC+5)"
      style={{ display: 'block', borderRadius: '50%', flexShrink: 0, cursor: 'default' }}
    />
  )
}
