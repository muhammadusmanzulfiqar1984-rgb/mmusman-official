interface TrainingData {
  heading: string
  paragraphs: string[]
  topics: string[]
  cta: { label: string; href: string }
}

export default function TrainingSection({ data }: { data: TrainingData }) {
  return (
    <section id="training" aria-label="Training and programs" className="section" style={{ boxSizing: 'border-box', padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)', textAlign: 'left' }}>
      <p className="section-label">Training</p>

      <div className="col2-grid" style={{ alignItems: 'start' }}>
        <div>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-6)' }}>{data.heading}</h2>
          {data.paragraphs.map((p, i) => (
            <p key={i} className="body reveal" style={{ marginBottom: 'var(--space-5)' }}>{p}</p>
          ))}
          <a href={data.cta.href} className="btn btn-primary reveal" style={{ marginTop: 'var(--space-3)' }}>
            {data.cta.label}
          </a>
        </div>

        <div className="spin-border">
        <div className="glass" style={{ padding: 'var(--space-8)' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            marginBottom: 'var(--space-6)',
          }}>
            Program topics
          </p>
          <ul className="list-dashed" aria-label="Training topics">
            {data.topics.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </section>
  )
}
