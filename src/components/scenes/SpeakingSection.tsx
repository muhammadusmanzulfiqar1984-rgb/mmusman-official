import { HoloCard } from '@/components/effects/HoloCard'

interface SpeakingCard {
  tag: string
  title: string
  icon?: string
}

interface KeynoteCard {
  tag: string
  title: string
  body: string
}

interface SpeakingData {
  heading: string
  subheading: string
  cards: SpeakingCard[]
  keynotes?: KeynoteCard[]
}

// SVG icons keyed by semantic name (matches sections.json icon field)
const ICON_MAP: Record<string, React.ReactNode> = {
  systems: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  globe:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  users:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  strategy:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
}
const ICON_FALLBACK = [
  ICON_MAP.systems,
  ICON_MAP.globe,
  ICON_MAP.users,
  ICON_MAP.strategy,
]

export default function SpeakingSection({ data }: { data: SpeakingData }) {
  return (
    <section id="speaking" aria-label="Speaking and advisory" className="section" style={{ boxSizing: 'border-box', padding: '0 0 clamp(48px, 6vw, 80px) 0', borderBottom: '2px solid var(--color-gold)' }}>

      {/* ── Full-width banner ── */}
      <div aria-hidden="true" style={{ width: '100%', aspectRatio: '16 / 6', position: 'relative', overflow: 'hidden', marginBottom: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/Corporate%20training1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          filter: 'contrast(1.05) brightness(1.2)',
        }} />
      </div>

      <div style={{ padding: 'clamp(28px, 4vw, 48px) var(--section-pad-x) 0' }}>
        <p className="section-label">Speaking</p>
        <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-3)' }}>{data.heading}</h2>
        <p className="body reveal" style={{ maxWidth: '560px', marginBottom: 'var(--space-8)' }}>{data.subheading}</p>

        <div className="grid-4 reveal-stagger reveal" style={{ gap: 'var(--space-4)' }}>
          {data.cards.map((card, i) => (
            <div key={i} className="spin-border">
            <HoloCard className="card shimmer-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4)' }}>
              <div style={{
                width: '32px', height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-gold-glow)',
                border: '1px solid var(--color-gold-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-gold)',
                flexShrink: 0,
              }}>
                {(card.icon && ICON_MAP[card.icon.toLowerCase()]) ?? ICON_FALLBACK[i % ICON_FALLBACK.length]}
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                {card.tag}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.4, fontWeight: 300, letterSpacing: 'var(--tracking-tight)' }}>
                {card.title}
              </h3>
            </HoloCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
