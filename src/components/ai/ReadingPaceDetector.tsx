'use client'
import { useEffect } from 'react'

// Measures average scroll velocity over a 3-second sliding window.
// Fast (> 120 px/s) → data-pace="dense"   (tighter section padding)
// Slow (< 30 px/s)  → data-pace="spacious" (more breathing room)
// 2-second debounce + hysteresis prevents thrashing.

const WINDOW_MS = 3000
const FAST_PX_S = 120   // px/s threshold for "skimming"
const SLOW_PX_S = 30    // px/s threshold for "reading carefully"

export default function ReadingPaceDetector() {
  useEffect(() => {
    const events: { t: number; dy: number }[] = []
    let applyTimer: ReturnType<typeof setTimeout> | null = null
    let lastY = window.scrollY

    const onScroll = () => {
      const now = performance.now()
      const dy  = Math.abs(window.scrollY - lastY)
      lastY = window.scrollY
      events.push({ t: now, dy })

      // Cull events outside the measurement window
      const cutoff = now - WINDOW_MS
      while (events.length && events[0].t < cutoff) events.shift()

      if (events.length < 2) return

      const totalDy  = events.reduce((s, e) => s + e.dy, 0)
      const elapsed  = events[events.length - 1].t - events[0].t
      const pxPerSec = (totalDy / Math.max(elapsed, 100)) * 1000

      if (applyTimer) clearTimeout(applyTimer)
      applyTimer = setTimeout(() => {
        const html    = document.documentElement
        const current = html.getAttribute('data-pace')
        if (pxPerSec > FAST_PX_S && current !== 'dense') {
          html.setAttribute('data-pace', 'dense')
        } else if (pxPerSec < SLOW_PX_S && current !== 'spacious') {
          html.setAttribute('data-pace', 'spacious')
        }
      }, 2000)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (applyTimer) clearTimeout(applyTimer)
      document.documentElement.removeAttribute('data-pace')
    }
  }, [])

  return null
}
