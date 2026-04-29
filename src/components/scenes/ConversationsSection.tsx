'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

type MediaItem = {
  type: 'video' | 'image'
  title: string
  subtitle: string
  poster?: string
  src?: string
  videoUrl?: string  // YouTube embed URL or direct video URL
}

interface ConversationsData {
  heading: string
  subheading: string
  items: MediaItem[]
}

const MEDIA_ITEMS_FALLBACK: MediaItem[] = [
  {
    type: 'video',
    title: 'Many industries. One mission.',
    subtitle: 'Signature talk',
    poster: '/images/speaking.webp',
  },
  {
    type: 'video',
    title: 'CNN — Live News',
    subtitle: 'Live broadcast',
    videoUrl: 'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAX-1KAFtg&autoplay=1&mute=1',
    poster: '/images/gallery-1.webp',
  },
  {
    type: 'video',
    title: 'BBC News — Live',
    subtitle: 'Live broadcast',
    videoUrl: 'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA&autoplay=1&mute=1',
    poster: '/images/gallery-2.webp',
  },
  { type: 'image', title: 'Advisory engagement', subtitle: 'Private briefing', src: '/images/keynotes.webp' },
]

const getThumb = (item: MediaItem) => item.type === 'video' ? item.poster : item.src

export default function ConversationsSection({ data }: { data?: ConversationsData }) {
  const items = data?.items ?? MEDIA_ITEMS_FALLBACK
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const current = items[active]

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setPlaying(false)
  }, [])
  useEffect(() => {
    if (playing) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [playing, handleKeyDown])

  return (
    <section id="media" aria-label="Conversations and media" className="section" style={{ minHeight: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box', padding: 'clamp(20px, 3vw, 36px) var(--section-pad-x)', borderBottom: '2px solid var(--color-gold)', display: 'flex', flexDirection: 'column' }}>
      <p className="section-label">Conversations</p>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-4)', textAlign: 'left' }}>
        <div>
          <h2 className="h2 reveal" style={{ marginBottom: 'var(--space-1)' }}>
            {data?.heading ?? 'In conversation on record.'}
          </h2>
          <p className="body reveal" style={{ maxWidth: '560px', opacity: 0.7, margin: 0 }}>
            {data?.subheading ?? 'Podcasts, interviews and addresses.'}
          </p>
        </div>
        <span className="pill reveal">Immersive media room</span>
      </div>

      {/* Cinema screen */}
      <div className="reveal" style={{
        flex: '1 1 auto',
        minHeight: 'clamp(220px, 40vh, 520px)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-gold-dim)',
        background: 'var(--color-bg-card)',
        position: 'relative',
        marginBottom: 'var(--space-3)',
      }}>
        {/* Live stream iframe OR poster image */}
        {current.videoUrl ? (
          <iframe
            key={current.videoUrl}
            src={current.videoUrl}
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <>
            {getThumb(current) && (
              <Image
                src={getThumb(current)!}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                style={{ objectFit: 'contain', objectPosition: 'center center', filter: 'brightness(0.85)' }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
              />
            )}
            {/* Gradient overlay + text */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.88) 25%, transparent 65%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: 'var(--space-8)',
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 'var(--space-2)' }}>{current.subtitle}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: '#f0e8d8', fontWeight: 300, lineHeight: 1.2, margin: 0 }}>{current.title}</p>
            </div>
            {/* Play button */}
            {current.type === 'video' && (
              <button
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${current.title}`}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'rgba(200,169,110,0.2)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(200,169,110,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,169,110,0.35)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translate(-50%, -50%) scale(1.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,169,110,0.2)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translate(-50%, -50%) scale(1)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-gold)" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
            )}
          </>
        )}
      </div>

      {/* 4 thumbnails in a row */}
      <div className="reveal media-grid" style={{ gap: 'var(--space-3)', flex: '0 0 auto', height: 'clamp(80px, 12vh, 130px)' }}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={item.title}
            aria-pressed={active === i}
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: active === i ? '1px solid var(--color-gold)' : '1px solid var(--color-gold-dim)',
              background: 'var(--color-bg-card)',
              cursor: 'pointer',
              padding: 0,
              position: 'relative',
              aspectRatio: '16/9',
              width: '100%',
              height: '100%',
              transition: 'border-color var(--duration-base) var(--ease-out)',
            }}
          >
            {getThumb(item) && (
              <Image
                src={getThumb(item)!}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 65vw, 25vw"
                style={{ objectFit: 'contain', objectPosition: 'center center', filter: active === i ? 'brightness(1)' : 'brightness(0.9)', transition: 'filter var(--duration-base) var(--ease-out)' }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
              />
            )}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 10px', background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 100%)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: active === i ? 'var(--color-gold)' : 'rgba(255,255,255,0.5)', margin: 0 }}>
                {item.subtitle}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: active === i ? '#f0e8d8' : 'rgba(255,255,255,0.35)', margin: '2px 0 0', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </p>
            </div>
            {active === i && (
              <div style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold)' }} />
            )}
          </button>
        ))}
      </div>

    </section>
  )
}
