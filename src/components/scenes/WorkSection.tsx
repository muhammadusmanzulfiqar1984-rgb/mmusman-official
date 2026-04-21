'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface WorkCard { tag: string; title: string }
interface Stat     { value: string; label: string }
interface WorkData { heading: string; subheading: string; cards: WorkCard[]; stats: Stat[] }

function parseStatValue(v: string) {
  const m = v.match(/^(\d+)(.*)$/)
  return m ? { numeric: parseInt(m[1], 10), suffix: m[2] ?? '' } : { numeric: 0, suffix: v }
}

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
  const rafRef              = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(numeric); return
    }
    const dur = Math.max(1600, numeric * 70)
    let t0: number | null = null
    const tick = (now: number) => {
      if (!t0) t0 = now
      const p = Math.min((now - t0) / dur, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * numeric))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [numeric])

  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 3vw, 2.8rem)',
        fontWeight: 300,
        color: 'var(--color-gold)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {String(count).split('').map((d, i) => <Digit key={i} d={d} />)}
        {suffix && <span>{suffix}</span>}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(200,169,110,0.45)',
        marginTop: '8px',
      }}>{label}</div>
    </div>
  )
}

export default function WorkSection({ data }: { data: WorkData }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="work"
      aria-label="Operating record"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)',
        borderBottom: '2px solid var(--color-gold)',
      }}
    >
      <p className="section-label">Practice</p>

      {/* Two-column: heading left, stats right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 5vw, 80px)',
        alignItems: 'end',
        marginBottom: 'clamp(40px, 6vw, 72px)',
      }}
      className="work-header-grid"
      >
        <div>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-4)' }}>{data.heading}</h2>
          <p className="reveal" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 300,
            color: 'var(--color-text-muted)',
            lineHeight: 1.75,
            maxWidth: '480px',
          }}>{data.subheading}</p>
        </div>

        {/* Stats — compact row */}
        <div style={{
          display: 'flex',
          gap: 'clamp(24px, 4vw, 56px)',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingBottom: '4px',
        }}
        className="reveal"
        >
          {data.stats.map((s, i) => <CounterBadge key={i} value={s.value} label={s.label} />)}
        </div>
      </div>

      {/* Domain register — vertical list, hover expand */}
      <div
        className="reveal"
        role="list"
        style={{ borderTop: '1px solid var(--color-border-soft)' }}
      >
        {data.cards.map((card, i) => {
          const isOpen = active === i
          return (
            <div
              key={i}
              role="listitem"
              onClick={() => setActive(isOpen ? null : i)}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 24px',
                alignItems: 'start',
                gap: 'clamp(16px, 3vw, 48px)',
                padding: 'clamp(14px, 2vw, 22px) 0',
                borderBottom: '1px solid var(--color-border-soft)',
                cursor: 'pointer',
                transition: 'background 200ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,169,110,0.02)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Domain tag */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isOpen ? 'var(--color-gold)' : 'rgba(200,169,110,0.4)',
                transition: 'color 200ms ease',
                paddingTop: '2px',
                whiteSpace: 'nowrap',
              }}>
                {card.tag}
              </span>

              {/* Description */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                  fontWeight: 300,
                  color: isOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  letterSpacing: '0.01em',
                  transition: 'color 200ms ease',
                }}>
                  {card.title}
                </p>
              </div>

              {/* Toggle mark */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: isOpen ? 'var(--color-gold)' : 'rgba(200,169,110,0.25)',
                transition: 'color 200ms ease, transform 200ms ease',
                display: 'block',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                paddingTop: '2px',
                justifySelf: 'end',
              }}>
                +
              </span>
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .work-header-grid { grid-template-columns: 1fr !important; }
          .work-header-grid > div:last-child { justify-content: flex-start !important; padding-bottom: 0 !important; flex-wrap: wrap; }
        }
        #work [role="listitem"] { grid-template-columns: 90px 1fr 20px !important; }
        @media (max-width: 480px) {
          #work [role="listitem"] { grid-template-columns: 1fr !important; gap: 4px !important; }
          #work [role="listitem"] > span:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}
