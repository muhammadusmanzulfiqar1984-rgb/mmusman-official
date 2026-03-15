'use client'
import { useEffect, useRef } from 'react'

// Micro-Pulse Indicators — tiny gold dot that pulses once on first visit
// near interactive elements (.btn-primary, [href="#contact"]).
// Silenced for one week via localStorage.

const PULSE_KEY   = 'mian_pulse_seen'
const SILENCE_DAYS = 7

export default function MicroPulse() {
  const dotsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Check if already silenced
    const seen = localStorage.getItem(PULSE_KEY)
    if (seen) {
      const sinceMs = Date.now() - parseInt(seen, 10)
      if (sinceMs < SILENCE_DAYS * 86400000) return
    }

    // Reduced motion / classic view skip
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (document.documentElement.classList.contains('classic-view')) return

    // requestIdleCallback to avoid blocking
    const schedule = (cb: () => void) =>
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(cb, { timeout: 2000 })
        : setTimeout(cb, 400)

    schedule(() => {
      const targets = document.querySelectorAll<HTMLElement>('.btn-primary, a[href="#contact"]')
      const added: HTMLDivElement[] = []

      targets.forEach(el => {
        const parent = el.parentElement
        if (!parent) return

        const dot = document.createElement('div')
        dot.className = 'pulse-dot'
        dot.setAttribute('aria-hidden', 'true')
        dot.style.cssText = `
          position: absolute;
          top: -3px; right: -3px;
          z-index: 10;
        `
        // Make parent relative if it isn't
        const pos = getComputedStyle(parent).position
        if (pos === 'static') parent.style.position = 'relative'
        parent.appendChild(dot)
        added.push(dot)
      })

      dotsRef.current = added

      // Silence after 1.6s
      setTimeout(() => {
        added.forEach(d => d.remove())
        localStorage.setItem(PULSE_KEY, String(Date.now()))
      }, 1600)
    })

    return () => {
      dotsRef.current.forEach(d => d.remove())
    }
  }, [])

  return null
}
