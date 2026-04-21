'use client'
import { useState } from 'react'

interface Pillar { tag: string; line: string }
interface IntelligenceData {
  heading: string
  subheading: string
  body: string
  pillars: Pillar[]
}

export default function IntelligenceSection({ data }: { data: IntelligenceData }) {
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
      id="intelligence"
      aria-label="Applied Intelligence"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)',
        borderBottom: '1px solid var(--color-border-soft)',
        background: `linear-gradient(135deg, #0a0806 0%, #120d08 40%, #0a0806 100%)`,
      }}
    >
      <p className="section-label">Intelligence</p>

      <div className="intel-chamber">
        <div className="intel-left">
          <h2 className="h2 reveal" style={{ fontStyle: 'italic', marginBottom: 'var(--space-5)', lineHeight: 1.05 }}>
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
        </div>

        <div className="intel-divider" aria-hidden="true" />

        <div className="intel-right">
          <nav aria-label="Intelligence pillars" className="intel-tabs">
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
                  <span style={{
                    position: 'absolute', left: '-1px', top: '50%', transform: 'translateY(-50%)',
                    width: '1px', height: isActive ? '100%' : '0%',
                    background: 'var(--color-gold)',
                    transition: 'height 300ms cubic-bezier(0.23,1,0.32,1)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em',
                    color: isActive ? 'var(--color-gold)'
                         : isHovered ? 'rgba(200,169,110,0.55)'
                         : 'rgba(200,169,110,0.22)',
                    transition: 'color 180ms ease', minWidth: '18px',
                  }}>
                    {['I','II','III','IV'][i]}
                  </span>
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
              {['I','II','III','IV'][active]} of {data.pillars.length} · Applied Intelligence
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .intel-chamber {
          display: grid; grid-template-columns: 1fr 1px 1fr;
          gap: 0 clamp(32px,5vw,72px); align-items: start; margin-top: var(--space-8);
        }
        .intel-left   { padding-right: clamp(8px,2vw,24px); }
        .intel-divider {
          background: linear-gradient(to bottom,transparent 0%,rgba(200,169,110,0.15) 15%,rgba(200,169,110,0.15) 85%,transparent 100%);
          align-self: stretch; min-height: 260px;
        }
        .intel-right  { padding-left: clamp(8px,2vw,24px); }
        .intel-tabs   { display: flex; flex-direction: column; border-left: 1px solid rgba(200,169,110,0.09); margin-bottom: var(--space-8); }
        .intel-tabs button:hover { background: rgba(200,169,110,0.03) !important; }
        @media (max-width: 768px) {
          .intel-chamber { grid-template-columns: 1fr !important; gap: var(--space-10) 0 !important; }
          .intel-divider { display: none !important; }
          .intel-left, .intel-right { padding: 0 !important; }
        }
      `}</style>
    </section>
  )
}
