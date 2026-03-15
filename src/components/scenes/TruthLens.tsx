'use client'
import { useRef, useState } from 'react'

// Truth Lens — hover any verified claim to see its basis
interface Claim {
  text: string
  basis: string
  type: 'fact' | 'credential' | 'stat'
}

const CLAIMS: Claim[] = [
  {
    text: '50+ conferences',
    basis: 'Speaker and panelist at global business, retail, and leadership conferences across Asia, Europe and the Middle East.',
    type: 'stat',
  },
  {
    text: '15+ years operating',
    basis: 'Active since 2009 across law, capital markets, retail, oil & gas, fashion and political consulting.',
    type: 'fact',
  },
  {
    text: '6 industries',
    basis: 'Law · Capital Markets · Retail · Oil & Gas · Fashion & Runway · Political Strategy — all with direct operational involvement, not advisory from the outside.',
    type: 'fact',
  },
  {
    text: '25+ organizations',
    basis: 'Direct engagement across corporations, government bodies, retail chains, commodity firms, fashion houses and political entities.',
    type: 'stat',
  },
]

function TruthPill({ claim }: { claim: Claim }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const color = claim.type === 'stat'       ? '#c8a96e'
              : claim.type === 'credential' ? '#a0c8a0'
              : '#8ab4c8'

  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`Verified claim: ${claim.text}. Click for basis.`}
      aria-expanded={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: '0.08em',
        color,
        borderBottom: `1px dotted ${color}`,
        cursor: 'help',
        position: 'relative',
      }}
    >
      {claim.text}
      <span aria-hidden="true" style={{ fontSize: '0.55rem', opacity: 0.7 }}>✦</span>

      {open && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 10px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10,10,10,0.97)',
            border: `1px solid ${color}44`,
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            width: '260px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            fontWeight: 300,
            zIndex: 500,
            whiteSpace: 'normal',
            backdropFilter: 'blur(16px)',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color,
            marginBottom: '6px',
          }}>
            ✦ Verified basis
          </span>
          {claim.basis}
        </span>
      )}
    </span>
  )
}

export default function TruthLens() {
  return (
    <section
      id="truth"
      aria-label="Verified claims"
      className="section"
      style={{ background: 'rgba(200,169,110,0.015)', borderLeft: '3px solid rgba(200,169,110,0.15)', height: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box', overflow: 'hidden', padding: 'clamp(20px, 3vw, 40px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)' }}
    >
      <p className="section-label">Truth Lens</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'start' }}>
        <div>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-5)' }}>
            Every claim<br />is verifiable.
          </h2>
          <p className="body reveal" style={{ maxWidth: '420px' }}>
            Hover or tap any highlighted figure below to see its basis. No inflated numbers, no marketing copy — just what actually happened.
          </p>
        </div>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {CLAIMS.map((claim, i) => (
            <div
              key={i}
              className="glass"
              style={{ padding: 'var(--space-5) var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 300,
                color: 'var(--color-gold)',
                minWidth: '80px',
              }}>
                {claim.text.match(/\d+[+]?/)?.[0] ?? '—'}
              </div>
              <div>
                <TruthPill claim={claim} />
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-dim)',
                  marginTop: '4px',
                  fontWeight: 300,
                }}>
                  {claim.text.replace(/^\d+[+]?\s*/, '')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { TruthPill }
