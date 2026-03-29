import Image from 'next/image'

interface AboutData {
  eyebrow: string
  label: string
  heading: string
  paragraphs: string[]
  displayTags?: string[]
  tags?: string[]
}

export default function AboutSection({ data }: { data: AboutData }) {
  const tags = data.displayTags ?? ['Lawyer', 'Trader', 'Founder', 'Strategist']
  return (
    <section id="about" aria-label="About" className="section" style={{ borderBottom: '2px solid var(--color-gold)', padding: 'clamp(64px, 8vw, 100px) var(--section-pad-x)', boxSizing: 'border-box' }}>
      <div className="col2-grid" style={{ alignItems: 'center' }}>

        {/* LEFT — B&W photo */}
        <div className="reveal" style={{ position: 'relative' }}>
          <div style={{ borderRadius: '20px', overflow: 'hidden', background: 'var(--color-bg-card)', border: '1px solid var(--color-gold-dim)', aspectRatio: '3/4', position: 'relative', maxHeight: 'min(520px, calc(100dvh - var(--header-h) - clamp(80px, 10vw, 144px)))' }}>
            <Image
              src="/images/Usman%20Research.jpeg"
              alt="Mian Muhammad Usman at his research desk"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: 'contrast(1.35) brightness(0.72) saturate(0.7) sepia(0.15)' }}
              onError={e => { const el = e.target as HTMLImageElement; el.style.display = 'none' }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '-12px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
            {tags.map(t => <span key={t} className="pill" style={{ fontSize: '0.6rem' }}>{t}</span>)}
          </div>
        </div>

        {/* RIGHT — content */}
        <div style={{ textAlign: 'left' }}>
          <p className="eyebrow reveal" style={{ marginBottom: 'var(--space-3)' }}>{data.eyebrow || data.label}</p>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-6)' }}>{data.heading}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {data.paragraphs.map((p, i) => <p key={i} className="body reveal">{p}</p>)}
          </div>
          <div className="reveal" style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
            <a href="#work" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Explore the work</a>
            <a href="#contact" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  )
}
