'use client'
import { useState, useRef } from 'react'
import PrivacyPanel from '@/components/ai/PrivacyPanel'

interface ContactData {
  heading: string
  subheading: string
  email: string
  phone: string
  whatsapp: string
  engagementTypes: string[]
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactSection({ data }: { data: ContactData }) {
  const [status, setStatus]   = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const fd   = new FormData(form)

    // Honeypot
    if (fd.get('_hp')) return

    const payload = {
      name:    (fd.get('name')    as string ?? '').trim(),
      email:   (fd.get('email')   as string ?? '').trim(),
      type:    (fd.get('type')    as string ?? '').trim(),
      message: (fd.get('message') as string ?? '').trim(),
    }

    if (!payload.name || !payload.email || !payload.message) return

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        formRef.current?.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg((json as { error?: string }).error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="section" style={{ height: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box', overflow: 'hidden', padding: 'clamp(20px, 3vw, 40px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)' }}>
      <p className="section-label">Contact</p>

      <div className="col2-grid">
        {/* Left — info */}
        <div>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-5)' }}>{data.heading}</h2>
          <p className="body reveal" style={{ marginBottom: 'var(--space-8)' }}>{data.subheading}</p>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <a
              href={`mailto:${data.email}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gold)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              ✉ {data.email}
            </a>
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              ☎ {data.phone}
            </a>
            <a
              href={data.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              ✉ Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="glass reveal" style={{ padding: 'var(--space-8)' }}>
          {status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', textAlign: 'center', padding: 'var(--space-10) 0' }}>
              <div style={{ fontSize: '2rem' }}>✓</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text-primary)', fontWeight: 300 }}>
                Message received.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 300 }}>
                You'll receive a personal response.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn btn-ghost"
                style={{ alignSelf: 'center', marginTop: 'var(--space-4)', fontSize: '0.75rem' }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              aria-label="Contact form"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
            >
              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={labelStyle}>Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  style={inputStyle}
                  aria-required="true"
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={labelStyle}>Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  style={inputStyle}
                  aria-required="true"
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={labelStyle}>Engagement type</span>
                <select name="type" style={inputStyle} aria-label="Engagement type">
                  <option value="">Select…</option>
                  {data.engagementTypes.map(t => (
                    <option key={t} value={t.toLowerCase()}>{t}</option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={labelStyle}>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  aria-required="true"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                />
              </label>

              {/* Honeypot — spam protection */}
              <input type="text" name="_hp" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

              {status === 'error' && (
                <p role="alert" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: '#e07070', letterSpacing: '0.04em' }}>
                  ✕ {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'submitting'}
                style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 'var(--space-24)',
          paddingTop: 'var(--space-8)',
          borderTop: '1px solid var(--color-border-soft)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-ghost)', letterSpacing: '0.08em' }}>
          © 2026 Mian Muhammad Usman · All Rights Reserved
        </span>
        <nav aria-label="Footer navigation">
          <ul style={{ display: 'flex', gap: 'var(--space-6)', listStyle: 'none' }}>
            {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }].map(l => (
              <li key={l.label}>
                <a href={l.href} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-ghost)', textDecoration: 'none', letterSpacing: '0.06em' }}>
                  {l.label}
                </a>
              </li>
            ))}
            <li><PrivacyPanel /></li>
          </ul>
        </nav>
      </div>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-text-ghost)',
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding: 'var(--space-3) var(--space-4)',
  color: 'var(--color-text-secondary)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  fontWeight: 300,
  width: '100%',
  outline: 'none',
  transition: 'border-color var(--duration-base) var(--ease-out)',
}
