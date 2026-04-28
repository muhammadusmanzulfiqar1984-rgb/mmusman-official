'use client'
import { useState } from 'react'
import { exportData, deleteData, setConsent, getConsent } from '@/lib/telemetry'
import { useLang } from '@/lib/langContext'

export default function PrivacyPanel() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [consent, setConsentState] = useState(getConsent)
  const [deleted, setDeleted] = useState(false)

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mian-web-analytics.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = () => {
    deleteData()
    setDeleted(true)
    setConsentState('none')
  }

  const handleToggleConsent = () => {
    const next = consent === 'local' ? 'none' : 'local'
    setConsent(next)
    setConsentState(next)
  }

  return (
    <>
      {/* Trigger link — in footer area */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open privacy settings"        style={{
          background: 'none',
          border: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-ghost)',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          padding: 0,
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        }}
      >
        {t.privacy.trigger}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.privacy.label}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              width: '100%',
              maxWidth: '480px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'none', border: 'none',
                color: 'var(--color-text-ghost)', fontSize: '1rem', cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 'var(--space-6)' }}>
              {t.privacy.label}
            </p>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>
              {t.privacy.heading}
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: 'var(--space-8)' }}>
              {t.privacy.body}
            </p>

            {/* Consent toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: 'var(--space-4)' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', letterSpacing: '0.06em' }}>{t.privacy.localAnalytics}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-text-ghost)', marginTop: '2px' }}>{t.privacy.storedBrowser}</p>
              </div>
              <button
                onClick={handleToggleConsent}
                aria-label={`${consent === 'local' ? 'Disable' : 'Enable'} local analytics`}
                aria-pressed={consent === 'local'}
                style={{
                  width: '44px', height: '24px',
                  borderRadius: 'var(--radius-full)',
                  background: consent === 'local' ? 'var(--color-gold)' : 'var(--color-border)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '3px',
                  left: consent === 'local' ? '22px' : '3px',
                  width: '18px', height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.2s ease',
                }} />
              </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <button onClick={handleExport} style={actionBtn}>{t.privacy.export}</button>
              <button onClick={handleDelete} style={{ ...actionBtn, color: deleted ? 'var(--color-text-ghost)' : '#e08080', borderColor: deleted ? 'var(--color-border)' : '#e0808040' }}>
                {deleted ? t.privacy.deleted : t.privacy.deleteData}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const actionBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 16px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  cursor: 'pointer',
}
