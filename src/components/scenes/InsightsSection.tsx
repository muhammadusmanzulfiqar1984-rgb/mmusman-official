'use client'
import { useState } from 'react'
import { useLang } from '@/lib/langContext'

interface InsightCard {
  tag: string
  title: string
  body: string
}

interface InsightsData {
  heading: string
  subheading: string
  intro?: string
  closing?: string
  cards: InsightCard[]
}

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI']

export default function InsightsSection({ data }: { data: InsightsData }) {
  const { t } = useLang()
  const [active, setActive] = useState<number | null>(null)
  const [hoveredEntry, setHoveredEntry] = useState<number | null>(null)
  const heading    = t.insights.heading    || data.heading
  const subheading = t.insights.subheading || data.subheading

  const toggle = (i: number) => setActive(prev => (prev === i ? null : i))

  return (
    <section
      id="insights"
      aria-label="Chamber of Consequence"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(40px, 5vw, 64px) var(--section-pad-x)',
        borderBottom: '1px solid var(--color-border-soft)',
      }}
    >
      <p className="section-label">Thought</p>

      {/* Two-column doctrine chamber */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        gap: '0 clamp(40px, 5vw, 72px)',
        alignItems: 'start',
        marginTop: 'var(--space-8)',
      }}>

        {/* LEFT — editorial framing */}
        <div style={{ paddingRight: 'clamp(16px, 2vw, 32px)' }}>
          <h2
            className="h2 reveal"
            style={{ fontStyle: 'italic', marginBottom: 'var(--space-6)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
          >
            {heading}
          </h2>

          <p className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.72,
            maxWidth: '52ch',
            marginBottom: 'var(--space-6)',
            letterSpacing: '-0.01em',
          }}>
            {subheading}
          </p>

          {data.intro && (
            <p className="reveal" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              lineHeight: 1.85,
              maxWidth: '52ch',
              borderLeft: '1px solid var(--color-gold-dim)',
              paddingLeft: 'var(--space-5)',
              marginBottom: 'var(--space-10)',
            }}>
              {data.intro}
            </p>
          )}

          {data.closing && (
            <p className="reveal" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-sm)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(200,169,110,0.5)',
              lineHeight: 1.7,
              maxWidth: '46ch',
              marginTop: 'var(--space-10)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid var(--color-border-soft)',
              letterSpacing: '0.01em',
            }}>
              {data.closing}
            </p>
          )}
        </div>

        {/* CENTRE — vertical rule */}
        <div aria-hidden="true" style={{
          width: '1px',
          alignSelf: 'stretch',
          background: 'linear-gradient(to bottom, transparent 0%, var(--color-gold-dim) 15%, var(--color-gold-dim) 85%, transparent 100%)',
          marginTop: 'var(--space-2)',
        }} />

        {/* RIGHT — doctrine register */}
        <div className="reveal" style={{ paddingLeft: 'clamp(16px, 2vw, 32px)' }}>

          {/* Top rule */}
          <div style={{ height: '1px', background: 'var(--color-border-soft)', marginBottom: 'var(--space-1)' }} />

          {data.cards.map((card, i) => {
            const isOpen = active === i

            return (
              <div key={i}>
                {/* Entry row */}
                <button
                  onClick={() => toggle(i)}
                  onMouseEnter={() => setHoveredEntry(i)}
                  onMouseLeave={() => setHoveredEntry(null)}
                  aria-expanded={isOpen}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '28px 1fr 16px',
                    alignItems: 'baseline',
                    gap: 'var(--space-4)',
                    width: '100%',
                    background: (!isOpen && hoveredEntry === i) ? 'rgba(200,169,110,0.025)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 'var(--space-5) 0',
                    textAlign: 'left',
                    position: 'relative',
                    transition: 'background 180ms ease',
                  }}
                >
                  {/* Active indicator strip */}
                  {isOpen && (
                    <span aria-hidden="true" style={{
                      position: 'absolute',
                      left: '-clamp(16px, 2vw, 32px)',
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--color-gold)',
                    }} />
                  )}

                  {/* Roman numeral */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.14em',
                    color: isOpen ? 'var(--color-gold)'
                         : hoveredEntry === i ? 'rgba(200,169,110,0.55)'
                         : 'rgba(200,169,110,0.28)',
                    transition: 'color 180ms ease',
                    userSelect: 'none',
                    paddingTop: '2px',
                  }}>
                    {NUMERALS[i]}
                  </span>

                  {/* Tag + title stack */}
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.52rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: isOpen ? 'rgba(200,169,110,0.7)' : 'rgba(200,169,110,0.3)',
                      transition: 'color 220ms ease',
                    }}>
                      {card.tag}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      color: isOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      lineHeight: 1.35,
                      whiteSpace: 'pre-line',
                      letterSpacing: '-0.01em',
                      transition: 'color 220ms ease',
                    }}>
                      {card.title}
                    </span>
                  </span>

                  {/* Chevron */}
                  <span aria-hidden="true" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    color: isOpen ? 'var(--color-gold)' : 'rgba(200,169,110,0.2)',
                    transition: 'color 220ms ease, transform 220ms ease',
                    transform: isOpen ? 'rotate(180deg)' : hoveredEntry === i ? 'translateY(2px)' : 'rotate(0deg)',
                    display: 'inline-block',
                    lineHeight: 1,
                    alignSelf: 'center',
                  }}>
                    ↓
                  </span>
                </button>

                {/* Expanded content */}
                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '320px' : '0',
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 380ms cubic-bezier(0.4,0,0.2,1), opacity 260ms ease',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 300,
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.85,
                    maxWidth: '58ch',
                    paddingLeft: '44px',
                    paddingBottom: 'var(--space-6)',
                    letterSpacing: '0.005em',
                  }}>
                    {card.body}
                  </p>
                </div>

                {/* Divider */}
                <div style={{
                  height: '1px',
                  background: isOpen ? 'var(--color-gold-dim)' : 'var(--color-border-soft)',
                  transition: 'background 220ms ease',
                }} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
