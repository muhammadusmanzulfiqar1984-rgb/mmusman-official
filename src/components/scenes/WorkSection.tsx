'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HoloCard } from '@/components/effects/HoloCard'
import TokenStream from '@/components/effects/TokenStream'

interface WorkCard { tag: string; title: string }
interface Stat     { value: string; label: string }
interface WorkData { heading: string; subheading: string; cards: WorkCard[]; stats: Stat[] }

function parseStatValue(v: string) {
  const m = v.match(/^(\d+)(.*)$/)
  return m ? { numeric: parseInt(m[1], 10), suffix: m[2] ?? '' } : { numeric: 0, suffix: v }
}

// Single digit slot-machine wheel
function Digit({ d }: { d: string }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', height: '1.05em', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={d}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0,      opacity: 1 }}
          exit={{    y: '-100%', opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'block' }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function CounterBadge({ value, label }: { value: string; label: string }) {
  const { numeric, suffix } = parseStatValue(value)
  const [count, setCount]   = useState(0)
  const rafRef              = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rafRef.current = requestAnimationFrame(() => setCount(numeric))
      return () => cancelAnimationFrame(rafRef.current)
    }
    const cycleDuration = Math.max(2000, numeric * 80) // full 0→N cycle duration ms
    const pauseDuration = 1200                          // pause at target before restarting
    let startTime: number | null = null
    let pausing = false
    let pauseStart = 0

    const tick = (now: number) => {
      if (pausing) {
        if (now - pauseStart >= pauseDuration) {
          pausing = false
          startTime = now
        }
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      const p = Math.min(elapsed / cycleDuration, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * numeric))
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        pausing = true
        pauseStart = now
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [numeric])

  const digits = String(count).split('')

  return (
    <div
      className="card reveal"
      style={{ textAlign: 'left', padding: 'var(--space-8) var(--space-4)' }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-4xl)',
        fontWeight: 300,
        color: 'var(--color-gold)',
        lineHeight: 1,
        letterSpacing: 'var(--tracking-tightest)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        gap: 0,
      }}>
        {digits.map((d, i) => <Digit key={i} d={d} />)}
        {suffix && <span style={{ display: 'inline-block' }}>{suffix}</span>}
      </div>
      <div className="stat-label" style={{ marginTop: 'var(--space-2)' }}>{label}</div>
    </div>
  )
}

export default function WorkSection({ data }: { data: WorkData }) {
  return (
    <section id="work" aria-label="Work and highlights" className="section relative box-border py-[clamp(64px,8vw,100px)] px-[var(--section-pad-x)] border-b-2 border-[var(--color-gold)] text-left">
      <TokenStream />
      <p className="section-label">Work</p>

      <div className="mb-[var(--space-8)]">
        <h2 className="h2 reveal mb-[var(--space-4)]">{data.heading}</h2>
        <p className="body reveal" style={{ maxWidth: '640px' }}>{data.subheading}</p>
      </div>

      {/* Work cards — 3-column grid */}
      <div className="work-cards-grid reveal-stagger reveal mb-[var(--space-12)]">
        {data.cards.map((card, i) => (
          <div key={i} className="spin-border">
          <HoloCard
            className="card card-bevel card-elevate card-reveal-shimmer p-[var(--space-5)] rounded-[var(--radius-md)] border-2 border-[var(--color-gold)] shadow-[0_0_12px_var(--color-gold-glow),0_0_1px_var(--color-gold-dim)] bg-gradient-to-br from-[#1a1200] via-[#3d2c00] via-45% to-[#1a1200]"
          >
            <article aria-label={card.tag}>
              <p className="font-mono text-[var(--text-xs)] tracking-[0.14em] uppercase text-[var(--color-gold)] mb-[var(--space-2)]">
                {card.tag}
              </p>
              <h3 className="font-display text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[1.45] font-light">
                {card.title}
              </h3>
            </article>
          </HoloCard>
          </div>
        ))}
      </div>

      {/* Animated stat counters */}
      {data.stats && data.stats.length > 0 && (
        <>
          <div className="stats-grid reveal">
            {data.stats.map((stat, i) => (
              <CounterBadge key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
        </>
      )}

    </section>
  )
}

