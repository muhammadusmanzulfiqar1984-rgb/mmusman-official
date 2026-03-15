'use client'
import { useEffect } from 'react'

// Depth Gradient Breathing — hero background hue shifts 1–2° per second.
// Updates --hero-hue-shift CSS var via rAF with damping.
// Stops on pointer interaction to avoid fighting user attention.

export default function DepthBreathing() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (document.documentElement.classList.contains('classic-view')) return

    let raf: number
    let t = 0
    let paused = false
    let pauseTimer: ReturnType<typeof setTimeout>

    const onInteract = () => {
      paused = true
      clearTimeout(pauseTimer)
      pauseTimer = setTimeout(() => { paused = false }, 2000)
    }

    window.addEventListener('mousemove',  onInteract, { passive: true })
    window.addEventListener('touchstart', onInteract, { passive: true })
    window.addEventListener('keydown',    onInteract, { passive: true })

    const tick = () => {
      if (!paused) {
        t += 0.0008 // ~1.5° per second (sin amplitude ±2)
        const hue = Math.sin(t) * 2
        document.documentElement.style.setProperty('--hero-hue-shift', `${hue.toFixed(3)}deg`)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(pauseTimer)
      window.removeEventListener('mousemove',  onInteract)
      window.removeEventListener('touchstart', onInteract)
      window.removeEventListener('keydown',    onInteract)
      document.documentElement.style.removeProperty('--hero-hue-shift')
    }
  }, [])

  return null
}
