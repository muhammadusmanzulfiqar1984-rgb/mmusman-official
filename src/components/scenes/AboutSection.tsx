interface AboutData {
  eyebrow: string
  label: string
  heading: string
  paragraphs: string[]
  tags?: string[]
}

export default function AboutSection({ data }: { data: AboutData }) {
  const tags = data.tags ?? ['Lawyer', 'Trader', 'Founder', 'Strategist']
  return (
    <section id="about" aria-label="About" className="section" style={{ borderBottom: '2px solid var(--color-gold)', padding: 'clamp(20px, 3vw, 40px) var(--section-pad-x)', height: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
      <div className="col2-grid" style={{ alignItems: 'center' }}>

        {/* LEFT — B&W photo */}
        <div className="reveal" style={{ position: 'relative' }}>
          <div style={{ borderRadius: '20px', overflow: 'hidden', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', aspectRatio: '3/4', maxHeight: '520px' }}>
            <img
              src="/images/personal.png"
              alt="Mian Muhammad Usman"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'grayscale(1) contrast(1.05) brightness(0.9)', display: 'block' }}
              onError={e => { const el = e.target as HTMLImageElement; el.style.display = 'none' }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '-12px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
            {tags.map(t => <span key={t} className="pill" style={{ fontSize: '0.6rem' }}>{t}</span>)}
          </div>
        </div>

        {/* RIGHT — content */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-ghost)', marginBottom: 'var(--space-2)', fontWeight: 300 }}>
            {tags.join(' · ')}
          </p>
          <p className="eyebrow reveal" style={{ marginBottom: 'var(--space-3)', textTransform: 'uppercase', fontSize: '0.65rem' }}>{data.label}</p>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-6)' }}>{data.heading}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {data.paragraphs.map((p, i) => <p key={i} className="body reveal">{p}</p>)}
          </div>
          <div className="reveal" style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
            <a href="#work" className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>Explore the work</a>
            <a href="#contact" className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  )
}
