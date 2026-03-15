interface TalkCard {
  tag: string
  title: string
  body: string
}

interface TalksData {
  heading: string
  subheading: string
  cards: TalkCard[]
}

export default function TalksSection({ data }: { data: TalksData }) {
  return (
    <section id="talks" aria-label="Talks and keynotes" className="section" style={{ height: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box', overflow: 'hidden', padding: 'clamp(20px, 3vw, 40px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)' }}>
      <p className="section-label">Talks & Keynotes</p>

      <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-4)' }}>{data.heading}</h2>
      <p className="body reveal" style={{ maxWidth: '600px', marginBottom: 'var(--space-10)' }}>{data.subheading}</p>

      <div className="grid-3 reveal">
        {data.cards.map((card, i) => (
          <article key={i} className="card shimmer-wrap" aria-label={card.tag}>
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
          </article>
        ))}
      </div>
    </section>
  )
}
