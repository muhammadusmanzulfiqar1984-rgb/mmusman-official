'use client'
import { useEffect } from 'react'

// After 45s of no interaction: sets window.__mianIdle = true,
// dims all canvas elements (3s fade to 0.3 opacity), and announces via aria-live.
// Resets instantly on any pointer/keyboard/scroll/touch event.

const IDLE_MS = 45_000

declare global {
  interface Window { __mianIdle?: boolean }
}

function setIdleState(idle: boolean) {
  window.__mianIdle = idle
  document.documentElement.setAttribute('data-idle', String(idle))

  document.querySelectorAll<HTMLCanvasElement>('canvas').forEach(c => {
    if (idle) {
      // Save current inline opacity before overriding
      c.dataset.idleSave = c.style.opacity
      c.style.transition = 'opacity 3s ease'
      c.style.opacity    = '0.3'
    } else {
      c.style.transition = 'opacity 0.8s ease'
      c.style.opacity    = c.dataset.idleSave ?? ''
      delete c.dataset.idleSave
    }
  })
}

export default function IdleAmbient() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let announced = false

    const reset = () => {
      clearTimeout(timer)
      if (window.__mianIdle) {
        setIdleState(false)
        announced = false
      }
      timer = setTimeout(() => {
        setIdleState(true)
        if (!announced) {
          announced = true
          const live = document.getElementById('mian-idle-live')
          if (live) live.textContent = 'Ambient mode active. Canvas effects reduced to save power.'
        }
      }, IDLE_MS)
    }

    const EVENTS: (keyof WindowEventMap)[] = [
      'mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'wheel',
    ]
    EVENTS.forEach(ev => window.addEventListener(ev, reset, { passive: true }))
    reset()

    return () => {
      clearTimeout(timer)
      EVENTS.forEach(ev => window.removeEventListener(ev, reset))
      setIdleState(false)
    }
  }, [])

  return (
    <span
      id="mian-idle-live"
      role="status"
      aria-live="polite"
      style={{
        position: 'absolute', width: '1px', height: '1px',
        overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap',
      }}
    />
  )
}
