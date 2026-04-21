'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'

// Truth Lens — hover any verified claim to see its basis
interface Claim {
  text: string
  basis: string
  type: 'fact' | 'credential' | 'stat'
}

interface TruthData {
  heading: string
  subheading: string
  claims: Claim[]
}

function TruthPill({ claim }: { claim: Claim }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const color = claim.type === 'stat'       ? 'var(--color-gold)'
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

export default function TruthLens({ data }: { data: TruthData }) {
  const headingParts = data.heading.split('\n')
  return (
    <section
      id="truth"
      aria-label="Verified claims"
      className="section"
      style={{ background: 'var(--color-bg-alt)', borderLeft: '3px solid var(--color-gold-dim)', boxSizing: 'border-box', padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)', textAlign: 'left' }}
    >
      <p className="section-label">Truth Lens</p>

      <div className="col2-grid" style={{ alignItems: 'start' }}>
        <div>
          <h2 className="h2 reveal" style={{ margin: '0 0 var(--space-4) 0' }}>
            {headingParts[0]}{headingParts[1] && <><br />{headingParts[1]}</>}
          </h2>
          <p className="body reveal" style={{ maxWidth: '420px', marginBottom: 'var(--space-6)' }}>
            {data.subheading}
          </p>
          <div style={{
            width: '260px',
            height: '345px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid var(--color-gold-dim)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            position: 'relative',
          }}>
            <Image
              src="/images/Retails1.webp"
              alt="Mian Muhammad Usman — retail"
              fill
              sizes="260px"
              style={{ objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.85) contrast(1.12) sepia(0.08)' }}
            />
          </div>
        </div>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {data.claims.map((claim, i) => (
            <div key={i} className="spin-border">
            <div
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
            </div>            </div>          ))}
        </div>
      </div>
    </section>
  )
}

export { TruthPill }
