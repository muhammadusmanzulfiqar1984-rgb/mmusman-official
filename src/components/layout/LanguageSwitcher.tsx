'use client'
import { useState, useRef, useEffect } from 'react'
import { LANGUAGES, LangCode } from '@/lib/i18n'
import { useLang } from '@/lib/langContext'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (code: LangCode) => {
    setLang(code)
    setOpen(false)
  }

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', flexShrink: 0 }}
      className="lang-switcher"
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.label}. Click to change.`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: `1px solid ${open ? 'var(--color-gold-dim)' : 'rgba(200,169,110,0.18)'}`,
          borderRadius: 'var(--radius-sm)',
          padding: '5px 10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: open ? 'var(--color-gold)' : 'var(--color-text-ghost)',
          cursor: 'pointer',
          transition: 'color 200ms ease, border-color 200ms ease',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Monogram mark */}
        <span
          aria-hidden="true"
          style={{
            fontFamily: current.dir === 'rtl' ? 'serif' : 'var(--font-mono)',
            fontSize: current.dir === 'rtl' ? '0.72rem' : '0.62rem',
            lineHeight: 1,
            color: 'var(--color-gold)',
          }}
        >
          {current.abbr}
        </span>
        <span style={{ color: 'rgba(200,169,110,0.4)', fontSize: '0.5rem' }}>▾</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: '148px',
            background: 'rgba(8,6,4,0.97)',
            border: '1px solid rgba(200,169,110,0.22)',
            borderRadius: 'var(--radius-md)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,169,110,0.08)',
            overflow: 'hidden',
            zIndex: 200,
            animation: 'langPanelIn 160ms cubic-bezier(0.23,1,0.32,1) both',
          }}
        >
          {/* Header rule */}
          <div style={{
            padding: '8px 14px 6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.47rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(200,169,110,0.4)',
            borderBottom: '1px solid rgba(200,169,110,0.08)',
          }}>
            Language · Langue · اللغة
          </div>

          {LANGUAGES.map((l) => {
            const isActive = l.code === lang
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={isActive}
                onClick={() => select(l.code)}
                dir={l.dir}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '9px 14px',
                  background: isActive ? 'rgba(200,169,110,0.07)' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(200,169,110,0.05)',
                  cursor: 'pointer',
                  gap: '10px',
                  transition: 'background 150ms ease',
                  textAlign: l.dir === 'rtl' ? 'right' : 'left',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(200,169,110,0.04)'
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                <span style={{
                  fontFamily: l.dir === 'rtl' ? 'serif' : 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 300,
                  color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                  letterSpacing: '0.01em',
                }}>
                  {l.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.52rem',
                  letterSpacing: '0.12em',
                  color: isActive ? 'var(--color-gold)' : 'rgba(200,169,110,0.3)',
                  textTransform: 'uppercase',
                }}>
                  {l.abbr}
                  {isActive && <span style={{ marginLeft: '4px' }}>·</span>}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <style>{`
        @keyframes langPanelIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  )
}
