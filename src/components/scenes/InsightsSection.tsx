import { HoloCard } from '@/components/effects/HoloCard'

interface InsightCard {
  tag: string
  title: string
  body: string
}

interface InsightsData {
  heading: string
  subheading: string
  intro?: string
  closing?: string
  cards: InsightCard[]
}

export default function InsightsSection({ data }: { data: InsightsData }) {
  return (
    <section id="insights" aria-label="Chamber of Consequence" className="section" style={{ boxSizing: 'border-box', padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)', textAlign: 'left' }}>
      <p className="section-label">Thought</p>

      <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-6)', fontStyle: 'italic' }}>{data.heading}</h2>

      {/* Lead statement */}
      <p className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '680px', marginBottom: 'var(--space-6)', letterSpacing: '-0.01em' }}>
        {data.subheading}
      </p>

      {/* Introductory paragraph */}
      {data.intro && (
        <p className="reveal" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300, color: 'var(--color-text-muted)', lineHeight: 1.8, maxWidth: '600px', marginBottom: 'var(--space-12)', borderLeft: '1px solid var(--color-gold-dim)', paddingLeft: 'var(--space-5)' }}>
          {data.intro}
        </p>
      )}

      {/* Four sub-chambers */}
      <div className="grid-2 reveal-stagger reveal">
        {data.cards.map((card, i) => (
          <div key={i} className="spin-border">
          <HoloCard className="card shimmer-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6) var(--space-6) var(--space-7)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', marginBottom: 'var(--space-1)' }}>
              {card.tag}
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', fontStyle: 'italic', color: 'var(--color-text-primary)', lineHeight: 1.45, fontWeight: 300, whiteSpace: 'pre-line', letterSpacing: '-0.01em' }}>
              {card.title}
            </h3>
            <div style={{ width: '24px', height: '1px', background: 'var(--color-gold-dim)' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.75, fontWeight: 300 }}>
              {card.body}
            </p>
          </HoloCard>
          </div>
        ))}
      </div>

      {/* Closing line */}
      {data.closing && (
        <p className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontStyle: 'italic', fontWeight: 300, color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: '560px', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border-soft)', letterSpacing: '-0.01em' }}>
          {data.closing}
        </p>
      )}
    </section>
  )
}
