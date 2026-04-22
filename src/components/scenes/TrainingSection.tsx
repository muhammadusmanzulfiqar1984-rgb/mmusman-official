'use client'

interface TrainingData {
  heading: string
  subheading: string
  paragraphs: string[]
  topics: string[]
  cta: { label: string; href: string }
}

export default function TrainingSection({ data }: { data: TrainingData }) {
  return (
    <section
      id="training"
      aria-label="The Academy"
      className="section"
      style={{
        boxSizing: 'border-box',
        padding: 'clamp(40px, 5vw, 64px) var(--section-pad-x)',
        borderBottom: '1px solid var(--color-border-soft)',
        background: `
          linear-gradient(105deg, rgba(6,2,4,0.96) 0%, rgba(6,2,4,0.88) 42%, rgba(6,2,4,0.58) 68%, rgba(6,2,4,0.18) 100%),
          url('/images/Corporate training1.jpg') center 40% / cover no-repeat,
          #0a0408
        `,
      }}
    >
      <p className="section-label">Academy</p>

      <div className="academy-chamber">

        {/* LEFT */}
        <div className="academy-left">
          <h2 className="h2 reveal" style={{ fontStyle: 'italic', marginBottom: 'var(--space-5)', lineHeight: 1.1 }}>
            {data.heading}
          </h2>

          {data.paragraphs.map((p, i) => (
            <p key={i} className="reveal" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              lineHeight: 1.85,
              letterSpacing: '0.01em',
              marginBottom: i < data.paragraphs.length - 1 ? 'var(--space-5)' : '0',
              borderLeft: i === 0 ? '1px solid var(--color-gold-dim)' : 'none',
              paddingLeft: i === 0 ? 'var(--space-5)' : '0',
            }}>
              {p}
            </p>
          ))}

          <a
            href={data.cta.href}
            className="reveal"
            style={{
              display: 'inline-block',
              marginTop: 'var(--space-8)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(200,169,110,0.3)',
              paddingBottom: '3px',
              transition: 'border-color 200ms ease, color 200ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.3)' }}
          >
            {data.cta.label} →
          </a>
        </div>

        {/* DIVIDER */}
        <div className="academy-divider" aria-hidden="true" />

        {/* RIGHT — program register */}
        <div className="academy-right">
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.54rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(200,169,110,0.35)',
            marginBottom: 'var(--space-6)',
          }}>
            Programme of Study
          </p>

          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {data.topics.map((topic, i) => (
              <li key={i} style={{
                display: 'flex',
                gap: 'var(--space-5)',
                alignItems: 'baseline',
                padding: 'clamp(10px, 1.5vw, 16px) 0',
                borderBottom: i < data.topics.length - 1 ? '1px solid rgba(200,169,110,0.07)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.48rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(200,169,110,0.28)',
                  minWidth: '18px',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                  fontWeight: 300,
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  letterSpacing: '0.01em',
                }}>
                  {topic}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .academy-chamber {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0 clamp(32px, 5vw, 72px);
          align-items: start;
          margin-top: var(--space-8);
        }
        .academy-left  { padding-right: clamp(8px, 2vw, 24px); }
        .academy-divider {
          background: linear-gradient(to bottom, transparent 0%, rgba(200,169,110,0.15) 15%, rgba(200,169,110,0.15) 85%, transparent 100%);
          align-self: stretch; min-height: 280px;
        }
        .academy-right { padding-left: clamp(8px, 2vw, 24px); }
        @media (max-width: 768px) {
          .academy-chamber { grid-template-columns: 1fr !important; gap: var(--space-10) 0 !important; }
          .academy-divider { display: none !important; }
          .academy-left, .academy-right { padding: 0 !important; }
        }
      `}</style>
    </section>
  )
}
