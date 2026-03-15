interface SpeakingCard {
  tag: string
  title: string
  icon?: string
}

interface SpeakingData {
  heading: string
  subheading: string
  cards: SpeakingCard[]
}

// SVG icons keyed by card index
const ICONS = [
  // Home / Retail
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  // Globe
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  // Users
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  // Monitor
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
]

export default function SpeakingSection({ data }: { data: SpeakingData }) {
  return (
    <section id="speaking" aria-label="Speaking and advisory" className="section" style={{ height: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box', overflow: 'hidden', padding: 'clamp(20px, 3vw, 40px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)' }}>
      <p className="section-label">Forum</p>

      <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-4)' }}>{data.heading}</h2>
      <p className="body reveal" style={{ maxWidth: '640px', marginBottom: 'var(--space-10)' }}>{data.subheading}</p>

      <div className="grid-4 reveal">
        {data.cards.map((card, i) => (
          <article key={i} className="card shimmer-wrap" aria-label={card.tag} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Icon */}
            <div style={{
              width: '40px', height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-gold-glow)',
              border: '1px solid var(--color-gold-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-gold)',
              flexShrink: 0,
            }}>
              {ICONS[i % ICONS.length]}
            </div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}>
              {card.tag}
            </p>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.02rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.45,
              fontWeight: 300,
              letterSpacing: '-0.01em',
            }}>
              {card.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  )
}
