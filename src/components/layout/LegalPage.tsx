import Link from 'next/link'

type LegalSection = {
  title: string
  body: React.ReactNode
}

type RelatedLink = {
  href: string
  label: string
}

export default function LegalPage({
  eyebrow,
  title,
  summary,
  updated,
  sections,
  relatedLinks,
}: {
  eyebrow: string
  title: string
  summary: string
  updated: string
  sections: LegalSection[]
  relatedLinks: RelatedLink[]
}) {
  return (
    <main
      style={{
        minHeight: '100dvh',
        padding: 'calc(var(--header-h) + 48px) var(--section-pad-x) 80px',
        background: 'linear-gradient(180deg, #120d0e 0%, #0d080a 100%)',
      }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div
          style={{
            border: '1px solid var(--color-border)',
            background: 'linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(179,139,89,0.08) 100%)',
            boxShadow: 'var(--shadow-card)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '28px 28px 20px',
              borderBottom: '1px solid var(--color-border-soft)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 'var(--space-6)',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <Link
                href="/"
                style={{
                  display: 'inline-block',
                  marginBottom: 'var(--space-5)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  textDecoration: 'none',
                }}
              >
                Back to site
              </Link>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {eyebrow}
              </p>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1,
                  letterSpacing: 'var(--tracking-tight)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  maxWidth: '58ch',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  color: 'var(--color-text-muted)',
                  fontWeight: 300,
                }}
              >
                {summary}
              </p>
            </div>

            <div
              style={{
                minWidth: '180px',
                padding: '14px 16px',
                border: '1px solid var(--color-border-soft)',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-ghost)',
                  marginBottom: '8px',
                }}
              >
                Last updated
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {updated}
              </p>
            </div>
          </div>

          <div style={{ padding: '28px' }}>
            <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
              {sections.map((section) => (
                <section
                  key={section.title}
                  style={{
                    paddingBottom: 'var(--space-6)',
                    borderBottom: '1px solid rgba(179,139,89,0.1)',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 300,
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {section.title}
                  </h2>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 1.85,
                      color: 'var(--color-text-muted)',
                      fontWeight: 300,
                    }}
                  >
                    {section.body}
                  </div>
                </section>
              ))}
            </div>

            <div
              style={{
                marginTop: 'var(--space-8)',
                display: 'flex',
                gap: 'var(--space-3)',
                flexWrap: 'wrap',
              }}
            >
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-gold)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '10px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-wide)',
                    textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}