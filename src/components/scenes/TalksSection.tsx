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
    <section id="talks" aria-label="Talks and keynotes" className="section relative py-[clamp(40px,5vw,64px)] px-[var(--section-pad-x)] border-b-2 border-[var(--color-gold)] text-left box-border">
      <p className="section-label">Talks & Keynotes</p>

      <h2 className="h2 reveal mb-[var(--space-4)]">{data.heading}</h2>
      <p className="body reveal max-w-[600px] mb-[var(--space-10)]">{data.subheading}</p>

      <div className="grid-3">
        {data.cards.map((card, i) => (
          <div key={i} className="spin-border">
          <article className="card shimmer-wrap" aria-label={card.tag}>
            <p className="font-mono text-[var(--text-xs)] tracking-[0.14em] uppercase text-[var(--color-gold)] mb-[var(--space-3)]">
              {card.tag}
            </p>
            <h3 className="font-display text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-[1.5] font-light mb-[var(--space-3)]">
              {card.title}
            </h3>
            <p className="font-body text-[var(--text-sm)] text-[var(--color-text-dim)] leading-[1.7] font-light">
              {card.body}
            </p>
          </article>
          </div>
        ))}
      </div>
    </section>
  )
}
