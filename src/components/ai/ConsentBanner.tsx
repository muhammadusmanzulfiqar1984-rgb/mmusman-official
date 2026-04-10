'use client'
import { useState } from 'react'
import { getConsent, setConsent } from '@/lib/telemetry'

export default function ConsentBanner() {
  const [show, setShow] = useState(() => typeof window !== 'undefined' && getConsent() === 'none')

  if (!show) return null

  const accept = () => { setConsent('local'); setShow(false) }
  const decline = () => { setConsent('none'); setShow(false) }

  return (
    <div
      role="dialog"
      aria-label="Privacy consent"
      aria-modal="false"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 400,
        background: 'rgba(10,10,10,0.97)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        maxWidth: '680px',
        width: 'calc(100vw - 48px)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <p style={{
        flex: 1,
        fontFamily: 'var(--font-body)',
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.5,
        minWidth: '240px',
      }}>
        This site uses <strong style={{ color: 'var(--color-text-secondary)' }}>local-only analytics</strong> — stored in your browser, never sent anywhere. No third-party trackers.
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={decline} style={secondaryBtn}>Decline</button>
        <button onClick={accept} style={primaryBtn}>Allow local analytics</button>
      </div>
    </div>
  )
}

const primaryBtn: React.CSSProperties = {
  background: 'var(--color-gold)',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 18px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontWeight: 300,
  whiteSpace: 'nowrap',
}

const secondaryBtn: React.CSSProperties = {
  background: 'transparent',
  color: 'var(--color-text-ghost)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 18px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}
