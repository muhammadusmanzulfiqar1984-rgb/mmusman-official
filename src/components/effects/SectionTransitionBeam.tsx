'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Beam {
  id: number
  top: number
}

let _beamId = 0

// Fires a 1px metallic-gold beam that shoots left→right once per section
// as it enters the viewport. Rendered via portal at fixed viewport position.
// Each section fires at most once per page load.

export default function SectionTransitionBeam() {
  const [beams,   setBeams]   = useState<Beam[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const fired = new Set<string>()

    const fire = (viewportTop: number) => {
      const id = _beamId++
      setBeams(prev => [...prev, { id, top: viewportTop }])
      // Remove beam after animation completes
      setTimeout(() => setBeams(prev => prev.filter(b => b.id !== id)), 900)
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const sectionId = (entry.target as HTMLElement).id
          if (!entry.isIntersecting || fired.has(sectionId)) return
          fired.add(sectionId)
          const top = entry.target.getBoundingClientRect().top
          // Only fire when section top is in a sensible viewport range
          if (top >= -20 && top < window.innerHeight) fire(top)
        })
      },
      { threshold: 0.05, rootMargin: '-5% 0px -65% 0px' }
    )

    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  if (!mounted) return null

  return createPortal(
    <>
      {beams.map(b => (
        <div
          key={b.id}
          aria-hidden="true"
          style={{
            position:        'fixed',
            top:             `${b.top}px`,
            left:            0,
            right:           0,
            height:          '1px',
            background:      'linear-gradient(90deg, transparent 0%, #a09080 5%, #d4c9b8 28%, #f5f0e8 50%, #d4c9b8 72%, #a09080 95%, transparent 100%)',
            transformOrigin: 'left center',
            animation:       'beamShoot 0.72s cubic-bezier(0.22,1,0.36,1) forwards',
            pointerEvents:   'none',
            zIndex:          500,
            boxShadow:       '0 0 8px 1px rgba(245,240,232,0.45)',
          }}
        />
      ))}
    </>,
    document.body
  )
}
