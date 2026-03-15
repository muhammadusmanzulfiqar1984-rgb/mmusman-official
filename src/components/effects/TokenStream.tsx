'use client'
import { useEffect, useRef } from 'react'

// Falling AI characters + keywords — ported and enhanced from mmusman-web-separate
const CHARS = '01αβγδλΣΔΩ∞≈∫∂πφ{}[]<>=/+*→←↑↓◆◇○●'
const KEYWORDS = ['async','await','yield','class','const','fn','let','mut','pub',
  'impl','trait','loop','match','enum','type','data','node','edge','loss',
  'grad','relu','conv','lstm','attn','bert','gpt','llm','self','net','api']

interface Column {
  x: number
  y: number
  speed: number
  chars: string[]
  useKeyword: boolean
  keyword: string
}

export default function TokenStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const parent = canvas.parentElement!
    let cols: Column[] = []
    let raf: number
    let scrollSpeed = 0

    const init = () => {
      canvas.width  = parent.offsetWidth
      canvas.height = parent.offsetHeight
      const colCount = Math.floor(canvas.width / 24)
      cols = Array.from({ length: colCount }, (_, i) => ({
        x: i * 24 + 12,
        y: Math.random() * canvas.height,
        speed: 0.15 + Math.random() * 0.2,
        chars: Array.from({ length: 8 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
        useKeyword: Math.random() > 0.7,
        keyword: KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)],
      }))
    }

    const onScroll = () => { scrollSpeed = 0.8 }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', init)

    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      cancelAnimationFrame(raf)
      loop()
    })
    observer.observe(canvas)

    init()

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      scrollSpeed = Math.max(0, scrollSpeed - 0.02)
      const spd = 1 + scrollSpeed

      cols.forEach(col => {
        col.y += col.speed * spd
        if (col.y > canvas.height + 60) {
          col.y = -60
          col.useKeyword = Math.random() > 0.7
          col.keyword = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]
        }

        ctx.font = col.useKeyword ? '500 9px DM Mono, monospace' : '400 11px DM Mono, monospace'
        const text = col.useKeyword ? col.keyword : col.chars[0]
        const alpha = 0.06 + Math.random() * 0.06
        ctx.fillStyle = `rgba(200,169,110,${alpha})`
        ctx.fillText(text, col.x, col.y)
      })

      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', init)
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
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  )
}
