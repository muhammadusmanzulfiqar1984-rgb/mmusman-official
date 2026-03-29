'use client'
import { useEffect, useRef, useState } from 'react'

interface Node {
  id: string
  label: string
  sub: string
  x: number
  y: number
  r: number
  color: string
  active: boolean
  baseAngle: number
}

interface RawNode { id: string; label: string; sub: string; color: string }
interface SkillscapeData {
  heading: string
  subheading: string
  nodes: RawNode[]
}

const INDUSTRY_CONTENT: Record<string, { headline: string; body: string }> = {
  law: {
    headline: 'Legal Architecture',
    body: 'Not a practitioner who advises from the margins. Mian built legal structures for cross-border transactions — frameworks that held across five jurisdictions simultaneously. Where others see complexity, he sees design.',
  },
  trading: {
    headline: 'Capital Markets',
    body: 'Fifteen years of live position management. Not theoretical finance. Real capital, real risk, real markets — across equities, commodities and structured instruments. The kind of discipline markets either teach you or take from you.',
  },
  retail: {
    headline: 'Retail Systems',
    body: 'Operated retail at enterprise scale. From supply chain logic to floor-level execution — he built operating systems that run without depending on any single individual. Scalable by design, not by accident.',
  },
  oil: {
    headline: 'Energy Sector',
    body: 'Worked inside the energy sector when margins were tight and decisions were irreversible. Strategic positioning in a field where the wrong call costs millions — and the right one compounds for decades.',
  },
  fashion: {
    headline: 'Fashion & Runway',
    body: 'Produced high-profile runway events and shaped brand experiences for houses that compete on identity. The intersection of precision and spectacle — where commercial logic meets cultural weight.',
  },
  politics: {
    headline: 'Political Strategy',
    body: 'Senior-level lobbying at the intersection of commerce and governance. Positioning individuals and institutions in rooms where policy is made, not reported. Influence built on credibility, not proximity.',
  },
}

