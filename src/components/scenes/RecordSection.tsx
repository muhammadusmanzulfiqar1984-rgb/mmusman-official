'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/langContext'

interface Address { tag: string; title: string; body: string }
interface ProofItem { value: string; label: string }
interface MediaItem { type: string; title: string; subtitle: string; poster?: string; src?: string }

interface RecordData {
  heading: string
  subheading: string
  addresses: Address[]
  proof: ProofItem[]
  media: MediaItem[]
}

export default function RecordSection({ data }: { data: RecordData }) {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const heading      = t.record.heading      || data.heading
  const subheading   = t.record.subheading   || data.subheading
  const verifiedLabel = t.record.verifiedLabel

  const select = (i: number) => {
    if (i === active) return
    setTransitioning(true)
    setTimeout(() => { setActive(i); setTransitioning(false) }, 200)
  }

  const item = data.addresses[active]

  return (
    <section
      id="record"
      aria-label="The Public Record"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(40px,5vw,64px) var(--section-pad-x)',
        borderBottom: '1px solid var(--color-border-soft)',
      }}
    >
      <p className="section-label">Record</p>

      {/* ── Two-column chamber ── */}
      <div className="record-chamber">

        {/* LEFT */}
        <div className="record-left">
          <h2 className="h2 reveal" style={{ fontStyle: 'italic', marginBottom: 'var(--space-5)', lineHeight: 1.1 }}>
            {heading}
          </h2>
          <p className="reveal" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 300,
            color: 'var(--color-text-muted)',
            lineHeight: 1.8,
            maxWidth: '360px',
            letterSpacing: '0.01em',
            marginBottom: 'var(--space-10)',
          }}>
            {subheading}
          </p>

          {/* Proof strip */}
          <div className="reveal" style={{
            borderTop: '1px solid var(--color-border-soft)',
            paddingTop: 'var(--space-6)',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(200,169,110,0.3)',
              marginBottom: 'var(--space-5)',
            }}>
              {verifiedLabel}
            </p>            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {data.proof.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                    fontWeight: 300,
                    color: 'var(--color-gold)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    minWidth: '52px',
                  }}>
                    {p.value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: 300,
                    color: 'var(--color-text-ghost)',
                    letterSpacing: '0.04em',
                  }}>
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="record-divider" aria-hidden="true" />

        {/* RIGHT — address tab rail + dossier */}
        <div className="record-right">
          <nav aria-label="Addresses" className="record-tabs">
            {data.addresses.map((a, i) => {
              const isActive = i === active
              return (
                <button key={i} onClick={() => select(i)} aria-selected={isActive}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    padding: 'var(--space-3) var(--space-5)', textAlign: 'left',
                    position: 'relative', width: '100%',
                  }}
                >
                  <span style={{
                    position: 'absolute', left: '-1px', top: '50%',
                    transform: 'translateY(-50%)', width: '1px',
                    height: isActive ? '100%' : '0%', background: 'var(--color-gold)',
                    transition: 'height 300ms cubic-bezier(0.23,1,0.32,1)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                    letterSpacing: '0.1em',
                    color: isActive ? 'var(--color-gold)' : 'rgba(200,169,110,0.22)',
                    transition: 'color 200ms ease', minWidth: '18px',
                  }}>
                    {['I','II','III','IV'][i]}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 300,
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-ghost)',
                    letterSpacing: '0.04em', transition: 'color 200ms ease',
                  }}>
                    {a.tag}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Dossier pane */}
          <div aria-live="polite" style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity 200ms ease, transform 200ms ease',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.54rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(200,169,110,0.4)',
              marginBottom: 'var(--space-4)',
            }}>
              {item.tag}
            </p>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem,1.4vw,1.2rem)',
              fontStyle: 'italic', fontWeight: 300, color: 'var(--color-text-primary)',
              lineHeight: 1.45, marginBottom: 'var(--space-5)',
              letterSpacing: '-0.01em', whiteSpace: 'pre-line',
            }}>
              {item.title}
            </h3>
            <div style={{ width: '28px', height: '1px', background: 'linear-gradient(90deg,var(--color-gold) 0%,transparent 100%)', marginBottom: 'var(--space-5)' }} />
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300,
              color: 'var(--color-text-secondary)', lineHeight: 1.85, letterSpacing: '0.01em',
            }}>
              {item.body}
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.46rem', letterSpacing: '0.18em',
              color: 'rgba(200,169,110,0.15)', marginTop: 'var(--space-8)',
              textTransform: 'uppercase',
            }}>
              {['I','II','III','IV'][active]} of {data.addresses.length} · Public Record
            </p>
          </div>
        </div>
      </div>

      {/* ── Media strip ── */}
      <div className="record-media reveal" style={{ marginTop: 'clamp(40px,6vw,72px)', borderTop: '1px solid var(--color-border-soft)', paddingTop: 'clamp(28px,4vw,48px)' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(200,169,110,0.3)',
          marginBottom: 'var(--space-5)',
        }}>
          Appearances
        </p>
        <div style={{ display: 'flex', gap: 'clamp(12px,2vw,24px)', flexWrap: 'wrap' }}>
          {data.media.map((m, i) => (
            <div key={i} style={{
              flex: '0 0 auto',
              width: 'clamp(100px,14vw,160px)',
              aspectRatio: '3/2',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              border: '1px solid rgba(200,169,110,0.12)',
              position: 'relative',
              background: '#0a0806',
            }}>
              {(m.poster || m.src) && (
                <Image
                  src={(m.poster || m.src) as string}
                  alt={m.title}
                  fill
                  style={{ objectFit: 'cover', opacity: 0.65 }}
                  sizes="160px"
                />
              )}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
              }} />
              <p style={{
                position: 'absolute', bottom: '8px', left: '8px', right: '8px',
                fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                letterSpacing: '0.1em', color: 'rgba(200,169,110,0.7)',
                textTransform: 'uppercase', lineHeight: 1.3,
              }}>
                {m.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .record-chamber {
          display: grid; grid-template-columns: 1fr 1px 1fr;
          gap: 0 clamp(32px,5vw,72px); align-items: start;
          margin-top: var(--space-8);
        }
        .record-left  { padding-right: clamp(8px,2vw,24px); }
        .record-divider {
          background: linear-gradient(to bottom,transparent 0%,rgba(200,169,110,0.18) 15%,rgba(200,169,110,0.18) 85%,transparent 100%);
          align-self: stretch; min-height: 300px;
        }
        .record-right { padding-left: clamp(8px,2vw,24px); }
        .record-tabs  {
          display: flex; flex-direction: column;
          border-left: 1px solid rgba(200,169,110,0.09);
          margin-bottom: var(--space-8);
        }
        .record-tabs button:hover { background: rgba(200,169,110,0.03) !important; }
        @media (max-width: 768px) {
          .record-chamber { grid-template-columns: 1fr !important; gap: var(--space-10) 0 !important; }
          .record-divider { display: none !important; }
          .record-left, .record-right { padding: 0 !important; }
        }
      `}</style>
    </section>
  )
}
