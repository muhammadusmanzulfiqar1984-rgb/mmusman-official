'use client'
import { useEffect, useRef, useState } from 'react'

// Intent Heat Hints — after 8s of idle, a ghost cursor points to the
// next suggested action. A small badge explains "Hint".
// Hides on any interaction.

const IDLE_MS = 8000

// Priority targets in order
const HINT_TARGETS = ['#work', '#contact', '.btn-primary', 'a[href="#contact"]']

export default function IntentHints() {
  const [hint, setHint] = useState<{ x: number; y: number } | null>(null)
  const idleTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shown       = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (document.documentElement.classList.contains('classic-view')) return

    const resetIdle = () => {
      if (shown.current) return
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(showHint, IDLE_MS)
    }

    const showHint = () => {
      shown.current = true
      // Find next visible target
      for (const sel of HINT_TARGETS) {
        const el = document.querySelector<HTMLElement>(sel)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.top > 0) {
          setHint({ x: rect.left + rect.width * 0.4, y: rect.top + rect.height / 2 })
          break
        }
      }
      // Auto-hide after 4s
      setTimeout(hide, 4000)
    }

    const hide = () => { setHint(null); shown.current = false; resetIdle() }

    const onActivity = () => { if (shown.current) hide(); else resetIdle() }

    window.addEventListener('mousemove',  onActivity, { passive: true })
    window.addEventListener('keydown',    onActivity)
    window.addEventListener('scroll',     onActivity, { passive: true })
    window.addEventListener('click',      onActivity)

    resetIdle()

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      window.removeEventListener('mousemove',  onActivity)
      window.removeEventListener('keydown',    onActivity)
      window.removeEventListener('scroll',     onActivity)
      window.removeEventListener('click',      onActivity)
    }
  }, [])

  if (!hint) return null

  return (
    <div
      className="intent-hint"
      aria-hidden="true"
      style={{ left: `${hint.x - 20}px`, top: `${hint.y - 14}px`, opacity: 1 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
      <span className="intent-hint-badge">Hint</span>
    </div>
  )
}
