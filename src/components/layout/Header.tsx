'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useLang } from '@/lib/langContext'
import LanguageSwitcher from './LanguageSwitcher'
const VintageClock   = dynamic(() => import('@/components/effects/VintageClock'), { ssr: false })
const BriefingGate   = dynamic(() => import('./BriefingGate'), { ssr: false })

export default function Header() {
  const { t } = useLang()

  const navLinks = [
    { label: t.nav.proposition,   href: '#hero' },
    { label: t.nav.origins,       href: '#about' },
    { label: t.nav.practice,      href: '#work' },
    { label: t.nav.thought,       href: '#insights' },
    { label: t.nav.forum,         href: '#record' },
    { label: t.nav.academy,       href: '#training' },
    { label: t.ui.harvicsNav,     href: '#harvics' },
    { label: t.ui.intelligenceNav, href: '#intelligence' },
    { label: t.nav.contact,       href: '#contact' },
  ]
  const [scrolled, setScrolled]   = useState(false)
  const [progress, setProgress]   = useState(0)
  const [active, setActive]       = useState('hero')
  const [classic, setClassic]     = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('mian_classic') === 'true'
  })
  const [lightMode, setLightMode] = useState(false)
  const [underline, setUnderline] = useState({ left: 0, width: 0 })
  const [menuOpen, setMenuOpen]   = useState(false)

  const MILESTONES = [25, 50, 75, 100]

  const progressAnnounce = useRef<HTMLSpanElement>(null)
  const lastMilestone    = useRef(0)
  const linkRefs         = useRef<Record<string, HTMLAnchorElement | null>>({})
  const navRef           = useRef<HTMLUListElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('classic-view', classic)
  }, [classic])

  const toggleLightMode = useCallback(() => {
    setLightMode(prev => {
      const next = !prev
      document.documentElement.classList.toggle('light-mode', next)
      return next
    })
  }, [])

  const toggleClassic = useCallback(() => {
    setClassic(prev => {
      const next = !prev
      localStorage.setItem('mian_classic', String(next))
      document.documentElement.classList.toggle('classic-view', next)
      return next
    })
  }, [])

  // Scroll — progress + active section
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 40)
      const pct = docH > 0 ? (scrollTop / docH) * 100 : 0
      setProgress(pct)

      // Aria-live milestone announcements
      for (const m of MILESTONES) {
        if (pct >= m && lastMilestone.current < m) {
          lastMilestone.current = m
          if (progressAnnounce.current)
            progressAnnounce.current.textContent = `${m}% of page read`
        }
      }

      // Active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Underline morph — measure active link position
  useEffect(() => {
    const navEl = navRef.current
    if (!navEl) return
    const update = () => {
      const anchorEl = linkRefs.current[active]
      if (!anchorEl) return
      const navRect  = navEl.getBoundingClientRect()
      const linkRect = anchorEl.getBoundingClientRect()
      setUnderline({ left: linkRect.left - navRect.left, width: linkRect.width })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(navEl)
    return () => ro.disconnect()
  }, [active])

  return (
    <header
      className="header"
      role="banner"
      style={{
        borderBottomColor: scrolled ? 'var(--color-border)' : 'transparent',
        flexDirection: 'column',
        height: 'auto',
        padding: 0,
      }}
    >
      {/* Visually-hidden aria-live for progress milestones */}
      <span
        ref={progressAnnounce}
        aria-live="polite"
        aria-atomic="true"
        style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}
      />

      {/* Main nav row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0 var(--section-pad-x)',
        height: 'var(--header-h)',
        gap: 'var(--space-8)',
      }}>
        {/* Brand */}
        <Link
          href="#hero"
          aria-label="Mian Muhammad Usman — home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            textDecoration: 'none',
            flexShrink: 0,
            marginRight: 'var(--space-4)',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: '32px', height: '32px',
            borderRadius: '50%',
            background: 'var(--color-gold-dim)',
            border: '1px solid var(--color-gold-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Image
              src="/images/hero.webp"
              alt="Mian Muhammad Usman"
              aria-hidden="true"
              fill
              sizes="56px"
              loading="lazy"
              style={{ objectFit: 'cover', filter: 'grayscale(0.3)' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left'
          }}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}>
              Mian Muhammad Usman
            </div>

          </div>
        </Link>

        {/* Nav with underline morph — hidden on mobile */}
        <nav aria-label="Primary navigation" className="header-nav-desktop" style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ul
            ref={navRef}
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              listStyle: 'none',
              overflow: 'auto',
              flexWrap: 'nowrap',
              position: 'relative',
              paddingBottom: '3px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {navLinks.map(l => {
              const id = l.href.replace('#', '')
              const isActive = active === id
              return (
                <li key={l.href} style={{ flexShrink: 0 }}>
                  <a
                    ref={el => { linkRefs.current[id] = el }}
                    href={l.href}
                    aria-current={isActive ? 'location' : undefined}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      fontWeight: 300,
                      color: isActive ? 'var(--color-text-secondary)' : 'var(--color-text-ghost)',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      display: 'block',
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}

            {/* Morphing gold underline */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: `${underline.left}px`,
                width: `${underline.width}px`,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, var(--color-gold) 20%, var(--color-gold) 80%, transparent 100%)',
                transition: 'left 240ms var(--ease-settle, cubic-bezier(0.34,1.56,0.64,1)), width 240ms var(--ease-settle, cubic-bezier(0.34,1.56,0.64,1))',
                pointerEvents: 'none',
              }}
            />
          </ul>
        </nav>

        {/* Light / Dark toggle */}
        <button
          onClick={toggleLightMode}
          aria-pressed={lightMode}
          aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
          style={{
            flexShrink: 0,
            background: 'transparent',
            border: `1px solid ${lightMode ? 'var(--color-gold-dim)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: '5px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            lineHeight: 1,
            color: lightMode ? 'var(--color-gold)' : 'var(--color-text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {lightMode ? '☀︎' : '◐'}
        </button>

        {/* Classic View toggle */}
        <button
          onClick={toggleClassic}
          aria-pressed={classic}
          aria-label={classic ? 'Classic View on — click to restore motion' : 'Classic View off — click to disable motion'}
          className="header-classic-toggle"
          style={{
            flexShrink: 0,
            background: 'transparent',
            border: `1px solid ${classic ? 'var(--color-gold-dim)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: '5px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: classic ? 'var(--color-gold)' : 'var(--color-text-ghost)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          ◈ Classic
        </button>

        {/* Restricted Briefing Gate */}
        <BriefingGate />

        {/* La Vivid Work Button */}
        <Link
          href="/la-vinda"
          aria-label="La Vivid Work"
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(200,160,96,0.08)',
            border: '1px solid rgba(200,160,96,0.3)',
            borderRadius: '3px',
            padding: '5px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s, border-color 0.2s',
            whiteSpace: 'nowrap',
            fontWeight: 400,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(200,160,96,0.16)'
            e.currentTarget.style.borderColor = 'rgba(200,160,96,0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(200,160,96,0.08)'
            e.currentTarget.style.borderColor = 'rgba(200,160,96,0.3)'
          }}
        >
          <span style={{ fontSize: '0.7rem' }}>⌇</span>
          LA VIVID WORK
        </Link>

        {/* PKT Clock */}
        <span className="header-clock"><VintageClock size={46} /></span>

        {/* CTA */}
        <a
          href="#contact"
          className="btn btn-primary header-cta"
          style={{ flexShrink: 0, padding: '8px 20px', fontSize: '0.72rem' }}
        >
          Contact
        </a>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Hamburger — visible only on mobile */}
        <button
          className={`header-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile navigation overlay */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        {navLinks.map(l => {
          const id = l.href.replace('#', '')
          return (
            <a
              key={l.href}
              href={l.href}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          )
        })}
        <a href="#contact" onClick={() => setMenuOpen(false)} style={{ marginTop: 'var(--space-4)', color: 'var(--color-gold)' }}>
          {t.nav.contact}
        </a>
      </nav>

      {/* Gold Edge Progress bar — no layout shift, rAF-driven */}
      <div
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        id="scroll-progress"
        style={{
          height: '1.5px',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #7a6640 0%, #c8a96e 35%, #eed9a4 55%, #c8a96e 75%, #7a6640 100%)',
          backgroundSize: '200% 100%',
          alignSelf: 'flex-start',
          animation: 'progressPulse 2.5s ease-in-out infinite',
          transition: 'width 80ms linear',
          willChange: 'width',
        }}
      />
    </header>
  )
}
