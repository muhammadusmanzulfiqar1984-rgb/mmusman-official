'use client'
import { useState } from 'react'

interface Pillar { tag: string; line: string }
interface HarvicsData {
  heading: string
  subheading: string
  body: string
  pillars: Pillar[]
  cta: { label: string; href: string }
}

export default function HarvicsSection({ data }: { data: HarvicsData }) {
  const [active, setActive] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const select = (i: number) => {
    if (i === active) return
    setTransitioning(true)
    setTimeout(() => { setActive(i); setTransitioning(false) }, 200)
  }

  const pillar = data.pillars[active]

  return (
    <section
      id="harvics"
      aria-label="Harvics"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(40px, 5vw, 64px) var(--section-pad-x)',
        borderBottom: '1px solid var(--color-border-soft)',
      }}
    >
      <p className="section-label">Institution</p>

      <div className="harvics-chamber">
        {/* LEFT */}
        <div className="harvics-left">
          <h2 className="h2 reveal" style={{ fontStyle: 'italic', marginBottom: 'var(--space-5)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {data.heading}
          </h2>
          <p className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            marginBottom: 'var(--space-5)',
            letterSpacing: '-0.01em',
          }}>
            {data.subheading}
          </p>
          <p className="reveal" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 300,
            color: 'var(--color-text-muted)',
            lineHeight: 1.85,
            borderLeft: '1px solid var(--color-gold-dim)',
            paddingLeft: 'var(--space-5)',
            letterSpacing: '0.005em',
          }}>
            {data.body}
          </p>
          <a
            href={data.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal"
            style={{
              display: 'inline-block',
              marginTop: 'var(--space-8)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(200,169,110,0.3)',
              paddingBottom: '3px',
              transition: 'border-color 200ms ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.3)')}
          >
            {data.cta.label} ↗
          </a>
        </div>

        {/* DIVIDER */}
        <div className="harvics-divider" aria-hidden="true" />

        {/* RIGHT — pillar tabs */}
        <div className="harvics-right">
          <nav aria-label="Harvics pillars" className="harvics-tabs">
            {data.pillars.map((p, i) => {
              const isActive  = i === active
              const isHovered = i === hoveredIdx && !isActive
              return (
                <button key={i} onClick={() => select(i)} aria-selected={isActive}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                    background: isHovered ? 'rgba(200,169,110,0.035)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    padding: 'var(--space-3) var(--space-5)', textAlign: 'left',
                    position: 'relative', width: '100%',
                    transition: 'background 180ms ease',
                  }}
                >
                  {/* Active left-edge strip */}
                  <span style={{
                    position: 'absolute', left: '-1px', top: '50%', transform: 'translateY(-50%)',
                    width: '1px', height: isActive ? '100%' : '0%',
                    background: 'var(--color-gold)',
                    transition: 'height 300ms cubic-bezier(0.23,1,0.32,1)',
                  }} />
                  {/* Roman numeral */}
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em',
                    color: isActive ? 'var(--color-gold)'
                         : isHovered ? 'rgba(200,169,110,0.55)'
                         : 'rgba(200,169,110,0.22)',
                    transition: 'color 180ms ease', minWidth: '18px',
                  }}>
                    {['I','II','III','IV'][i]}
                  </span>
                  {/* Label + hover underline */}
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 300,
                      color: isActive ? 'var(--color-text-primary)'
                           : isHovered ? 'var(--color-text-secondary)'
                           : 'var(--color-text-ghost)',
                      letterSpacing: '0.04em', transition: 'color 180ms ease',
                    }}>
                      {p.tag}
                    </span>
                    {/* Short underline — appears on hover */}
                    <span style={{
                      display: 'block', height: '1px',
                      width: isHovered ? '24px' : '0px',
                      background: 'var(--color-gold-dim)',
                      transition: 'width 220ms ease',
                    }} />
                  </span>
                </button>
              )
            })}
          </nav>

          <div aria-live="polite" style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity 200ms ease, transform 200ms ease',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.54rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(200,169,110,0.4)', marginBottom: 'var(--space-4)',
            }}>
              {pillar.tag}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300,
              color: 'var(--color-text-secondary)', lineHeight: 1.85, letterSpacing: '0.01em',
            }}>
              {pillar.line}
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.46rem', letterSpacing: '0.18em',
              color: 'rgba(200,169,110,0.15)', marginTop: 'var(--space-8)', textTransform: 'uppercase',
            }}>
              {['I','II','III','IV'][active]} of {data.pillars.length} · Harvics
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .harvics-chamber {
          display: grid; grid-template-columns: 1fr 1px 1fr;
          gap: 0 clamp(32px,5vw,72px); align-items: start; margin-top: var(--space-8);
        }
        .harvics-left  { padding-right: clamp(8px,2vw,24px); }
        .harvics-divider {
          background: linear-gradient(to bottom,transparent 0%,rgba(200,169,110,0.18) 15%,rgba(200,169,110,0.18) 85%,transparent 100%);
          align-self: stretch; min-height: 280px;
        }
        .harvics-right { padding-left: clamp(8px,2vw,24px); }
        .harvics-tabs  { display: flex; flex-direction: column; border-left: 1px solid rgba(200,169,110,0.09); margin-bottom: var(--space-8); }
        .harvics-tabs button:hover { background: rgba(200,169,110,0.03) !important; }
        @media (max-width: 768px) {
          .harvics-chamber { grid-template-columns: 1fr !important; gap: var(--space-10) 0 !important; }
          .harvics-divider { display: none !important; }
          .harvics-left, .harvics-right { padding: 0 !important; }
        }
      `}</style>
    </section>
  )
}
