'use client'
import { useState } from 'react'

const MEDIA_ITEMS = [
  {
    type: 'video',
    title: 'Many industries. One mission.',
    subtitle: 'Signature talk',
    poster: '/images/speaking.png',
  },
  {
    type: 'image',
    title: 'Leadership summit keynote',
    subtitle: 'Conference address',
    src: '/images/gallery-1.png',
  },
  {
    type: 'image',
    title: 'Industry roundtable',
    subtitle: 'Panel discussion',
    src: '/images/gallery-2.png',
  },
  {
    type: 'image',
    title: 'Advisory engagement',
    subtitle: 'Private briefing',
    src: '/images/gallery-3.png',
  },
]

export default function ConversationsSection() {
  const [active, setActive] = useState(0)
  const current = MEDIA_ITEMS[active]

  return (
    <section id="media" aria-label="Conversations and media" className="section" style={{ height: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box', overflow: 'hidden', padding: 'clamp(20px, 3vw, 40px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)' }}>
      <p className="section-label">Conversations</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', marginBottom: 'var(--space-4)' }}>
        <div>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-4)' }}>
            In conversation<br />
            <span style={{ color: 'var(--color-gold)' }}>on record.</span>
          </h2>
          <p className="body reveal" style={{ maxWidth: '560px' }}>
            Podcasts, interviews and addresses — Mian Muhammad Usman in conversation on systems, leadership, markets and the forces reshaping organisations.
          </p>
        </div>
        <span className="pill reveal" style={{ marginBottom: 'var(--space-2)' }}>Immersive media room</span>
      </div>

      {/* Main feature */}
      <div className="reveal" style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-card)',
        position: 'relative',
        aspectRatio: '16/9',
        maxHeight: '320px',
      }}>
        <img
          src={current.type === 'video' ? current.poster : current.src}
          alt={current.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.65)', display: 'block' }}
          onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.85) 30%, transparent 70%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'var(--space-8)',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 'var(--space-2)' }}>
            {current.subtitle}
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#f0e8d8', fontWeight: 300, lineHeight: 1.2 }}>
            {current.title}
          </p>

          {/* Navigation dots */}
          <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--space-5)', alignItems: 'center' }}>
            <button
              onClick={() => setActive(a => (a - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length)}
              aria-label="Previous"
              style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#fff', fontSize: '1rem' }}
            >‹</button>
            {MEDIA_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to item ${i + 1}`}
                aria-current={i === active}
                style={{
                  width: i === active ? '20px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: i === active ? 'var(--color-gold)' : 'rgba(255,255,255,0.25)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all var(--duration-base) var(--ease-out)',
                  padding: 0,
                }}
              />
            ))}
            <button
              onClick={() => setActive(a => (a + 1) % MEDIA_ITEMS.length)}
              aria-label="Next"
              style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#fff', fontSize: '1rem' }}
            >›</button>
          </div>
        </div>

        {/* Play button for video items */}
        {current.type === 'video' && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '64px', height: '64px',
              borderRadius: '50%',
              background: 'rgba(200,169,110,0.2)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(200,169,110,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--color-gold)" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: 'none' }}>
        {MEDIA_ITEMS.slice(1).map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i + 1)}
            aria-label={item.title}
            aria-pressed={active === i + 1}
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: active === i + 1 ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
              background: 'var(--color-bg-card)',
              cursor: 'pointer',
              aspectRatio: '16/9',
              padding: 0,
              position: 'relative',
            }}
          >
            <img
              src={item.src}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: active === i + 1 ? 'brightness(0.85)' : 'brightness(0.55)' }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
