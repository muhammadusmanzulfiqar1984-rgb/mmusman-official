'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '@/lib/langContext'

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
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount]   = useState(() => prefersReduced ? numeric : 0)
  const rafRef              = useRef<number>(0)

  useEffect(() => {
    if (prefersReduced) return
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        color: 'var(--color-text-muted)',
        marginTop: '8px',
      }}>{label}</div>
    </div>
  )
}

export default function WorkSection({ data }: { data: WorkData }) {
  const { t } = useLang()
  const [active, setActive] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const heading    = t.work.heading    || data.heading
  const subheading = t.work.subheading || data.subheading

  const toggle = (i: number) => setActive(prev => prev === i ? null : i)

  return (
    <section
      id="work"
      aria-label="Operating record"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(40px, 5vw, 64px) var(--section-pad-x)',
        borderBottom: '2px solid var(--color-gold)',
      }}
    >
      <p className="section-label">Practice</p>

      {/* Two-column: heading left, stats right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'end',
          marginBottom: 'clamp(40px, 6vw, 72px)',
        }}
        className="work-header-grid"
      >
        <div>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-4)' }}>{heading}</h2>
          <p className="reveal" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 300,
            color: 'var(--color-text-muted)',
            lineHeight: 1.75,
            maxWidth: '480px',
          }}>{subheading}</p>
        </div>

        <div style={{
          display: 'flex',
          gap: 'clamp(24px, 4vw, 56px)',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingBottom: '4px',
        }} className="reveal">
          {data.stats.map((s, i) => <CounterBadge key={i} value={s.value} label={s.label} />)}
        </div>
      </div>

      {/* Domain grid — 3 × 2 gold tiles */}
      <div className="work-domain-grid reveal">
        {data.cards.map((card, i) => {
          const isActive  = active === i
          const isHovered = hovered === i

          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              aria-expanded={isActive}
              className="work-tile"
              style={{
                '--shimmer-delay': `${i * 0.55}s`,
              } as React.CSSProperties}
            >
              {/* Shimmer sweep */}
              <span className="work-tile-shimmer" aria-hidden="true" />

              {/* Top-edge gold line — grows on hover/active */}
              <span className="work-tile-edge" style={{
                opacity: (isActive || isHovered) ? 1 : 0,
                transform: `scaleX(${isActive ? 1 : isHovered ? 0.6 : 0})`,
              }} aria-hidden="true" />

              {/* Content */}
              <span className="work-tile-tag" style={{
                color: isActive ? 'var(--color-gold)'
                     : isHovered ? 'rgba(200,169,110,0.85)'
                     : 'rgba(200,169,110,0.45)',
              }}>
                {card.tag}
              </span>

              <span className="work-tile-desc" style={{
                color: isActive ? 'var(--color-text-primary)'
                     : isHovered ? 'var(--color-text-secondary)'
                     : 'var(--color-text-dim)',
              }}>
                {card.title}
              </span>

              {/* Corner mark */}
              <span className="work-tile-mark" style={{
                color: isActive ? 'var(--color-gold)' : 'rgba(200,169,110,0.18)',
                transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
              }}>
                +
              </span>

              {/* Active overlay — darkens the tile */}
              {isActive && <span className="work-tile-active-bg" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      <style>{`
        /* ── Domain grid ── */
        .work-domain-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(200,169,110,0.12);
          border: 1px solid rgba(200,169,110,0.12);
          border-radius: 2px;
          overflow: hidden;
        }

        /* ── Tile base ── */
        .work-tile {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 28px);
          background: rgba(8, 5, 3, 0.92);
          border: none;
          cursor: pointer;
          text-align: left;
          overflow: hidden;
          isolation: isolate;
          transition: background 220ms ease;
          min-height: 120px;
        }
        .work-tile:hover {
          background: rgba(14, 9, 4, 0.96);
        }

        /* ── Shimmer sweep ── */
        .work-tile-shimmer {
          position: absolute;
          top: -20%; left: 0;
          width: 55%; height: 140%;
          background: linear-gradient(
            108deg,
            transparent 15%,
            rgba(255,255,255,0.02) 35%,
            rgba(200,169,110,0.09) 50%,
            rgba(255,255,255,0.02) 65%,
            transparent 85%
          );
          transform: translateX(-140%) skewX(-14deg);
          animation: workTileShimmer 5s cubic-bezier(0.4,0,0.6,1) infinite;
          animation-delay: var(--shimmer-delay, 0s);
          pointer-events: none;
          z-index: 0;
        }
        @keyframes workTileShimmer {
          0%   { transform: translateX(-140%) skewX(-14deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(220%) skewX(-14deg); opacity: 0; }
        }

        /* ── Top-edge gold line ── */
        .work-tile-edge {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--color-gold) 40%, var(--color-gold-bright) 60%, transparent 100%);
          transform-origin: left;
          transition: opacity 200ms ease, transform 280ms cubic-bezier(0.23,1,0.32,1);
          pointer-events: none;
          z-index: 2;
        }

        /* ── Tag ── */
        .work-tile-tag {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition: color 200ms ease;
          z-index: 1;
          line-height: 1;
        }

        /* ── Description ── */
        .work-tile-desc {
          font-family: var(--font-body);
          font-size: clamp(0.75rem, 1vw, 0.85rem);
          font-weight: 300;
          line-height: 1.55;
          letter-spacing: 0.01em;
          transition: color 200ms ease;
          z-index: 1;
          flex: 1;
        }

        /* ── Corner mark ── */
        .work-tile-mark {
          position: absolute;
          bottom: 12px; right: 14px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: rgba(200,169,110,0.18);
          transition: color 200ms ease, transform 220ms ease;
          z-index: 1;
        }

        /* ── Active dark overlay ── */
        .work-tile-active-bg {
          position: absolute;
          inset: 0;
          background: rgba(200,169,110,0.04);
          border: 1px solid rgba(200,169,110,0.18);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Grid responsive ── */
        @media (max-width: 768px) {
          .work-domain-grid { grid-template-columns: repeat(2, 1fr); }
          .work-header-grid { grid-template-columns: 1fr !important; }
          .work-header-grid > div:last-child { justify-content: flex-start !important; padding-bottom: 0 !important; flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .work-domain-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .work-tile-shimmer { animation: none !important; }
          .work-tile-edge    { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
