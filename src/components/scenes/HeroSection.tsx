'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import MagneticButton from '@/components/effects/MagneticButton'
import { useWebGLBackground, useMicroParallax } from '@/lib/hooks/useHeroAnimations'

interface HeroData {
  eyebrow: string
  heading: string
  body: string
  buttons: Array<{ label: string; href: string; variant: string }>
  pill: string
  quote: string
  quoteSupport: string
}

export default function HeroSection({ data }: { data: HeroData }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  // ── WebGL ambient background ──────────────────────────────────────────────
  useWebGLBackground(canvasRef)

  // ── Ludic Micro-Parallax (±6px pointer nudge, spring return) ──────────────
  useMicroParallax(contentRef)

  const lines  = data.heading.split('\n')
  const words2 = (lines[1] ?? '').split(' ')
  const pivot  = Math.ceil(words2.length * 0.55)

  return (
    <section
      id="hero" aria-label="Hero"
      style={{
        position: 'relative', minHeight: 'calc(100dvh - var(--header-h))', boxSizing: 'border-box',
        paddingTop: 'clamp(60px, 10vh, 120px)',
        paddingBottom: 'clamp(40px, 6vh, 80px)',
        paddingLeft: 'var(--section-pad-x)',
        paddingRight: 'var(--section-pad-x)',
        display: 'flex', alignItems: 'flex-start',
        borderBottom: '2px solid var(--color-gold)',
      }}
    >
      <canvas
        id="hero-canvas"
        ref={canvasRef}
        aria-hidden="true"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0, opacity:0.55 }}
      />

      {/* Parallax container */}
      <div
        ref={contentRef}
        className="hero-grid"
        style={{ position:'relative', zIndex:1, width:'100%', gap:'var(--space-16)', alignItems:'center', maxWidth:'var(--container-max)', margin:'0 auto', willChange:'transform' }}
      >
        {/* LEFT */}
        <div style={{ textAlign: 'left' }}>
          {data.eyebrow && (
            <p className="eyebrow reveal" style={{ marginBottom: 'var(--space-4)' }}>{data.eyebrow}</p>
          )}
          <h1 className="h2 headline-shimmer reveal lens-resolve" style={{
            marginBottom: 'var(--space-6)',
          }}>
            {lines[0]}<br />
            {words2.slice(0, pivot).join(' ')}{' '}
            <span style={{ color: 'var(--color-gold)' }}>{words2.slice(pivot).join(' ')}</span>
          </h1>

          <p className="body reveal" style={{ maxWidth:'520px', marginBottom:'var(--space-8)' }}>{data.body}</p>

          <div className="reveal" style={{ display:'flex', gap:'var(--space-3)', flexWrap:'wrap', marginBottom:'var(--space-10)' }}>
            {data.buttons.map(b => (
              <MagneticButton key={b.href} className="hero-btn-wrap">
                <a href={b.href} className="btn btn-primary" style={{
                  padding: '11px 28px',
                  letterSpacing: 'var(--tracking-wide)',
                }}>{b.label}</a>
              </MagneticButton>
            ))}
          </div>

          <div className="reveal" style={{ display:'flex', gap:'var(--space-8)', paddingTop:'var(--space-6)', borderTop:'1px solid var(--color-border-soft)' }}>
            {([['50+','Conferences'],['15+','Years'],['6','Industries'],['25+','Organisations']] as [string,string][]).map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-2xl)', color:'var(--color-text-primary)', lineHeight:'var(--leading-tight)', fontWeight:300 }}>{v}</div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', color:'var(--color-gold)', letterSpacing:'var(--tracking-wider)', textTransform:'uppercase', marginTop:'6px', fontWeight:300 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="reveal" style={{ position:'relative' }}>
          <div style={{ borderRadius:'24px', overflow:'hidden', background: imgError ? 'linear-gradient(135deg,#1a1510,#0d0d0d)' : 'var(--color-bg-card)', border:'1px solid var(--color-gold-dim)', aspectRatio:'3/4', position:'relative', maxHeight:'520px' }}>
            {!imgError ? (
              <Image
                src="/images/hero.jpeg"
                alt="Mian Muhammad Usman"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                style={{ objectFit:'cover', objectPosition:'top center', filter:'contrast(1.05) brightness(0.92)' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',fontFamily:'serif',fontSize:'2rem',color:'rgba(200,169,110,0.3)'}}>MMU</div>
            )}
          </div>

          {/* Floating quote card */}
          <div style={{
            position:'absolute', bottom:'20px', left:'16px', right:'16px',
            padding:'var(--space-4) var(--space-5)',
            borderRadius:'var(--radius-md)',
            background: 'var(--glass-bg, rgba(10,8,5,0.88))',
            border: '1px solid var(--color-gold-dim)',
            backdropFilter: 'blur(16px)',
          }}>
            <span style={{
              display:'inline-block',
              fontFamily:'var(--font-mono)',
              fontSize:'var(--text-xs)',
              letterSpacing:'var(--tracking-widest)',
              textTransform:'uppercase',
              color:'var(--color-gold)',
              marginBottom:'var(--space-3)',
            }}>{data.pill}</span>
            <blockquote style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-base)', fontStyle:'italic', color:'var(--color-gold)', lineHeight:1.55, fontWeight:300, borderLeft:'2px solid var(--color-gold)', paddingLeft:'var(--space-4)', margin:0, letterSpacing:'var(--tracking-tight)' }}>
              &ldquo;{data.quote}&rdquo;
            </blockquote>
            {data.quoteSupport && (
              <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', color:'var(--color-text-ghost)', lineHeight:1.6, marginTop:'var(--space-3)', fontWeight:300, fontStyle:'normal' }}>{data.quoteSupport}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
