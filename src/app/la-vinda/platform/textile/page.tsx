'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const textileModules = [
  {
    title: 'Textile Strategy Canvas',
    description: 'Commercial positioning, category priorities, and route-to-market direction.',
  },
  {
    title: 'Sourcing Grid',
    description: 'Supplier lanes, compliance checks, and quality checkpoints by region.',
  },
  {
    title: 'Portfolio Matrix',
    description: 'Product line architecture for knit, denim, workwear, and home textile.',
  },
  {
    title: 'Execution Dashboard',
    description: 'Lead times, delivery reliability, and operational readiness snapshots.',
  },
]

export default function LaVividWorkTextilePage() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ok = window.sessionStorage.getItem('la_vivid_work_ok') === 'true'
    if (!ok) {
      router.replace('/la-vinda')
      return
    }
    setAllowed(true)
  }, [router])

  if (!allowed) {
    return null
  }

  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{
        background:
          'radial-gradient(circle at 20% 16%, rgba(166,136,88,0.2), transparent 42%), radial-gradient(circle at 82% 72%, rgba(148,118,72,0.14), transparent 40%), linear-gradient(180deg, #120d0a 0%, #0d0a08 55%, #080605 100%)',
      }}
    >
      <section
        className="mx-auto w-full max-w-5xl"
        style={{
          border: '1px solid rgba(166,136,88,0.32)',
          borderRadius: '20px',
          background: 'linear-gradient(155deg, rgba(24,18,13,0.9), rgba(14,11,9,0.86))',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(210,184,131,0.1)',
          padding: 'clamp(24px, 4vw, 46px)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-dim)',
            marginBottom: 'var(--space-3)',
          }}
        >
          La Vivid Work
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            lineHeight: '1.02',
            fontWeight: 300,
            color: 'rgba(232,220,196,0.95)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Textile Grid
        </h1>

        <p
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-sm)',
            lineHeight: '1.8',
            maxWidth: '60ch',
            marginBottom: 'var(--space-8)',
          }}
        >
          Textile modules are now active. Open any card to continue into textile workstreams.
        </p>

        <div className="grid gap-4 md:grid-cols-2" style={{ marginBottom: 'var(--space-8)' }}>
          {textileModules.map((item) => (
            <article
              key={item.title}
              style={{
                border: '1px solid rgba(166,136,88,0.26)',
                borderRadius: '16px',
                padding: 'var(--space-6)',
                background: 'linear-gradient(145deg, rgba(26,21,16,0.92), rgba(17,13,10,0.88))',
                minHeight: '170px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h2
                  style={{
                    color: 'var(--color-gold-bright)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {item.title}
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
              <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Textile Open
              </span>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/la-vinda/platform"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              border: '1px solid rgba(166,136,88,0.34)',
              borderRadius: '999px',
              padding: '8px 14px',
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.64rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Back To Archive
          </Link>
          <Link
            href="/la-vinda"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              border: '1px solid rgba(166,136,88,0.34)',
              borderRadius: '999px',
              padding: '8px 14px',
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.64rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Return To Gate
          </Link>
        </div>
      </section>
    </main>
  )
}
