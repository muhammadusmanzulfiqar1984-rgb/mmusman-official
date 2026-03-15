'use client'
import { useRef, useCallback, useEffect } from 'react'

interface Props {
  children: React.ReactNode
  /** Maximum displacement in px (default 8) */
  strength?: number
  className?: string
  style?: React.CSSProperties
}

// Wraps any interactive child (button, anchor) with a magnetic pull.
// The wrapper nudges ±strength px toward the cursor — spring-animated via RAF.
// Returns to origin when the cursor leaves (spring overshoots slightly).

export default function MagneticButton({ children, strength = 8, className, style }: Props) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number | undefined>(undefined)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const hovered   = useRef(false)

  const animate = useCallback(() => {
    const tx = targetRef.current.x
    const ty = targetRef.current.y
    const cx = currentRef.current.x
    const cy = currentRef.current.y

    currentRef.current.x = cx + (tx - cx) * 0.12
    currentRef.current.y = cy + (ty - cy) * 0.12

    if (wrapRef.current) {
      wrapRef.current.style.transform =
        `translate(${currentRef.current.x.toFixed(2)}px, ${currentRef.current.y.toFixed(2)}px)`
    }

    // Stop when settled (not hovered and close to origin)
    if (!hovered.current && Math.abs(currentRef.current.x) < 0.05 && Math.abs(currentRef.current.y) < 0.05) {
      if (wrapRef.current) wrapRef.current.style.transform = ''
      return
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  const startRAF = useCallback(() => {
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(animate)
  }, [animate])

  const onMouseEnter = useCallback(() => {
    hovered.current = true
    startRAF()
  }, [startRAF])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    targetRef.current = {
      x: ((e.clientX - cx) / (rect.width  / 2)) * strength,
      y: ((e.clientY - cy) / (rect.height / 2)) * strength,
    }
  }, [strength])

  const onMouseLeave = useCallback(() => {
    hovered.current    = false
    targetRef.current  = { x: 0, y: 0 }
    // Keep RAF running so spring can return to origin
    startRAF()
  }, [startRAF])

  // Cleanup on unmount
  useEffect(() => () => {
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform', ...style }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
