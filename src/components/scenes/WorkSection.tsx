'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HoloCard } from '@/components/effects/HoloCard'
import TokenStream from '@/components/effects/TokenStream'

interface WorkCard { tag: string; title: string }
interface Stat     { value: string; label: string }
interface WorkData { heading: string; subheading: string; cards: WorkCard[]; stats: Stat[] }

function parseStatValue(v: string) {
  const m = v.match(/^(\d+)(.*)$/)
  return m ? { numeric: parseInt(m[1], 10), suffix: m[2] ?? '' } : { numeric: 0, suffix: v }
}

// Single digit slot-machine wheel
function Digit({ d }: { d: string }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', height: '1.05em', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={d}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0,      opacity: 1 }}
          exit={{    y: '-100%', opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'block' }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function CounterBadge({ value, label }: { value: string; label: string }) {
  const { numeric, suffix } = parseStatValue(value)
  const [count, setCount]   = useState(0)
  const ref                 = useRef<HTMLDivElement>(null)
  const started             = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || started.current) return
      started.current = true
      observer.disconnect()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(numeric); return }
      const duration = Math.min(900, numeric * 22)
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * numeric))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [numeric])

  const digits = String(count).split('')

  return (
    <div
      ref={ref}
      className="card reveal"
      style={{ textAlign: 'left', padding: 'var(--space-8) var(--space-4)' }}
    >
      <div style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: 'clamp(2.25rem, 3.5vw, 3.25rem)',
        fontWeight: 200,
        color: 'var(--color-gold)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        gap: 0,
      }}>
        {digits.map((d, i) => <Digit key={i} d={d} />)}
        {suffix && <span style={{ display: 'inline-block' }}>{suffix}</span>}
      </div>
      <div className="stat-label" style={{ marginTop: 'var(--space-2)' }}>{label}</div>
    </div>
  )
}

export default function WorkSection({ data }: { data: WorkData }) {
  return (
    <section id="work" aria-label="Work and highlights" className="section" style={{ position: 'relative', boxSizing: 'border-box', padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)', textAlign: 'left' }}>
      <TokenStream />
      <p className="section-label">Work</p>

      <div className="col2-grid" style={{ marginBottom: 'var(--space-12)', alignItems: 'center' }}>
        <div>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-5)' }}>{data.heading}</h2>
          <p className="body reveal" style={{ maxWidth: '600px' }}>{data.subheading}</p>
        </div>
        <div className="reveal" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-gold-dim)' }}>
          <img src="/images/work.png" alt="Working with Mian Muhammad Usman" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.1)' }} onError={(e) => { e.currentTarget.src = '/images/Retails1.png'; e.currentTarget.onerror = null; }} />
        </div>
      </div>

      {/* Work cards — shimmer on reveal */}
      <div className="grid-2 reveal-stagger reveal" style={{ marginBottom: 'var(--space-12)' }}>
        {data.cards.map((card, i) => (
          <div key={i} className="spin-border">
          <HoloCard
            className="card card-bevel card-elevate card-reveal-shimmer"
            style={{
              background: 'linear-gradient(135deg, #1a1200 0%, #3d2c00 45%, #1a1200 100%)',
              border: '2px solid var(--color-gold)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
              boxShadow: '0 0 12px rgba(232,184,75,0.35), 0 0 1px rgba(232,184,75,0.8)',
            }}
          >
            <article aria-label={card.tag}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: 'var(--space-3)',
              }}>
                {card.tag}
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.98rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
                fontWeight: 300,
              }}>
                {card.title}
              </h3>
            </article>
          </HoloCard>
          </div>
        ))}
      </div>

      {/* Stats — animated counter badges */}
      <div
        className="stats-grid"
        aria-label="Key statistics"
      >
        {data.stats.map((s, i) => (
          <div key={i} className="spin-border">
            <CounterBadge value={s.value} label={s.label} />
          </div>
        ))}
      </div>
    </section>
  )
}

