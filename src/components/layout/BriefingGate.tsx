'use client'
import { useState, useRef, useEffect } from 'react'

const PIN = '260426'

export default function BriefingGate() {
  const [open,    setOpen]    = useState(false)
  const [digits,  setDigits]  = useState(['','','','','',''])
  const [status,  setStatus]  = useState<'idle'|'error'|'success'>('idle')
  const inputRefs = useRef<(HTMLInputElement|null)[]>([])

  // Reset on open
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setDigits(['','','','','',''])
        setStatus('idle')
        inputRefs.current[0]?.focus()
      }, 0)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleDigit = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[idx] = val
    setDigits(next)
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus()

    // Check when all filled
    const entered = next.join('')
    if (entered.length === 6) {
      if (entered === PIN) {
        setStatus('success')
        setTimeout(() => {
          setOpen(false)
          window.open('/strategic-briefing.html', '_blank', 'noopener')
        }, 600)
      } else {
        setStatus('error')
        setTimeout(() => {
          setDigits(['','','','','',''])
          setStatus('idle')
          inputRefs.current[0]?.focus()
        }, 900)
      }
    } else {
      setStatus('idle')
    }
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus()
    }
  }

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Access restricted briefing"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(200,160,96,0.08)',
          border: '1px solid rgba(200,160,96,0.3)',
          borderRadius: '3px',
          padding: '5px 10px',
          cursor: 'pointer',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          transition: 'background 0.2s, border-color 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,160,96,0.16)'
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,160,96,0.6)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,160,96,0.08)'
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,160,96,0.3)'
        }}
      >
        <span style={{ fontSize: '0.7rem' }}>⌇</span>
        RESTRICTED
      </button>

      {/* ── Full-screen PIN gate overlay ── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Restricted access gate"
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(5,4,3,0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div style={{
            textAlign: 'center',
            maxWidth: '420px',
            width: '100%',
          }}>
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'none', border: 'none',
                color: 'rgba(200,160,96,0.4)', fontSize: '1.2rem',
                cursor: 'pointer', lineHeight: 1,
              }}
              aria-label="Close"
            >✕</button>

            {/* Label */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(200,160,96,0.5)',
              marginBottom: '24px',
            }}>Restricted Circulation</p>

            {/* Title */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--color-gold)',
              marginBottom: '8px',
            }}>Strategic Intelligence<br/>Briefing</h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: 'rgba(240,224,192,0.45)',
              lineHeight: 1.7,
              marginBottom: '40px',
              fontWeight: 300,
            }}>
              This document is classified for authorised<br/>institutional recipients only.
            </p>

            {/* PIN inputs */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleDigit(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  autoComplete="off"
                  style={{
                    width: '48px', height: '60px',
                    background: 'rgba(15,12,8,0.9)',
                    border: `1px solid ${
                      status === 'error'   ? 'rgba(192,57,43,0.7)' :
                      status === 'success' ? 'rgba(200,160,96,0.8)' :
                      'rgba(200,160,96,0.2)'
                    }`,
                    borderRadius: '3px',
                    color: 'var(--color-gold)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'border-color 0.25s',
                    animation: status === 'error' ? 'shake 0.4s ease' : 'none',
                  }}
                />
              ))}
            </div>

            {/* Status */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              minHeight: '1.2em',
              color:
                status === 'error'   ? '#c0392b' :
                status === 'success' ? 'var(--color-gold)' :
                'rgba(200,160,96,0.35)',
            }}>
              {status === 'error'   ? 'ACCESS DENIED — INCORRECT CODE' :
               status === 'success' ? 'ACCESS GRANTED — OPENING BRIEFING' :
               'ENTER 6-DIGIT ACCESS CODE'}
            </p>
          </div>

          <style>{`
            @keyframes shake {
              0%,100%{transform:translateX(0)}
              25%{transform:translateX(-6px)}
              75%{transform:translateX(6px)}
            }
          `}</style>
        </div>
      )}
    </>
  )
}
