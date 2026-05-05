'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const LA_VIVID_PIN = '616161'

export default function LaVindaEntryPage() {
  const router = useRouter()
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.sessionStorage.removeItem('la_vivid_work_ok')
    setDigits(['', '', '', '', '', ''])
    setStatus('idle')
    inputRefs.current[0]?.focus()
  }, [])

  const submitPin = async (pin: string) => {
    if (isChecking) return
    setIsChecking(true)

    await new Promise((resolve) => setTimeout(resolve, 280))

    if (pin === LA_VIVID_PIN) {
      setStatus('success')
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('la_vivid_work_ok', 'true')
      }
      setTimeout(() => {
        router.push('/la-vinda/platform')
      }, 260)
    } else {
      setStatus('error')
      setTimeout(() => {
        setDigits(['', '', '', '', '', ''])
        setStatus('idle')
        inputRefs.current[0]?.focus()
      }, 520)
    }

    setIsChecking(false)
  }

  const onDigitChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = clean
    setDigits(next)
    setStatus('idle')

    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    const pin = next.join('')
    if (pin.length === 6) {
      submitPin(pin)
    }
  }

  const onKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (event.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-24"
      style={{
        background:
          'radial-gradient(circle at 16% 18%, rgba(166,136,88,0.2), transparent 40%), radial-gradient(circle at 84% 74%, rgba(148,118,72,0.14), transparent 38%), linear-gradient(180deg, #120d0a 0%, #0d0a08 55%, #080605 100%)',
      }}
    >
      <section
        className="w-full max-w-xl text-center"
        style={{
          border: '1px solid rgba(166,136,88,0.3)',
          borderRadius: '20px',
          background: 'linear-gradient(165deg, rgba(22,18,14,0.9), rgba(14,11,9,0.88))',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(210,184,131,0.08)',
          padding: 'clamp(24px, 4vw, 44px)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <p
          className="uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.22em',
            color: 'var(--color-gold-dim)',
            marginBottom: 'var(--space-3)',
          }}
        >
          La Vivid Work
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.1rem)',
            lineHeight: '1.03',
            fontWeight: 300,
            color: 'rgba(232,220,196,0.95)',
            marginBottom: 'var(--space-3)',
          }}
        >
          Enter Access PIN
        </h1>

        <p
          style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
            lineHeight: '1.8',
            maxWidth: '40ch',
            margin: '0 auto var(--space-8)',
          }}
        >
          Enter the six-digit code to continue to archive collections.
        </p>

        <div className="flex justify-center gap-3 mb-5">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => onDigitChange(index, e.target.value)}
              onKeyDown={(e) => onKeyDown(index, e)}
              disabled={isChecking || status === 'success'}
              aria-label={`PIN digit ${index + 1}`}
              className="text-center outline-none"
              style={{
                width: '44px',
                height: '52px',
                borderRadius: 'var(--radius-sm)',
                border:
                  status === 'error'
                    ? '1px solid rgba(220, 90, 90, 0.7)'
                    : status === 'success'
                    ? '1px solid rgba(176,146,96,0.9)'
                    : '1px solid rgba(166,136,88,0.35)',
                background: 'rgba(24, 19, 14, 0.9)',
                color: 'rgba(237,227,208,0.96)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                transition: 'border-color 180ms ease',
              }}
            />
          ))}
        </div>

        <p
          className="uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            minHeight: '1.2em',
            color:
              status === 'error'
                ? '#d86a6a'
                : status === 'success'
                ? 'var(--color-gold-bright)'
                : 'var(--color-text-ghost)',
          }}
        >
          {status === 'error'
            ? 'Invalid PIN'
            : status === 'success'
            ? 'Access Granted'
            : 'Use 6-digit access code'}
        </p>
      </section>
    </main>
  )
}
