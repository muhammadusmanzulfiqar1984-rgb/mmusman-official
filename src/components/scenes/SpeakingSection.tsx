import { HoloCard } from '@/components/effects/HoloCard'

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

      {/* ── 16:4 cinematic banner ── */}
      <div aria-hidden="true" style={{ width: '100%', aspectRatio: '16 / 4', position: 'relative', overflow: 'hidden', marginBottom: 'clamp(28px, 4vw, 48px)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/Corporate%20training1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'contrast(1.08) brightness(0.78)',
        }} />
        {/* dark vignette — sides */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,5,8,0.82) 0%, rgba(10,5,8,0.15) 35%, rgba(10,5,8,0.15) 65%, rgba(10,5,8,0.7) 100%)' }} />
        {/* bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, rgba(10,5,8,0.96))' }} />
        {/* gold top rule */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-gold-bright) 50%, var(--color-gold) 70%, transparent)' }} />
      </div>

      <div style={{ padding: '0 var(--section-pad-x)' }}>
        <p className="section-label">Forum</p>
        <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-3)', fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)' }}>{data.heading}</h2>
        <p className="body reveal" style={{ maxWidth: '560px', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>{data.subheading}</p>

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
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                {card.tag}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.4, fontWeight: 300, letterSpacing: '-0.01em' }}>
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
