'use client'
import { useEffect } from 'react'

// Glass Phobic Tension — panels gently repel away from the cursor.
// Applied to all .glass elements via a JS spring simulation.
// Pure transform — no layout thrash, no paint.

const REPEL_RADIUS = 160   // px — zone where tension starts
const REPEL_FORCE  = 10    // max translation in px
const SPRING_K     = 0.12  // spring stiffness
const DAMPING      = 0.72  // velocity damping

interface SpringState {
  el: HTMLElement
  vx: number; vy: number
  ox: number; oy: number  // current offset
  tx: number; ty: number  // target offset
}

export function useGlassPhobic() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const springs: SpringState[] = []
    let raf: number

    const collect = () => {
      springs.length = 0
      document.querySelectorAll<HTMLElement>('.glass, .card').forEach(el => {
        springs.push({ el, vx: 0, vy: 0, ox: 0, oy: 0, tx: 0, ty: 0 })
      })
    }
    collect()
    // Re-collect on DOM changes (new sections mount)
    const obs = new MutationObserver(collect)
    obs.observe(document.body, { childList: true, subtree: true })

    const mouse = { x: -999, y: -999 }
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    const simulate = () => {
      springs.forEach(s => {
        const rect = s.el.getBoundingClientRect()
        const cx   = rect.left + rect.width  / 2
        const cy   = rect.top  + rect.height / 2
        const dx   = mouse.x - cx
        const dy   = mouse.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          // Repulsion — push panel away from cursor
          const strength = (1 - dist / REPEL_RADIUS) * REPEL_FORCE
          s.tx = -(dx / dist) * strength
          s.ty = -(dy / dist) * strength
        } else {
          // Return to rest
          s.tx = 0
          s.ty = 0
        }

        // Spring integration
        s.vx = (s.vx + (s.tx - s.ox) * SPRING_K) * DAMPING
        s.vy = (s.vy + (s.ty - s.oy) * SPRING_K) * DAMPING
        s.ox += s.vx
        s.oy += s.vy

        // Only update DOM when movement is non-trivial
        if (Math.abs(s.vx) > 0.001 || Math.abs(s.vy) > 0.001) {
          s.el.style.transform = `translate(${s.ox.toFixed(2)}px, ${s.oy.toFixed(2)}px)`
          s.el.style.willChange = 'transform'
        }
      })

      raf = requestAnimationFrame(simulate)
    }
    raf = requestAnimationFrame(simulate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      obs.disconnect()
      // Clean up transforms
      springs.forEach(s => { s.el.style.transform = ''; s.el.style.willChange = '' })
    }
  }, [])
}

// Inertial hover — elements drift to rest after pointer exits
// Applied via CSS + data attribute set by JS
export function useInertialHover() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = document.querySelectorAll<HTMLElement>('.card, .btn, .pill')
    els.forEach(el => {
      let vx = 0, vy = 0, ox = 0, oy = 0
      let raf: number
      let hovering = false

      const onEnter = (e: MouseEvent) => {
        hovering = true
        const rect = el.getBoundingClientRect()
        const mx = e.clientX - rect.left - rect.width  / 2
        const my = e.clientY - rect.top  - rect.height / 2
        vx += mx * 0.012
        vy += my * 0.012
      }

      const onLeave = () => { hovering = false }

      const drift = () => {
        vx *= 0.82; vy *= 0.82
        ox += vx;   oy += vy
        if (Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01 && !hovering) {
          ox = 0; oy = 0
          el.style.transform = ''
          return
        }
        el.style.transform = `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px)`
        raf = requestAnimationFrame(drift)
      }

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      el.addEventListener('mousemove', (e: MouseEvent) => {
        if (!hovering) return
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(drift)
      })
    })
  }, [])
}
