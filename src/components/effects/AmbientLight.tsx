'use client'
import { useEffect, useRef, useState } from 'react'

/*
  Three ambient lighting effects:
  1. Section entry lighting  — radial bloom appears when section enters viewport
  3. Gold ambient pulse      — slow breathing warm glow on the page background
  4. Cursor light            — warm radial follows the cursor across dark sections
*/

export default function AmbientLight() {
  /* ── Cursor position ── */
  const [cursor, setCursor] = useState({ x: -999, y: -999, visible: false })
  const frameRef = useRef<number>(0)
  const rawRef   = useRef({ x: -999, y: -999 })

  /* ── Section entry bloom ── */
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    /* Reduced motion — skip everything */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* ── Cursor tracking (rAF throttled) ── */
    const onMove = (e: MouseEvent) => {
      rawRef.current = { x: e.clientX, y: e.clientY }
    }
    const onEnter = () => setCursor(c => ({ ...c, visible: true }))
    const onLeave = () => setCursor(c => ({ ...c, visible: false }))

    const tick = () => {
      setCursor(c => ({
        x: c.x + (rawRef.current.x - c.x) * 0.08,
        y: c.y + (rawRef.current.y - c.y) * 0.08,
        visible: c.visible,
      }))
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    /* ── Section entry observer ── */
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.intersectionRatio >= 0.15) {
            setActiveSection((e.target as HTMLElement).id)
          }
        })
      },
      { threshold: 0.15 }
    )
    sections.forEach(s => sectionObserver.observe(s))

    return () => {
      cancelAnimationFrame(frameRef.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <>
      {/* ── Effect 4: Cursor light — fixed, follows mouse ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:            0,
          left:           0,
          width:         '320px',
          height:        '320px',
          borderRadius:  '50%',
          background:    'radial-gradient(circle, rgba(200,158,80,0.07) 0%, rgba(200,158,80,0.03) 40%, transparent 70%)',
          transform:     `translate(${cursor.x - 160}px, ${cursor.y - 160}px)`,
          opacity:        cursor.visible ? 1 : 0,
          pointerEvents: 'none',
          zIndex:         9990,
          willChange:    'transform',
          transition:    'opacity 600ms ease',
          mixBlendMode:  'screen',
        }}
      />

      {/* ── Effect 1: Section entry bloom — tied to active section ── */}
      {activeSection && (
        <div
          key={activeSection}
          aria-hidden="true"
          style={{
            position:      'fixed',
            inset:          0,
            background:    'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(180,138,60,0.045) 0%, transparent 70%)',
            opacity:        1,
            pointerEvents: 'none',
            zIndex:         9985,
            animation:     'sectionBloom 1.2s cubic-bezier(0.4,0,0.2,1) forwards',
            willChange:    'opacity',
          }}
        />
      )}

      {/* ── Effect 3: Global ambient pulse — very slow breath ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:          0,
          background:    'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(190,148,70,0.028) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex:         9980,
          animation:     'ambientPulse 7s ease-in-out infinite',
          willChange:    'opacity',
        }}
      />

      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes sectionBloom {
          0%   { opacity: 0; transform: scale(0.85); }
          35%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0.6; transform: scale(1); }
        }
        @keyframes ambientPulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1;   }
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-light-root { display: none !important; }
        }
      `}</style>
    </>
  )
}
