'use client'
import { useEffect, useRef, useState } from 'react'

interface Node {
  id: string
  label: string
  sub: string
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  active: boolean
}

const RAW_NODES = [
  { id: 'law',      label: 'Law',             sub: 'Legal architecture & cross-border structuring', color: '#c8a96e' },
  { id: 'trading',  label: 'Capital Markets', sub: 'Active trading, financial strategy, market design', color: '#d4b87a' },
  { id: 'retail',   label: 'Retail',          sub: 'Enterprise operating systems at scale', color: '#b89658' },
  { id: 'oil',      label: 'Oil & Gas',       sub: 'Operational strategy in the energy sector', color: '#a08040' },
  { id: 'fashion',  label: 'Fashion & Runway',sub: 'High-profile runway production & brand experience', color: '#c8a96e' },
  { id: 'politics', label: 'Political Strategy', sub: 'Senior-level lobbying & political positioning', color: '#b08848' },
]

export default function Skillscape() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeNode, setActiveNode] = useState<Node | null>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    const initNodes = () => {
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2

      nodesRef.current = RAW_NODES.map((n, i) => {
        const angle = (i / RAW_NODES.length) * Math.PI * 2 - Math.PI / 2
        const radius = Math.min(W, H) * 0.28
        return {
          ...n,
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: 0, vy: 0,
          r: 44,
          active: false,
        }
      })
    }

    resize()
    window.addEventListener('resize', resize)

    // Mouse interaction
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; setActiveNode(null) }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    // Click
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const hit = nodesRef.current.find(n => Math.hypot(n.x - mx, n.y - my) < n.r + 8)
      setActiveNode(hit ?? null)
    }
    canvas.addEventListener('click', onClick)

    // Keyboard navigation
    let focusIndex = -1
    const onKey = (e: KeyboardEvent) => {
      if (!['ArrowRight','ArrowLeft','Enter','Escape'].includes(e.key)) return
      const nodes = nodesRef.current
      if (e.key === 'ArrowRight') focusIndex = (focusIndex + 1) % nodes.length
      if (e.key === 'ArrowLeft')  focusIndex = (focusIndex - 1 + nodes.length) % nodes.length
      if (e.key === 'Enter' && focusIndex >= 0) setActiveNode(nodes[focusIndex])
      if (e.key === 'Escape') { setActiveNode(null); focusIndex = -1 }
    }
    canvas.setAttribute('tabindex', '0')
    canvas.addEventListener('keydown', onKey)

    // Draw loop
    const draw = () => {
      if (!canvas) return
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2
      const mouse = mouseRef.current
      ctx.clearRect(0, 0, W, H)

      const nodes = nodesRef.current

      // Center node
      const centerGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 36)
      centerGrad.addColorStop(0, 'rgba(200,169,110,0.22)')
      centerGrad.addColorStop(1, 'rgba(200,169,110,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 36, 0, Math.PI * 2)
      ctx.fillStyle = centerGrad
      ctx.fill()

      ctx.font = '500 10px DM Mono, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#c8a96e'
      ctx.fillText('MMU', cx, cy - 6)
      ctx.font = '300 8px DM Mono, monospace'
      ctx.fillStyle = 'rgba(200,169,110,0.5)'
      ctx.fillText('Systems', cx, cy + 7)

      nodes.forEach(node => {
        const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y)
        const hovered = dist < node.r + 12

        // Connector line
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(node.x, node.y)
        ctx.strokeStyle = hovered
          ? 'rgba(200,169,110,0.3)'
          : 'rgba(200,169,110,0.08)'
        ctx.lineWidth = hovered ? 1.5 : 1
        ctx.stroke()

        // Glow ring if hovered
        if (hovered) {
          const glow = ctx.createRadialGradient(node.x, node.y, node.r * 0.6, node.x, node.y, node.r * 1.6)
          glow.addColorStop(0, 'rgba(200,169,110,0.12)')
          glow.addColorStop(1, 'rgba(200,169,110,0)')
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.r * 1.6, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }

        // Node circle
        const grad = ctx.createRadialGradient(node.x - 8, node.y - 8, 2, node.x, node.y, node.r)
        grad.addColorStop(0, hovered ? 'rgba(220,190,120,0.25)' : 'rgba(200,169,110,0.14)')
        grad.addColorStop(1, 'rgba(10,10,10,0.7)')
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.strokeStyle = hovered ? 'rgba(200,169,110,0.6)' : 'rgba(200,169,110,0.2)'
        ctx.lineWidth = hovered ? 1.5 : 1
        ctx.stroke()

        // Label
        ctx.font = `${hovered ? '500' : '400'} 9px DM Mono, monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = hovered ? '#e8d8a8' : '#c8a96e'
        ctx.fillText(node.label, node.x, node.y)
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('click', onClick)
      canvas.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <section
      id="skillscape"
      aria-label="Skillscape — industry map"
      className="section"
      style={{ position: 'relative', background: 'rgba(200,169,110,0.01)', height: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box', overflow: 'hidden', paddingTop: 'clamp(20px, 3vw, 40px)', paddingBottom: 'clamp(20px, 3vw, 40px)', borderBottom: '2px solid var(--color-gold)' }}
    >
      <p className="section-label">Skillscape</p>
      <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-4)' }}>
        Six industries. One mind.
      </h2>
      <p className="body reveal" style={{ maxWidth: '540px', marginBottom: 'var(--space-10)' }}>
        Navigate Mian's world — hover any node to explore the domain.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-8)', alignItems: 'center' }}>
        {/* Canvas */}
        <div style={{ position: 'relative', height: '420px' }}>
          <canvas
            ref={canvasRef}
            aria-label="Interactive 2.5D skill map — use arrow keys to navigate nodes, Enter to select"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--color-border)',
              cursor: 'crosshair',
              display: 'block',
            }}
          />
        </div>

        {/* Detail panel */}
        <div
          className="glass"
          style={{
            padding: 'var(--space-8)',
            height: '420px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          aria-live="polite"
          aria-label="Selected industry details"
        >
          {activeNode ? (
            <>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: 'var(--space-4)',
              }}>
                Industry
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 300,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)',
              }}>
                {activeNode.label}
              </h3>
              <p className="body" style={{ fontSize: '0.85rem' }}>
                {activeNode.sub}
              </p>
              <a
                href="#contact"
                className="btn btn-primary"
                style={{ marginTop: 'var(--space-8)', alignSelf: 'flex-start', fontSize: 'var(--text-xs)' }}
              >
                Discuss this domain →
              </a>
            </>
          ) : (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              color: 'var(--color-text-ghost)',
              textAlign: 'center',
              lineHeight: 1.8,
            }}>
              Hover or click a node<br />to explore the domain
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
