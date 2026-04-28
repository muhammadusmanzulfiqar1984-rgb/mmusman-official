'use client'
import { useState } from 'react'
import { useLang } from '@/lib/langContext'

interface ForumCard { tag: string; title: string; body: string }
interface ForumData {
  heading: string
  subheading: string
  cards: ForumCard[]
}

export default function SpeakingSection({ data }: { data: ForumData }) {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const heading      = t.speaking.heading      || data.heading
  const subheading   = t.speaking.subheading   || data.subheading
  const availability = t.speaking.availability

  const select = (i: number) => {
    if (i === active) return
    setTransitioning(true)
    setTimeout(() => { setActive(i); setTransitioning(false) }, 200)
  }

  const item = data.cards[active]

  return (
    <section
      id="speaking"
      aria-label="The Public Record"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(40px, 5vw, 64px) var(--section-pad-x)',
        borderBottom: '1px solid var(--color-border-soft)',
      }}
    >
      <p className="section-label">Forum</p>

      <div className="forum-chamber">

        {/* LEFT */}
        <div className="forum-left">
          <h2 className="h2 reveal" style={{ fontStyle: 'italic', marginBottom: 'var(--space-5)', lineHeight: 1.1 }}>
            {heading}
          </h2>
          <p className="reveal" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 300,
            color: 'var(--color-text-muted)',
            lineHeight: 1.8,
            maxWidth: '380px',
            letterSpacing: '0.01em',
          }}>
            {subheading}
          </p>

          {/* Availability note */}
          <p className="reveal" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(200,169,110,0.35)',
            marginTop: 'var(--space-8)',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-border-soft)',
          }}>
            {availability}
          </p>
        </div>

        {/* DIVIDER */}
        <div className="forum-divider" aria-hidden="true" />

        {/* RIGHT */}
        <div className="forum-right">

          {/* Tab rail */}
          <nav aria-label="Forum sections" className="forum-tabs">
            {data.cards.map((c, i) => {
              const isActive = i === active
              return (
                <button
                  key={i}
                  onClick={() => select(i)}
                  aria-selected={isActive}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 'var(--space-3) var(--space-5)',
                    textAlign: 'left',
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    left: '-1px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: isActive ? '100%' : '0%',
                    background: 'var(--color-gold)',
                    transition: 'height 300ms cubic-bezier(0.23,1,0.32,1)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.1em',
                    color: isActive ? 'var(--color-gold)' : 'rgba(200,169,110,0.22)',
                    transition: 'color 200ms ease',
                    minWidth: '18px',
                  }}>
                    {['I','II','III','IV'][i]}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 300,
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-ghost)',
                    letterSpacing: '0.04em',
                    transition: 'color 200ms ease',
                  }}>
                    {c.tag}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Dossier pane */}
          <div
            aria-live="polite"
            style={{
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
              transition: 'opacity 200ms ease, transform 200ms ease',
              paddingTop: 'var(--space-2)',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.54rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(200,169,110,0.4)',
              marginBottom: 'var(--space-4)',
            }}>
              {item.tag}
            </p>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-text-primary)',
              lineHeight: 1.45,
              marginBottom: 'var(--space-5)',
              letterSpacing: '-0.01em',
              whiteSpace: 'pre-line',
            }}>
              {item.title}
            </h3>

            <div style={{
              width: '28px', height: '1px',
              background: 'linear-gradient(90deg, var(--color-gold) 0%, transparent 100%)',
              marginBottom: 'var(--space-5)',
            }} />

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 300,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.85,
              letterSpacing: '0.01em',
            }}>
              {item.body}
            </p>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.46rem',
              letterSpacing: '0.18em',
              color: 'rgba(200,169,110,0.15)',
              marginTop: 'var(--space-8)',
              textTransform: 'uppercase',
            }}>
              {['I','II','III','IV'][active]} of {data.cards.length} · {item.tag}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .forum-chamber {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0 clamp(32px, 5vw, 72px);
          align-items: start;
          margin-top: var(--space-8);
        }
        .forum-left  { padding-right: clamp(8px, 2vw, 24px); }
        .forum-divider {
          background: linear-gradient(to bottom, transparent 0%, rgba(200,169,110,0.18) 15%, rgba(200,169,110,0.18) 85%, transparent 100%);
          align-self: stretch;
          min-height: 300px;
        }
        .forum-right { padding-left: clamp(8px, 2vw, 24px); }
        .forum-tabs  {
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(200,169,110,0.09);
          margin-bottom: var(--space-8);
        }
        .forum-tabs button:hover { background: rgba(200,169,110,0.03) !important; }
        @media (max-width: 768px) {
          .forum-chamber { grid-template-columns: 1fr !important; gap: var(--space-10) 0 !important; }
          .forum-divider { display: none !important; }
          .forum-left, .forum-right { padding: 0 !important; }
        }
      `}</style>
    </section>
  )
}
