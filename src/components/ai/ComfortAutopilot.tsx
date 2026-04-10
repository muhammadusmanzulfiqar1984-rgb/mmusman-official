'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

// Comfort Autopilot — detects rage clicks and scroll oscillation,
// then automatically: increases type scale, reduces density, pauses motion.
// Announces once via aria-live. User can dismiss.

const RAGE_CLICK_THRESHOLD = 4    // clicks in 1 second
const OSCILLATION_THRESHOLD = 6  // direction reversals in 1 second

export default function ComfortAutopilot() {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('mian_comfort') === 'on'
  })
  const [visible, setVisible] = useState(false)
  const announced = useRef(false)
  const monitoringEnabled = useRef(false)
  const clicks = useRef<number[]>([])
  const lastScrollY = useRef(0)
  const reversals = useRef<number[]>([])
  const lastDir = useRef(0)
  const hideTimer = useRef<number | null>(null)

  const activate = useCallback(() => {
    setActive(true)
  }, [])

  const dismiss = useCallback(() => {
    setActive(false)
    setVisible(false)
    announced.current = false

    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }, [])

  const trigger = useCallback(() => {
    if (announced.current) return

    announced.current = true
    activate()
    setVisible(true)

    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current)
    }

    hideTimer.current = window.setTimeout(() => {
      setVisible(false)
      hideTimer.current = null
    }, 6000)
  }, [activate])

  useEffect(() => {
    if (typeof window === 'undefined') return

    document.documentElement.toggleAttribute('data-comfort', active)

    if (active) {
      sessionStorage.setItem('mian_comfort', 'on')
    } else {
      sessionStorage.removeItem('mian_comfort')
    }

    document.querySelectorAll<HTMLCanvasElement>('#gold-wave-canvas, #gold-dust-canvas').forEach((canvas) => {
      canvas.style.opacity = active ? '0' : ''
    })
  }, [active])

  useEffect(() => {
    if (typeof window === 'undefined') return
    lastScrollY.current = window.scrollY

    // Add 15-second delay before monitoring starts
    const delayTimer = setTimeout(() => {
      monitoringEnabled.current = true
    }, 15000)

    const onClick = () => {
      if (!monitoringEnabled.current) return
      const now = Date.now()
      clicks.current.push(now)
      clicks.current = clicks.current.filter(t => now - t < 1000)
      if (clicks.current.length >= RAGE_CLICK_THRESHOLD && !active) trigger()
    }

    const onScroll = () => {
      if (!monitoringEnabled.current) return
      const y = window.scrollY
      const dir = y > lastScrollY.current ? 1 : -1
      if (dir !== lastDir.current) {
        const now = Date.now()
        reversals.current.push(now)
        reversals.current = reversals.current.filter(t => now - t < 1000)
        if (reversals.current.length >= OSCILLATION_THRESHOLD && !active) trigger()
        lastDir.current = dir
      }
      lastScrollY.current = y
    }

    window.addEventListener('click', onClick)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      monitoringEnabled.current = false
      clearTimeout(delayTimer)
      window.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
    }
  }, [active, trigger])

  useEffect(() => {
    return () => {
      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current)
      }
    }
  }, [])

  if (!visible && !active) return null

  return (
    <>
      {/* Aria-live announcement (screen reader) */}
      {visible && (
        <span
          role="status"
          aria-live="polite"
          style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}
        >
          Comfort mode activated. Type scale increased and motion paused.
        </span>
      )}

      {/* Toast notification */}
      {visible && (
        <div
          style={{
            position: 'fixed',
            top: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 400,
            background: 'rgba(10,10,10,0.97)',
            border: '1px solid var(--color-gold-dim)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backdropFilter: 'blur(20px)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--color-gold)' }}>
            Comfort mode on
          </span>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--color-text-muted)', fontWeight:300 }}>
            Type enlarged, motion paused.
          </span>
          <button
            onClick={dismiss}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '3px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.52rem',
              letterSpacing: '0.08em',
              color: 'var(--color-text-ghost)',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Restore
          </button>
        </div>
      )}
    </>
  )
}
