'use client'
import { useRef, useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import MagneticButton from '@/components/effects/MagneticButton'
import { useWebGLBackground, useMicroParallax } from '@/lib/hooks/useHeroAnimations'
import { useLang } from '@/lib/langContext'

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(target); return }
      let t0: number | null = null
      const tick = (now: number) => {
        if (!t0) t0 = now
        const p = Math.min((now - t0) / duration, 1)
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return { count, ref }
}

function StatItem({ value, label }: { value: string; label: string }) {
  const m = value.match(/^(\d+)(.*)/)
  const numeric = m ? parseInt(m[1]) : 0
  const suffix  = m ? m[2] : value
  const { count, ref } = useCountUp(numeric)
  return (
    <div ref={ref}>
      <div style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-2xl)', color:'var(--color-text-primary)', lineHeight:'var(--leading-tight)', fontWeight:300 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', color:'var(--color-gold)', letterSpacing:'var(--tracking-wider)', textTransform:'uppercase', marginTop:'6px', fontWeight:300 }}>{label}</div>
    </div>
  )
}

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
  const { t } = useLang()
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  // ── WebGL ambient background ──────────────────────────────────────────────
  useWebGLBackground(canvasRef)

  // ── Ludic Micro-Parallax (±6px pointer nudge, spring return) ──────────────
  useMicroParallax(contentRef)

  // Use translated content when available, fall back to data prop
  const eyebrow      = t.hero.eyebrow      || data.eyebrow
  const heading      = t.hero.heading      || data.heading
  const body         = t.hero.body         || data.body
  const cta1         = t.hero.cta1         || data.buttons[0]?.label
  const cta2         = t.hero.cta2         || data.buttons[1]?.label
  const pill         = t.hero.pill         || data.pill
  const quote        = t.hero.quote        || data.quote
  const quoteSupport = t.hero.quoteSupport || data.quoteSupport

  const { lines, words2, pivot } = useMemo(() => {
    const lines  = heading.split('\n')
    const words2 = (lines[1] ?? '').split(' ')
    const pivot  = Math.ceil(words2.length * 0.55)
    return { lines, words2, pivot }
  }, [heading])

  return (
    <section
      id="hero" aria-label="Hero"
      data-parallax
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
          {eyebrow && (
            <p className="eyebrow reveal" style={{ marginBottom: 'var(--space-4)' }}>{eyebrow}</p>
          )}
          <h1 className="h2 headline-shimmer reveal lens-resolve" data-glow data-gold-text style={{
            marginBottom: 'var(--space-6)',
          }}>
            {lines[0]}<br />
            {words2.slice(0, pivot).join(' ')}{' '}
            <span style={{ color: 'var(--color-gold)' }}>{words2.slice(pivot).join(' ')}</span>
          </h1>

          <p className="body reveal" style={{ maxWidth:'520px', marginBottom:'var(--space-8)', whiteSpace: 'pre-line', fontStyle: 'italic', lineHeight: 1.75 }}>{body}</p>

          <div className="reveal" style={{ display:'flex', gap:'var(--space-3)', flexWrap:'wrap', marginBottom:'var(--space-10)' }}>
            <MagneticButton className="hero-btn-wrap">
              <a href={data.buttons[0]?.href ?? '#work'} className="btn btn-primary" style={{ padding: '11px 28px', letterSpacing: 'var(--tracking-wide)' }}>{cta1}</a>
            </MagneticButton>
            <MagneticButton className="hero-btn-wrap">
              <a href={data.buttons[1]?.href ?? '#contact'} className="btn btn-primary" style={{ padding: '11px 28px', letterSpacing: 'var(--tracking-wide)' }}>{cta2}</a>
            </MagneticButton>
          </div>

          <div className="reveal" style={{ display:'flex', gap:'var(--space-8)', paddingTop:'var(--space-6)', borderTop:'1px solid var(--color-border-soft)' }}>
            {([['85+', t.hero.statConferences],['18+', t.hero.statYears],['10+', t.hero.statDomains],['25+', t.hero.statOrganisations]] as [string,string][]).map(([v,l]) => (
              <StatItem key={l} value={v} label={l} />
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="reveal" style={{ position:'relative' }}>
          <div style={{ borderRadius:'24px', overflow:'hidden', background: imgError ? 'linear-gradient(135deg,#1a1510,#0d0d0d)' : 'var(--color-bg-card)', border:'1px solid var(--color-gold-dim)', aspectRatio:'3/4', position:'relative', maxHeight:'520px' }}>
            {!imgError ? (
              <Image
                src="/images/hero.webp"
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
            }}>{pill}</span>
            <blockquote style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-base)', fontStyle:'italic', color:'var(--color-gold)', lineHeight:1.55, fontWeight:300, borderLeft:'2px solid var(--color-gold)', paddingLeft:'var(--space-4)', margin:0, letterSpacing:'var(--tracking-tight)' }}>
              &ldquo;{quote}&rdquo;
            </blockquote>
            {quoteSupport && (
              <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', color:'var(--color-text-ghost)', lineHeight:1.6, marginTop:'var(--space-3)', fontWeight:300, fontStyle:'normal' }}>{quoteSupport}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
