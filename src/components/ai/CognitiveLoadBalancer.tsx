'use client'
import { useEffect, useRef, useState } from 'react'

// Cognitive Load Balancer — detects fatigue signals and offers a simplified view
// Signals: rapid scroll, many rage clicks, long dwell without interaction, low battery

type Mode = 'normal' | 'simplified'

const SIGNALS = {
  rapidScrollThreshold:   5,    // scroll events per second
  dwellWithoutInteraction: 90,  // seconds on page without any click
  rageClickThreshold:     3,    // clicks in 1s
}

export function useCognitiveLoadBalancer() {
  const [mode, setMode] = useState<Mode>('normal')
  const [triggered, setTriggered] = useState(false)
  const [monitoringActive, setMonitoringActive] = useState(false)
  const monitoringActiveRef = useRef(false)
  const scrollEvents = useRef<number[]>([])
  const lastClick = useRef<number>(Date.now())
  const rageClicks = useRef<number[]>([])

  // Sync ref with state for event handlers
  useEffect(() => {
    monitoringActiveRef.current = monitoringActive
  }, [monitoringActive])

  useEffect(() => {
    // Add 10-second delay before monitoring starts
    const monitoringDelay = setTimeout(() => {
      setMonitoringActive(true)
    }, 10000)

    // Rapid scroll detection
    const onScroll = () => {
      if (!monitoringActiveRef.current) return
      const now = Date.now()
      scrollEvents.current.push(now)
      scrollEvents.current = scrollEvents.current.filter(t => now - t < 1000)
      if (scrollEvents.current.length >= SIGNALS.rapidScrollThreshold) {
        setTriggered(true)
      }
    }

    // Rage click detection
    const onClick = () => {
      const now = Date.now()
      lastClick.current = now
      if (!monitoringActiveRef.current) return
      rageClicks.current.push(now)
      rageClicks.current = rageClicks.current.filter(t => now - t < 1000)
      if (rageClicks.current.length >= SIGNALS.rageClickThreshold) {
        setTriggered(true)
      }
    }

    // Dwell without interaction
    const dwellTimer = setInterval(() => {
      if (!monitoringActiveRef.current) return
      const inactive = (Date.now() - lastClick.current) / 1000
      if (inactive > SIGNALS.dwellWithoutInteraction) {
        setTriggered(true)
      }
    }, 15000)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('click', onClick)

    return () => {
      clearTimeout(monitoringDelay)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
      clearInterval(dwellTimer)
    }
  }, [])

  const simplify = () => { setMode('simplified'); setTriggered(false) }
  const restore  = () => { setMode('normal'); setTriggered(false) }
  const dismiss  = () => { setTriggered(false) }

  return { mode, triggered, simplify, restore, dismiss }
}

// Banner that appears when fatigue is detected
export function CognitiveLoadPrompt({
  triggered, onSimplify, onDismiss,
}: {
  triggered: boolean
  onSimplify: () => void
  onDismiss: () => void
}) {
  if (!triggered) return null

  return (
    <div
      role="dialog"
      aria-label="Simplified view offer"
      aria-modal="false"
      style={{
        position: 'fixed',
        top: '90px',
        right: '24px',
        zIndex: 350,
        background: 'rgba(10,10,10,0.97)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        maxWidth: '280px',
        backdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-gold)',
        marginBottom: '8px',
      }}>
        Simplified view available
      </p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.78rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
        marginBottom: '12px',
        fontWeight: 300,
      }}>
        Reduce visual complexity — focused reading mode with less motion.
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={onSimplify}
          style={{
            background: 'var(--color-gold)',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontWeight: 300,
          }}
        >
          Simplify
        </button>
        <button
          onClick={onDismiss}
          style={{
            background: 'transparent',
            color: 'var(--color-text-ghost)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}

// Simplified mode toolbar — shown when in simplified mode
export function SimplifiedModeBanner({ onRestore }: { onRestore: () => void }) {
  return (
    <div
      role="status"
      aria-label="Simplified mode active"
      style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 350,
        background: 'rgba(10,10,10,0.95)',
        border: '1px solid var(--color-gold-dim)',
        borderRadius: 'var(--radius-full)',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backdropFilter: 'blur(20px)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-gold)',
      }}>
        Simplified mode
      </span>
      <button
        onClick={onRestore}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--color-text-ghost)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Restore full experience →
      </button>
    </div>
  )
}
