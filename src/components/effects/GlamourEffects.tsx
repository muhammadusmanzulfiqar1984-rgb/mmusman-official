'use client'

import { useEffect, useRef } from 'react'

export function GlowOnScroll() {
  useEffect(() => {
    const glowElements = document.querySelectorAll('[data-glow]')
    glowElements.forEach((el) => {
      const node = el as HTMLElement
      node.style.opacity = '0'
      node.style.transform = 'translateY(10px)'
      node.style.transition = 'opacity 650ms ease, transform 650ms ease, filter 650ms ease'
      node.style.filter = 'drop-shadow(0 0 0 rgba(200,160,96,0))'
    })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const node = entry.target as HTMLElement
          node.style.opacity = '1'
          node.style.transform = 'translateY(0)'
          node.style.filter = 'drop-shadow(0 8px 22px rgba(200,160,96,0.2))'
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
        backdrop-filter: blur(14px);
        background: linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
        border: 1px solid rgba(200, 160, 96, 0.22);
        border-radius: 16px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 28px rgba(0,0,0,0.22);
        transition: all 0.45s cubic-bezier(0.23, 1, 0.320, 1);
      }
      [data-glass]:hover {
        backdrop-filter: blur(22px);
        background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08));
        border-color: rgba(200, 160, 96, 0.48);
        transform: translateY(-6px) scale(1.01);
        box-shadow: 0 26px 56px rgba(200, 160, 96, 0.22), inset 0 1px 0 rgba(255,255,255,0.2);
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
        background: 'radial-gradient(110% 80% at 20% 20%, rgba(210,170,96,0.14) 0%, rgba(210,170,96,0.02) 45%, transparent 70%), radial-gradient(95% 75% at 85% 70%, rgba(126,84,42,0.16) 0%, rgba(126,84,42,0.04) 52%, transparent 76%), linear-gradient(140deg, rgba(16,10,4,0.25) 0%, rgba(12,8,3,0.1) 100%)',
        animation: 'gradient-shift 16s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { opacity: 0.78; transform: scale(1) translateY(0px); }
          50% { opacity: 1; transform: scale(1.03) translateY(-6px); }
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
            .map((w, i) => `<span style="opacity:0;display:inline-block;animation:fadeInUp 0.75s cubic-bezier(0.23,1,0.32,1) ${i * 0.06}s forwards">${w}</span>`)
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
        from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
        to { opacity: 1; transform: translateY(0); filter: blur(0); }
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
        overflow: hidden;
      }
      [data-gold-border]:hover {
        border-bottom-color: rgba(200, 160, 96, 0.8);
      }
      [data-gold-border]::after {
        content: '';
        position: absolute;
        left: -40%;
        bottom: -2px;
        width: 30%;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255,225,160,0.95), transparent);
        opacity: 0;
        transition: transform 0.8s ease, opacity 0.35s ease;
      }
      [data-gold-border]:hover::after {
        opacity: 1;
        transform: translateX(420%);
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
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        parallaxElements.forEach(el => {
          const rect = (el as HTMLElement).getBoundingClientRect()
          const speed = 0.55
          const offset = (window.innerHeight - rect.top) * speed
          ;(el as HTMLElement).style.transform = `translateY(${offset * 0.12}px)`
        })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}

export function HoverGlow() {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('[data-hover-glow]') as HTMLElement | null
      if (!target) return
      const rect = target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      target.style.setProperty('--glow-x', `${x}px`)
      target.style.setProperty('--glow-y', `${y}px`)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
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
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(200,160,96,0.24) 0%, rgba(200,160,96,0.1) 35%, transparent 72%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.28s ease;
          mix-blend-mode: screen;
        }
        [data-hover-glow]:hover::before {
          opacity: 1;
        }
      `}</style>
    </>
  )
}
