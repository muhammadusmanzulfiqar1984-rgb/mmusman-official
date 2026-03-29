content = """\
'use client'
import { useEffect } from 'react'

const SECTION_IDS = ['hero','about','work','insights','speaking','training','talks','skillscape','media','truth','contact']

export default function DevOverlay() {
  useEffect(() => {
    document.querySelectorAll('[data-dev-marker],[data-dev-trial]').forEach(el => el.remove())

    const measure = () => {
      window.scrollTo(0, 0)
      setTimeout(() => {
        const header = document.querySelector('header')
        const headerH = header ? Math.round(header.getBoundingClientRect().height) : 0
        const report: Record<string, unknown> = {
          '00_screen':   `${window.screen.width} x ${window.screen.height}`,
          '00_viewport': `${window.innerWidth} x ${window.innerHeight}`,
          '00_pageH':    document.documentElement.scrollHeight,
          '00_headerH':  headerH,
        }
        SECTION_IDS.forEach(id => {
          const el = document.getElementById(id)
          if (!el) { report[id] = 'NOT FOUND'; return }
          const r = el.getBoundingClientRect()
          report[id] = { top: Math.round(r.top + window.scrollY), bottom: Math.round(r.bottom + window.scrollY), height: Math.round(r.height), width: Math.round(r.width) }
        })
        console.log('%c=== DEV AUDIT — SECTION MEASUREMENTS ===', 'background:#00ff00;color:#000;font-weight:bold;font-size:13px;padding:4px 8px;')
        console.table(report)
      }, 500)
    }

    if (document.readyState === 'complete') measure()
    else window.addEventListener('load', measure, { once: true })
  }, [])

  return null
}
"""

with open('src/components/effects/DevOverlay.tsx', 'w') as f:
    f.write(content)
print('done')
