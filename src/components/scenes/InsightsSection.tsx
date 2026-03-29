import { HoloCard } from '@/components/effects/HoloCard'

interface InsightCard {
  tag: string
  title: string
  body: string
}

interface InsightsData {
  heading: string
  subheading: string
  cards: InsightCard[]
}

export default function InsightsSection({ data }: { data: InsightsData }) {
  return (
    <section id="insights" aria-label="Featured insights" className="section" style={{ boxSizing: 'border-box', padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)', textAlign: 'left' }}>
      <p className="section-label">Insights</p>

      <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-4)' }}>{data.heading}</h2>
      <p className="body reveal" style={{ maxWidth: '600px', marginBottom: 'var(--space-10)' }}>{data.subheading}</p>

      <div className="grid-2 reveal-stagger reveal">
        {data.cards.map((card, i) => (
          <div key={i} className="spin-border">
          <HoloCard className="card shimmer-wrap">
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: 'var(--space-3)',
            }}>
              {card.tag}
            </p>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.98rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
              fontWeight: 300,
              marginBottom: 'var(--space-3)',
            }}>
              {card.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--color-text-dim)',
              lineHeight: 1.7,
              fontWeight: 300,
            }}>
              {card.body}
            </p>
          </HoloCard>
          </div>
        ))}
      </div>
    </section>
  )
}
