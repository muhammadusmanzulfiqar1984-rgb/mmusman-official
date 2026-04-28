'use client'

import { useEffect, useRef } from 'react'

export function GlowOnScroll() {
  useEffect(() => {
    const glowElements = document.querySelectorAll('[data-glow]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1'
          ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.1 })
    glowElements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}

export function GlassmorphismCards() {
  return (
    <style>{`
      [data-glass] {
        backdrop-filter: blur(12px);
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(200, 160, 96, 0.15);
        border-radius: 16px;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
      }
      [data-glass]:hover {
        backdrop-filter: blur(16px);
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(200, 160, 96, 0.3);
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(200, 160, 96, 0.15);
      }
    `}</style>
  )
}

export function AnimatedGradient() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(200,160,96,0.05) 0%, rgba(120,80,40,0.03) 50%, rgba(200,160,96,0.02) 100%)',
        animation: 'gradient-shift 12s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export function TextRevealOnScroll() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal-text]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const words = (entry.target as HTMLElement).innerText.split(' ')
          const html = words
            .map((w, i) => `<span style="opacity:0;animation:fadeInUp 0.6s ease ${i * 0.08}s forwards">${w}</span>`)
            .join(' ')
          ;(entry.target as HTMLElement).innerHTML = html
        }
      })
    }, { threshold: 0.3 })
    revealElements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <style>{`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  )
}

export function GoldAccents() {
  return (
    <style>{`
      [data-gold-border] {
        position: relative;
        border-bottom: 2px solid rgba(200, 160, 96, 0.3);
        transition: border-color 0.4s ease;
      }
      [data-gold-border]:hover {
        border-bottom-color: rgba(200, 160, 96, 0.8);
      }
      [data-gold-text] {
        background: linear-gradient(120deg, #c8a060 0%, #e8d4a8 50%, #c8a060 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `}</style>
  )
}

export function ParallaxScroll() {
  useEffect(() => {
    const parallaxElements = document.querySelectorAll('[data-parallax]')
    const onScroll = () => {
      parallaxElements.forEach(el => {
        const rect = (el as HTMLElement).getBoundingClientRect()
        const speed = 0.4
        const offset = (window.innerHeight - rect.top) * speed
        ;(el as HTMLElement).style.transform = `translateY(${offset * 0.1}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}

export function HoverGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--glow-x', `${x}px`)
      el.style.setProperty('--glow-y', `${y}px`)
    }

    el.addEventListener('mousemove', onMouseMove)
    return () => el.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      <div ref={ref} style={{ position: 'relative' }} />
      <style>{`
        [data-hover-glow] {
          position: relative;
          overflow: hidden;
        }
        [data-hover-glow]::before {
          content: '';
          position: absolute;
          top: var(--glow-y, 0);
          left: var(--glow-x, 0);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(200,160,96,0.2) 0%, transparent 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        [data-hover-glow]:hover::before {
          opacity: 1;
        }
      `}</style>
    </>
  )
}
