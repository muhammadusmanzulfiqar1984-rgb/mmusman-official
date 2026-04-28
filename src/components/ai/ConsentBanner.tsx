'use client'
import { useState } from 'react'
import { getConsent, setConsent } from '@/lib/telemetry'
import { useLang } from '@/lib/langContext'

export default function ConsentBanner() {
  const { t } = useLang()
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    const consent = getConsent()
    // Only show if truly never set (not on every visit)
    return consent === 'none' && !localStorage.getItem('mian_consent_seen')
  })

  const accept  = () => { setConsent('local'); localStorage.setItem('mian_consent_seen', '1'); setShow(false) }
  const decline = () => { setConsent('none');  localStorage.setItem('mian_consent_seen', '1'); setShow(false) }

  if (!show) return null

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
        <button onClick={decline} style={secondaryBtn}>{t.consent.decline}</button>
        <button onClick={accept} style={primaryBtn}>{t.consent.allow}</button>
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
