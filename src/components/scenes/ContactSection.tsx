'use client'
import { useState, useRef } from 'react'
import PrivacyPanel from '@/components/ai/PrivacyPanel'
import { useLang } from '@/lib/langContext'

interface ContactData {
  heading: string
  subheading: string
  email: string
  phone: string
  whatsapp: string
  engagementTypes: string[]
}

type Status = 'idle' | 'submitting' | 'success' | 'error'
type SignalStatus = 'idle' | 'sending' | 'done' | 'error'

export default function ContactSection({ data }: { data: ContactData }) {
  const { t } = useLang()
  const heading     = t.contact.heading          || data.heading
  const subheading  = t.contact.subheading       || data.subheading
  const namePH      = t.contact.namePlaceholder  || 'Your name'
  const emailPH     = t.contact.emailPlaceholder || 'Your email'
  const messagePH   = t.contact.messagePlaceholder || 'Your message'
  const sendLabel   = t.contact.send             || 'Send message'
  const [status, setStatus]   = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const [signalEmail, setSignalEmail] = useState('')
  const [signalStatus, setSignalStatus] = useState<SignalStatus>('idle')
  const [signalError, setSignalError] = useState('')

  const handleSignal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signalEmail || signalStatus === 'sending') return
    setSignalStatus('sending')
    setSignalError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Signal subscriber', email: signalEmail, type: 'newsletter', message: 'Signal list subscription request.' }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setSignalError((json as { error?: string }).error ?? 'Signal list signup is unavailable right now.')
        setSignalStatus('error')
        return
      }

      setSignalEmail('')
      setSignalStatus('done')
    } catch {
      setSignalError('Network error. Please try again or use direct email.')
      setSignalStatus('error')
    }
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
        padding: 'clamp(40px, 5vw, 64px) var(--section-pad-x)',
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
          backgroundImage: 'url(/images/privacy.webp)',
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
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-5)' }}>{heading}</h2>
          <p className="body reveal" style={{ marginBottom: 'var(--space-8)' }}>{subheading}</p>

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
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', margin: 0 }}>
                Signal list
              </p>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-dim)', marginBottom: 'var(--space-4)', fontWeight: 300, lineHeight: 1.5 }}>
              Rare dispatches. No noise. No third-party sharing.
            </p>
            {signalStatus === 'done' ? (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.06em' }}>✦ You&apos;re on the list.</p>
            ) : (
              <form onSubmit={handleSignal} style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                <input
                  type="email"
                  required
                  value={signalEmail}
                  onChange={e => {
                    setSignalEmail(e.target.value)
                    if (signalStatus === 'error') setSignalStatus('idle')
                    if (signalError) setSignalError('')
                  }}
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
            {signalStatus === 'error' && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#e07070', marginTop: 'var(--space-3)', letterSpacing: '0.04em' }}>
                ✕ {signalError}
              </p>
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

          {/* Direct Dialing Facility */}
          <a
            href={`tel:${data.phone.replace(/\s/g, '')}`}
            className="btn btn-primary reveal"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-3)', textDecoration: 'none', width: '100%', boxSizing: 'border-box', background: 'rgba(200,169,110,0.1)', border: '1px solid var(--color-gold-dim)', color: 'var(--color-gold)' }}
          >
            <span>☎ Direct Dial — speak immediately</span>
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
                You&apos;ll receive a personal response.
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
                <span style={labelStyle}>{namePH}</span>
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
                <span style={labelStyle}>{emailPH}</span>
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
                <span style={labelStyle}>{messagePH}</span>
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
                {status === 'submitting' ? '…' : sendLabel}
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
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-6)',
        }}
      >
        {/* Social Media Icons */}
        <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center' }}>
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/mian-muhammad-usman', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            { label: 'X (Twitter)', href: 'https://x.com/mian_usman', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            { label: 'Instagram', href: 'https://instagram.com/mian_usman', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
            { label: 'YouTube', href: 'https://youtube.com/@mian_usman', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
            { label: 'Facebook', href: 'https://facebook.com/mian.usman', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                color: 'var(--color-text-ghost)',
                transition: 'color 0.2s ease, transform 0.2s ease',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gold)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-ghost)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-6)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-ghost)', letterSpacing: '0.08em' }}>
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
        </div>
      </footer>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.58rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(10, 6, 3, 0.75)',
  border: '1px solid rgba(200,169,110,0.18)',
  borderRadius: '1px',
  padding: 'var(--space-3) var(--space-4)',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  fontWeight: 300,
  width: '100%',
  outline: 'none',
  transition: 'border-color 200ms ease, box-shadow 200ms ease, background 200ms ease',
}
