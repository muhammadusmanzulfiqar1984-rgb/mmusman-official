'use client'
import { useEffect } from 'react'

// Dims all section[id] elements to 0.35 opacity except the one currently
// most visible in the viewport. Arms only after user scrolls past #hero.
// Deactivates under reduced-motion and classic-view.

export default function FocusNarrow() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (document.documentElement.classList.contains('classic-view')) return

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>('section[id]'))

    let activeId: string | null = null
    let armed = false

    const apply = (sections: HTMLElement[], focusId: string | null) => {
      sections.forEach(s => {
        s.style.transition = 'opacity 0.9s ease'
        if (!focusId || s.id === focusId) {
          s.style.opacity = ''
        } else {
          s.style.opacity = '0.35'
        }
      })
    }

    const sections = getSections()
    if (!sections.length) return

    const io = new IntersectionObserver(
      entries => {
        // Pick the entry with the highest intersection ratio from this batch
        let best: IntersectionObserverEntry | null = null
        entries.forEach(e => {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        })
        if (!best) return

        const entry   = best as IntersectionObserverEntry
        const section = entry.target as HTMLElement

        // Arm once user leaves hero
        if (section.id !== 'hero' && entry.intersectionRatio > 0.25) armed = true

        if (armed && entry.isIntersecting && section.id !== activeId) {
          activeId = section.id
          apply(getSections(), activeId)
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-12% 0px -12% 0px',
      }
    )

    sections.forEach(s => io.observe(s))

    return () => {
      io.disconnect()
      getSections().forEach(s => {
        s.style.transition = ''
        s.style.opacity    = ''
      })
    }
  }, [])

  return null
}
