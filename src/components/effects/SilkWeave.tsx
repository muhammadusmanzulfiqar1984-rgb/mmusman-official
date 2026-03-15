'use client'
import { useEffect, useRef } from 'react'

// Silk Gold Weave — low-contrast crosshatch texture that parallaxes at 0.02–0.06x
// scroll speed. CSS conic/linear gradients as the texture; rAF drives the Y offset.
// Paused under reduced-motion and classic-view.

export default function SilkWeave() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (document.documentElement.classList.contains('classic-view')) return

    let raf: number
    let scrollY = 0
    let current = 0

    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    const render = () => {
      // Lerp toward target for butter-smooth parallax
      current += (scrollY * 0.04 - current) * 0.06
      if (ref.current) {
        ref.current.style.transform = `translateY(${current.toFixed(2)}px)`
      }
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      id="silk-weave"
      ref={ref}
      aria-hidden="true"
    />
  )
}
