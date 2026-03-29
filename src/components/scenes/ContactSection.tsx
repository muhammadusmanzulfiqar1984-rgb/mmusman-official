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
type SignalStatus = 'idle' | 'sending' | 'done'

export default function ContactSection({ data }: { data: ContactData }) {
  const [status, setStatus]   = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const [signalEmail, setSignalEmail] = useState('')
  const [signalStatus, setSignalStatus] = useState<SignalStatus>('idle')

  const handleSignal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signalEmail || signalStatus !== 'idle') return
    setSignalStatus('sending')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Signal subscriber', email: signalEmail, type: 'newsletter', message: 'Signal list subscription request.' }),
      })
    } catch { /* silent */ }
    setSignalStatus('done')
  }

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
    <section
      id="contact"
      aria-label="Contact"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)',
        borderBottom: '2px solid var(--color-gold)',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Privacy/Contact underlay image */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/privacy.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.06,
          filter: 'grayscale(1) contrast(1.1)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.845L.057 23.571a.5.5 0 00.612.612l5.726-1.466A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.959 0-3.796-.5-5.4-1.378l-.387-.222-4.02 1.03 1.03-3.978-.243-.399A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg> Chat on WhatsApp
            </a>
          </div>

          {/* Signal list — premium strip */}
          <div className="reveal" style={{ marginTop: 'var(--space-5)', borderTop: '1px solid rgba(200,169,110,0.15)', paddingTop: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <span style={{ width: '18px', height: '1px', background: 'rgba(200,169,110,0.5)', display: 'inline-block' }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', margin: 0 }}>
                Signal list
              </p>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-text-dim)', marginBottom: 'var(--space-4)', fontWeight: 300, lineHeight: 1.5 }}>
              Rare dispatches. No noise. No third-party sharing.
            </p>
            {signalStatus === 'done' ? (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.06em' }}>✦ You're on the list.</p>
            ) : (
              <form onSubmit={handleSignal} style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                <input
                  type="email"
                  required
                  value={signalEmail}
                  onChange={e => setSignalEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-label="Email for signal list"
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={signalStatus === 'sending'}
                  style={{ opacity: signalStatus === 'sending' ? 0.7 : 1, whiteSpace: 'nowrap' }}
                >
                  {signalStatus === 'sending' ? '…' : 'Join the list'}
                </button>
              </form>
            )}
          </div>

          {/* Fast Track — direct line for urgent matters */}
          <a
            href={data.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary reveal"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-3)', textDecoration: 'none', width: '100%', boxSizing: 'border-box' }}
          >
            <span>⚡ Fast Track — direct line via WhatsApp</span>
            <span style={{ marginLeft: '12px', opacity: 0.7 }}>→</span>
          </a>
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
                    <option
                      key={t}
                      value={t.toLowerCase()}
                      style={t === 'Fast track' ? { color: 'var(--color-gold)', fontWeight: 500 } : undefined}
                    >
                      {t === 'Fast track' ? '⚡ Fast track / Quick appointment' : t}
                    </option>
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
      <footer
        className="reveal"
        style={{
          marginTop: 'clamp(24px, 4vw, 48px)',
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--color-border-soft)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-6)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-ghost)', letterSpacing: '0.08em', display: 'block', textAlign: 'center' }}>
          © 2026 Mian Muhammad Usman · All Rights Reserved
        </span>
        <nav aria-label="Footer navigation">
          <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-6)', listStyle: 'none' }}>
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
      </footer>
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
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(212,169,110,0.25)',
  borderRadius: 'var(--radius-sm)',
  padding: 'var(--space-3) var(--space-4)',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  fontWeight: 300,
  width: '100%',
  outline: 'none',
  transition: 'border-color var(--duration-base) var(--ease-out)',
}
