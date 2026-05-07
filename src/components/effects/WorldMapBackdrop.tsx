'use client'
import React, { useRef, useEffect } from 'react'

interface WorldMapBackdropProps {
  width?: number
  height?: number
}

export default function WorldMapBackdrop({ width, height }: WorldMapBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const cities = [
    { name: 'London', lat: 51.5, lon: -0.12 },
    { name: 'Karachi', lat: 24.8, lon: 67.0 },
    { name: 'Dubai', lat: 25.2, lon: 55.3 },
    { name: 'Lahore', lat: 31.5, lon: 74.3 },
    { name: 'New York', lat: 40.7, lon: -74.0 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    let t = 0
    let animId: number

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const latlon = (lat: number, lon: number) => {
      const x = ((lon + 180) * W) / 360
      const y = ((90 - lat) * H) / 180
      return { x, y }
    }

    const draw = () => {
      t += 0.0025
      ctx.clearRect(0, 0, W, H)

      // Meridian grid — more visible
      ctx.strokeStyle = 'rgba(200,169,110,0.12)'
      ctx.lineWidth = 0.9
      for (let lon = -180; lon <= 180; lon += 30) {
        const x = ((lon + 180) * W) / 360
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }

      // Parallel grid — more visible
      for (let lat = -90; lat <= 90; lat += 30) {
        const y = ((90 - lat) * H) / 180
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      // Convert cities to screen coords
      const pts = cities.map(c => ({ ...latlon(c.lat, c.lon), name: c.name }))

      // Draw connection arcs between cities — brighter
      const pairs: [number, number][] = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [0, 4]]
      pairs.forEach(([a, b]) => {
        const A = pts[a]
        const B = pts[b]
        const cx = (A.x + B.x) / 2
        const cy = (A.y + B.y) / 2 - 60
        const prog = (Math.sin(t + a + b) + 1) / 2

        ctx.save()
        ctx.setLineDash([4, 6])
        ctx.strokeStyle = 'rgba(200,169,110,0.24)'
        ctx.lineWidth = 1.1
        ctx.beginPath()
        ctx.moveTo(A.x, A.y)
        ctx.quadraticCurveTo(cx, cy, B.x, B.y)
        ctx.stroke()

        // Moving dot along arc — more visible
        const bx = Math.pow(1 - prog, 2) * A.x + 2 * (1 - prog) * prog * cx + Math.pow(prog, 2) * B.x
        const by = Math.pow(1 - prog, 2) * A.y + 2 * (1 - prog) * prog * cy + Math.pow(prog, 2) * B.y
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.arc(bx, by, 4.2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200,169,110,0.95)'
        ctx.fill()
        ctx.restore()
      })

      // City dots with pulse — much more visible
      pts.forEach((p, i) => {
        const pulse = Math.sin(t * 1.2 + i) * 7 + 12
        ctx.beginPath()
        ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200,169,110,0.12)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200,169,110,0.95)'
        ctx.fill()

        // City name labels — now visible
        ctx.fillStyle = 'rgba(220,200,160,0.85)'
        ctx.font = '500 12px DM Mono, monospace'
        ctx.textAlign = 'left'
        ctx.fillText(p.name, p.x + 12, p.y + 5)
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
      aria-hidden="true"
    />
  )
}
