'use client'
import { useEffect, useRef, useState } from 'react'

// Explain Overlay — "Why this order?" badge that opens a log of
// all adaptations made (persona, performance mode, motion state).
// No PII logged. Always visible toggle.

interface Adaptation {
  label: string
  detail: string
}

function collectAdaptations(): Adaptation[] {
  const adapts: Adaptation[] = []

  // Classic view
  if (document.documentElement.classList.contains('classic-view')) {
    adapts.push({ label: 'Classic View', detail: 'All motion and animation suspended on your request.' })
  }

  // Reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    adapts.push({ label: 'Reduced Motion', detail: 'OS accessibility setting detected — all animations disabled.' })
  }

  // Simplified mode
  if (document.documentElement.getAttribute('data-mode') === 'simplified') {
    adapts.push({ label: 'Simplified Mode', detail: 'Density and motion reduced after fatigue signals detected.' })
  }

  // Comfort autopilot
  if (document.documentElement.getAttribute('data-comfort') === 'on') {
    adapts.push({ label: 'Comfort Autopilot', detail: 'Type scale increased and motion paused — rapid interaction pattern detected.' })
  }

  // Persona (from sessionStorage)
  const persona = sessionStorage.getItem('mian_dwell_section')
  if (persona) {
    adapts.push({ label: 'Persona Adaptation', detail: `Section order adapted based on your browsing behaviour (dwell: ${persona}).` })
  }

  if (adapts.length === 0) {
    adapts.push({ label: 'Default Experience', detail: 'No adaptations active. Showing standard layout and full motion.' })
  }

  return adapts
}

export default function ExplainOverlay() {
  const [open, setOpen]   = useState(false)
  const [adapts, setAdapts] = useState<Adaptation[]>([])

  const openPanel = () => {
    setAdapts(collectAdaptations())
    setOpen(true)
  }

  return (
    <div className="explain-overlay">
      <button
        onClick={open ? () => setOpen(false) : openPanel}
        aria-expanded={open}
        aria-label="View active page adaptations"
        style={{
          background: 'rgba(10,10,10,0.88)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '5px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.52rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text-ghost)',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
        }}
      >
        ✦ Explain
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Page adaptations log"
          aria-modal="false"
          style={{
            position: 'absolute',
            bottom: '36px',
            left: 0,
            width: '280px',
            background: 'rgba(10,10,10,0.97)',
            border: '1px solid var(--color-gold-dim)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-5)',
            backdropFilter: 'blur(20px)',
            boxShadow: 'var(--shadow-card)',
            zIndex: 300,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            marginBottom: 'var(--space-4)',
          }}>
            Active adaptations
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {adapts.map((a, i) => (
              <li key={i}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 300,
                  marginBottom: '2px',
                }}>
                  {a.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  color: 'var(--color-text-ghost)',
                  lineHeight: 1.55,
                  fontWeight: 300,
                }}>
                  {a.detail}
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setOpen(false)}
            style={{
              marginTop: 'var(--space-4)',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.52rem',
              letterSpacing: '0.08em',
              color: 'var(--color-text-ghost)',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
