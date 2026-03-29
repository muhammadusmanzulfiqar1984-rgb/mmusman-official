'use client'
import { useEffect, useRef } from 'react'

// Holographic card effect — rainbow cursor sheen, desktop only
export function useHoloCard() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const mx = (x / rect.width)  * 100
      const my = (y / rect.height) * 100
      const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI)
      const tiltX = ((y / rect.height) - 0.5) * -8
      const tiltY = ((x / rect.width)  - 0.5) *  8
      el.style.setProperty('--mx', `${mx}%`)
      el.style.setProperty('--my', `${my}%`)
      el.style.setProperty('--holo-angle', `${angle}deg`)
      el.style.setProperty('--holo-opacity', '1')
      el.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
    }
    const onLeave = () => {
      el.style.setProperty('--holo-opacity', '0')
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}

// CSS to paste into globals.css (or use inline via className)
// .holo-card has ::before (shine) and ::after (rainbow) pseudo-elements
export function HoloCard({ children, className = '', style = {} }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useHoloCard()

  return (
    <div
      ref={ref}
      className={`holo-card ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        '--holo-opacity': '0',
        ...style,
      } as React.CSSProperties}
    >
      {/* Shine layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(200,169,110,0.18) 0%, transparent 65%)',
          opacity: 'var(--holo-opacity)',
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'overlay',
          zIndex: 1,
        }}
      />
      {/* Rainbow layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: 'conic-gradient(from var(--holo-angle, 0deg), transparent 20%, rgba(200,169,110,0.06) 40%, rgba(180,120,200,0.06) 60%, rgba(100,180,220,0.06) 80%, transparent 100%)',
          opacity: 'var(--holo-opacity)',
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        }}
      />
      {children}
    </div>
  )
}
