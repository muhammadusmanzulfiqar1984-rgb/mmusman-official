'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Stat {
  label: string
  target: number
  suffix: string
}

interface Section {
  id: string
  title: string
  eyebrow?: string
  description?: string
  image?: string
  stats?: Stat[]
}

const TEXTILE_SECTIONS: Section[] = [
  {
    id: 'hero',
    eyebrow: 'Harvics Global Ventures',
    title: 'Built for the Complexity of Global Trade',
    description: 'End-to-end supply chain command and intelligence at scale.',
    image: '/textile-project/1_Harvics-Global-Ventures.png',
  },
  {
    id: 'who-we-are',
    eyebrow: 'Our Foundation',
    title: 'From Source to Shore',
    description: 'We control the entire supply chain. Global reach, local execution.',
    image: '/textile-project/4_From-Source-to-Shore-We-Control-the-Chain.png',
  },
  {
    id: 'principles',
    eyebrow: 'Core Values',
    title: 'Three Operating Principles',
    description: 'Speed, Intelligence, Responsibility — aligned across every operation.',
    image: '/textile-project/3_Our-Principles.png',
  },
  {
    id: 'speed',
    eyebrow: 'Execution',
    title: 'Speed as Competitive Advantage',
    description: '24/7 execution visibility and just-in-time supply chain command.',
    image: '/textile-project/7_Speed.png',
  },
  {
    id: 'digital',
    eyebrow: 'Technology',
    title: 'Intelligence at the Core',
    description: 'Digital-first supply chain orchestration and predictive intelligence.',
    image: '/textile-project/8_Intelligence-at-the-Core.png',
  },
  {
    id: 'sustainability',
    eyebrow: 'Responsibility',
    title: 'Responsible Trade at Scale',
    description: 'Compliance, audit, and ethical sourcing embedded in every workflow.',
    image: '/textile-project/9_Responsible-Trade-at-Scale.png',
  },
  {
    id: 'service-coverage',
    eyebrow: 'Services',
    title: 'Service Coverage Across the Value Chain',
    description: 'From raw materials to finished goods distribution.',
    image: '/textile-project/11_Service-Coverage-Across-the-Value-Chain.png',
  },
  {
    id: 'product-portfolio',
    eyebrow: 'Portfolio',
    title: 'Our Product Lines',
    description: 'Leather, Knit, Sportswear, Denim, Chino, Footwear, and Home Textile.',
    image: '/textile-project/12_Our-Product-Portfolio.png',
  },
  {
    id: 'global-network',
    eyebrow: 'Scale',
    title: 'A Global Network of Trust',
    description: '18+ markets, 120+ factory partners, unified command structure.',
    image: '/textile-project/16_A-Global-Network-of-Trust.png',
  },
]

const STATS: Stat[] = [
  { label: 'Global Markets', target: 18, suffix: '+' },
  { label: 'Factory Partners', target: 120, suffix: '+' },
  { label: 'Execution Visibility', target: 24, suffix: '/7' },
  { label: 'On-Time Delivery', target: 99, suffix: '%' },
]

export default function TextilePage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [counters, setCounters] = useState<Record<string, number>>({})

  useEffect(() => {
    STATS.forEach(stat => {
      setCounters(prev => ({ ...prev, [stat.label]: 0 }))
    })

    const timers = STATS.map(stat => {
      let current = 0
      const step = Math.ceil(stat.target / 40)
      return setInterval(() => {
        current = Math.min(current + step, stat.target)
        setCounters(prev => ({ ...prev, [stat.label]: current }))
      }, 35)
    })

    return () => timers.forEach(timer => clearInterval(timer))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = TEXTILE_SECTIONS.map(s => {
        const el = document.getElementById(s.id)
        if (!el) return null
        const rect = el.getBoundingClientRect()
        return { id: s.id, top: rect.top }
      }).filter(Boolean)

      const active = sections.find(s => s && s.top > -300 && s.top < window.innerHeight / 2)
      if (active) setActiveSection(active.id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 'var(--header-h)',
          zIndex: 40,
          borderBottom: `1px solid var(--color-border-soft)`,
          background: 'rgba(16, 11, 8, 0.92)',
          backdropFilter: 'blur(12px)',
          padding: 'var(--space-4) var(--section-pad-x)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gold)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
            Harvics Global Ventures
          </p>
          <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: 'var(--space-3)' }}>
            Textile Intelligence Archive
          </h1>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        borderBottom: `1px solid var(--color-border-soft)`,
        padding: 'var(--space-8) var(--section-pad-x)',
        background: 'linear-gradient(180deg, rgba(200,160,96,0.04) 0%, transparent 100%)',
      }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-8)' }}>
          {STATS.map(stat => (
            <div key={stat.label}>
              <p style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-2)', fontWeight: 500 }}>
                {counters[stat.label] || 0}{stat.suffix}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-wide)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        {TEXTILE_SECTIONS.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            style={{
              paddingBottom: 'var(--section-pad-y)',
              marginBottom: 'var(--section-pad-y)',
              borderBottom: idx < TEXTILE_SECTIONS.length - 1 ? `1px solid var(--color-border-soft)` : 'none',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
              <div>
                {section.eyebrow && (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gold)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>
                    {section.eyebrow}
                  </p>
                )}
                <h2 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-6)', fontWeight: 300 }}>
                  {section.title}
                </h2>
                {section.description && (
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)' }}>
                    {section.description}
                  </p>
                )}
              </div>
              {section.image && (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{
        borderTop: `1px solid var(--color-border-soft)`,
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(200,160,96,0.04) 100%)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          Restricted Circulation — Authorised Recipients Only
        </p>
        <a
          href="/textile-project/Harvics-Global-Ventures.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: 'var(--space-3) var(--space-6)',
            background: 'linear-gradient(135deg, var(--color-gold-bright), var(--color-gold))',
            color: '#0a0a0a',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            letterSpacing: 'var(--tracking-wide)',
            textTransform: 'uppercase',
            borderRadius: 'var(--radius-full)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'transform var(--duration-fast) var(--ease-out)',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Download Full Dossier
        </a>
      </div>
    </div>
  )
}