export default function Skillscape({ data }: { data: SkillscapeData }) {
  const RAW_NODES = data.nodes
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeNode, setActiveNode] = useState<Node | null>(null)
  const [typedText, setTypedText] = useState('')
  const [typedHead, setTypedHead] = useState('')
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number>(0)
  const pausedRef = useRef(false)
  const ringAnglesRef = useRef<number[]>([])
  const hoveredIdRef = useRef<string | null>(null)
  const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Typewriter effect
  useEffect(() => {
    if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
    setTypedText('')
    setTypedHead('')
    if (!activeNode) return
    const content = INDUSTRY_CONTENT[activeNode.id] ?? { headline: activeNode.label, body: activeNode.sub }
    const head = content.headline
    const body = content.body
    let hi = 0
    let bi = 0
    const typeHead = () => {
      if (hi <= head.length) {
        setTypedHead(head.slice(0, hi))
        hi++
        typeTimerRef.current = setTimeout(typeHead, 38)
      } else {
        typeBody()
      }
    }
    const typeBody = () => {
      if (bi <= body.length) {
        setTypedText(body.slice(0, bi))
        bi++
        typeTimerRef.current = setTimeout(typeBody, 18)
      }
    }
    typeTimerRef.current = setTimeout(typeHead, 80)
    return () => { if (typeTimerRef.current) clearTimeout(typeTimerRef.current) }
  }, [activeNode?.id])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const ORRERY = [
      { id: RAW_NODES[0]?.id, speed: 0.00042, rf: 0.10 },
      { id: RAW_NODES[1]?.id, speed: 0.00031, rf: 0.16 },
      { id: RAW_NODES[2]?.id, speed: 0.00023, rf: 0.22 },
      { id: RAW_NODES[3]?.id, speed: 0.00017, rf: 0.28 },
      { id: RAW_NODES[4]?.id, speed: 0.00012, rf: 0.34 },
      { id: RAW_NODES[5]?.id, speed: 0.00008, rf: 0.38 },
    ]
    // Initialise only once — persistent across re-renders
    if (ringAnglesRef.current.length === 0) {
      ringAnglesRef.current = RAW_NODES.map((_, i) => (i / RAW_NODES.length) * Math.PI * 2 - Math.PI / 2)
    }
    const ringAngles = ringAnglesRef.current

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    const initNodes = () => {
      nodesRef.current = RAW_NODES.map((n, i) => ({
        ...n, x: 0, y: 0, r: 10, active: false, baseAngle: ringAngles[i],
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      mouseRef.current = { x: -999, y: -999 }
      hoveredIdRef.current = null
      setActiveNode(null)
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.setAttribute('tabindex', '0')

    const draw = () => {
      if (!canvas) return
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2
      const base = Math.min(W, H)
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#fdf8f0'
      ctx.fillRect(0, 0, W, H)

      const nodes = nodesRef.current
      let newHoveredId: string | null = null

      // Advance angles per ring
      nodes.forEach((node, i) => {
        const o = ORRERY[i]
        if (!o) return
        const hov = node.id === hoveredIdRef.current
        if (!hov) ringAngles[i] += o.speed
        const r = base * o.rf
        node.x = cx + Math.cos(ringAngles[i]) * r
        node.y = cy + Math.sin(ringAngles[i]) * r
        const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y)
        if (dist < 20) newHoveredId = node.id
      })

      if (newHoveredId !== hoveredIdRef.current) {
        hoveredIdRef.current = newHoveredId
        if (newHoveredId) setActiveNode(nodes.find(n => n.id === newHoveredId) ?? null)
        else setActiveNode(null)
      }

      // Outer bezel ticks
      const outerR = base * 0.41
      ctx.beginPath(); ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(120,88,20,0.45)'; ctx.lineWidth = 1.5; ctx.stroke()
      for (let t = 0; t < 72; t++) {
        const a = (t / 72) * Math.PI * 2
        const maj = t % 6 === 0
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * outerR, cy + Math.sin(a) * outerR)
        ctx.lineTo(cx + Math.cos(a) * (outerR - (maj ? 10 : 5)), cy + Math.sin(a) * (outerR - (maj ? 10 : 5)))
        ctx.strokeStyle = maj ? 'rgba(120,88,20,0.8)' : 'rgba(120,88,20,0.35)'
        ctx.lineWidth = maj ? 2 : 0.8; ctx.stroke()
      }

      // Orbit rings
      nodes.forEach((_, i) => {
        const o = ORRERY[i]; if (!o) return
        const r = base * o.rf
        const hov = nodes[i]?.id === hoveredIdRef.current
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = hov ? 'rgba(120,88,20,0.7)' : 'rgba(120,88,20,0.3)'
        ctx.lineWidth = hov ? 2 : 1
        ctx.setLineDash(hov ? [] : [4, 9]); ctx.stroke(); ctx.setLineDash([])
      })

      // Diamond markers + labels
      nodes.forEach((node, i) => {
        const hov = node.id === hoveredIdRef.current
        const nx = node.x
        const ny = node.y + (hov ? -13 : 0)
        const s = hov ? 16 : 11

        if (hov) { ctx.shadowColor = 'rgba(200,155,30,0.7)'; ctx.shadowBlur = 22 }
        ctx.beginPath()
        ctx.moveTo(nx, ny - s); ctx.lineTo(nx + s, ny)
        ctx.lineTo(nx, ny + s); ctx.lineTo(nx - s, ny); ctx.closePath()
        ctx.fillStyle = hov ? '#e0b028' : '#c8a428'
        ctx.fill()
        ctx.strokeStyle = hov ? '#5a3008' : '#7a5810'
        ctx.lineWidth = hov ? 2.5 : 1.5; ctx.stroke()
        ctx.shadowBlur = 0

        const la = ringAngles[i]
        const lo = s + 18
        ctx.font = `${hov ? 'bold 10px' : '600 9px'} DM Mono, monospace`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillStyle = hov ? '#1a0c00' : '#3a2808'
        ctx.fillText(node.label, nx + Math.cos(la) * lo, ny + Math.sin(la) * lo)
      })

      // MMU sun center
      ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2)
      ctx.fillStyle = '#c8a846'; ctx.fill()
      ctx.strokeStyle = '#7a5c18'; ctx.lineWidth = 1.5; ctx.stroke()
      for (let r = 0; r < 12; r++) {
        const a = (r / 12) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * 26, cy + Math.sin(a) * 26)
        ctx.lineTo(cx + Math.cos(a) * 33, cy + Math.sin(a) * 33)
        ctx.strokeStyle = 'rgba(120,90,25,0.45)'; ctx.lineWidth = 1; ctx.stroke()
      }
      ctx.font = 'bold 9px DM Mono, monospace'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = '#0f0800'; ctx.fillText('MMU', cx, cy)

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      id="skillscape"
      aria-label="Skillscape — industry map"
      className="section"
      style={{ position: 'relative', boxSizing: 'border-box', paddingTop: 'clamp(64px, 8vw, 100px)', paddingBottom: 'clamp(64px, 8vw, 100px)', borderBottom: '2px solid var(--color-gold)', textAlign: 'left' }}
    >
      <p className="section-label">Skillscape</p>
      <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-4)' }}>{data.heading}</h2>
      <p className="body reveal" style={{ maxWidth: '540px', marginBottom: 'var(--space-10)' }}>{data.subheading}</p>

      <div className="skillscape-grid" style={{ gap: 'var(--space-8)', alignItems: 'center' }}>
        {/* Canvas */}
        <div style={{ position: 'relative', height: '500px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1.5px solid rgba(160,120,40,0.5)', boxShadow: '0 8px 48px rgba(0,0,0,0.3)' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#fdf8f0', zIndex: 0 }} />
          <canvas
            ref={canvasRef}
            tabIndex={0}
            role="application"
            aria-label="Interactive industry orrery — hover a node to explore"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              height: '100%',
              cursor: 'crosshair',
              display: 'block',
            }}
          />
        </div>

        {/* Detail panel */}
        <div
          style={{
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'var(--space-8)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(180,145,70,0.2)',
            background: 'rgba(255,250,240,0.04)',
            backdropFilter: 'blur(8px)',
            transition: 'border-color 0.3s',
          }}
          aria-live="polite"
        >
          {activeNode ? (
            <>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,165,80,0.7)', marginBottom: 'var(--space-3)' }}>
                — Domain
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--color-gold)', marginBottom: 'var(--space-5)', minHeight: '2.2rem' }}>
                {typedHead}<span style={{ opacity: typedHead.length < (INDUSTRY_CONTENT[activeNode.id]?.headline ?? activeNode.label).length ? 1 : 0, borderRight: '2px solid var(--color-gold)', marginLeft: '2px', animation: 'blink 0.7s step-end infinite' }}>|</span>
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-text-dim)', lineHeight: 1.75, fontWeight: 300, minHeight: '6rem' }}>
                {typedText}<span style={{ opacity: typedText.length < (INDUSTRY_CONTENT[activeNode.id]?.body ?? '').length ? 1 : 0, borderRight: '2px solid rgba(200,165,80,0.6)', marginLeft: '1px' }}>|</span>
              </p>
              <a href="#contact" className="btn btn-primary" style={{ marginTop: 'var(--space-7)', alignSelf: 'flex-start', fontSize: 'var(--text-xs)' }}>
                Discuss this domain →
              </a>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '32px', height: '1px', background: 'rgba(200,165,80,0.3)', margin: '0 auto var(--space-4)' }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-text-ghost)', lineHeight: 2 }}>
                Hover a node<br />to explore the domain
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


