'use client'
import { useEffect } from 'react'

const SECTION_IDS = ['hero','about','work','insights','speaking','training','talks','skillscape','media','truth','contact']

export default function DevOverlay() {
  useEffect(() => {
    document.querySelectorAll('[data-dev-marker],[data-dev-trial]').forEach(el => el.remove())

    const header = document.querySelector('header')
    const headerH = header ? Math.round(header.getBoundingClientRect().height) : 0

    // Green fixed line at header bottom — stays visible always
    const line = document.createElement('div')
    line.setAttribute('data-dev-marker', 'true')
    line.style.cssText = `position:fixed;top:${headerH}px;left:0;width:100%;height:2px;background:#00ff00;z-index:999999;pointer-events:none;`
    const label = document.createElement('span')
    label.style.cssText = `position:absolute;top:2px;left:8px;background:#00ff00;color:#000;font:700 11px/1.5 monospace;padding:2px 8px;white-space:nowrap;`
    label.textContent = `HEADER END | h=${headerH}px — CONTENT STARTS HERE`
    line.appendChild(label)
    document.body.appendChild(line)

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

        // Draw START and END lines for every section
        SECTION_IDS.forEach((id, i) => {
          const el = document.getElementById(id)
          if (!el) return
          const r = el.getBoundingClientRect()
          const topAbs = Math.round(r.top + window.scrollY)
          const botAbs = Math.round(r.bottom + window.scrollY)
          const h = Math.round(r.height)
          const w = Math.round(r.width)
          const num = String(i + 1).padStart(2, '0')

          const sLine = document.createElement('div')
          sLine.setAttribute('data-dev-marker', 'true')
          sLine.style.cssText = `position:absolute;top:${topAbs}px;left:0;width:100%;height:2px;background:#00ff00;z-index:99998;pointer-events:none;`
          const sLabel = document.createElement('span')
          sLabel.style.cssText = `position:absolute;top:2px;left:8px;background:#00ff00;color:#000;font:700 11px/1.5 monospace;padding:2px 8px;white-space:nowrap;`
          sLabel.textContent = `▶ ${num} · ${id.toUpperCase()} START | top=${topAbs}px w=${w}px h=${h}px`
          sLine.appendChild(sLabel)
          document.body.appendChild(sLine)

          const eLine = document.createElement('div')
          eLine.setAttribute('data-dev-marker', 'true')
          eLine.style.cssText = `position:absolute;top:${botAbs}px;left:0;width:100%;height:2px;background:#00ff00;z-index:99998;pointer-events:none;`
          const eLabel = document.createElement('span')
          eLabel.style.cssText = `position:absolute;top:-20px;right:8px;background:#00ff00;color:#000;font:700 11px/1.5 monospace;padding:2px 8px;white-space:nowrap;`
          eLabel.textContent = `■ ${num} · ${id.toUpperCase()} END | bottom=${botAbs}px`
          eLine.appendChild(eLabel)
          document.body.appendChild(eLine)
        })

        // Blue grid lines — rule of thirds per section (vertical + horizontal)
        const vp = window.innerWidth
        const col1 = Math.round(vp / 3)
        const col2 = Math.round((vp / 3) * 2)

        // Vertical third lines — fixed, full page height
        const pageH = document.documentElement.scrollHeight
        ;[col1, col2].forEach((x, i) => {
          const vLine = document.createElement('div')
          vLine.setAttribute('data-dev-marker', 'true')
          vLine.style.cssText = `position:absolute;top:0;left:${x}px;width:1px;height:${pageH}px;background:#0066ff;opacity:0.5;z-index:99997;pointer-events:none;`
          const vLabel = document.createElement('span')
          vLabel.style.cssText = `position:fixed;top:${headerH + 4}px;left:${x + 4}px;background:#0066ff;color:#fff;font:700 10px/1.5 monospace;padding:1px 5px;white-space:nowrap;z-index:99999;pointer-events:none;`
          vLabel.textContent = `${i === 0 ? '1/3' : '2/3'} x=${x}px`
          vLine.appendChild(vLabel)
          document.body.appendChild(vLine)
        })

        // Horizontal third lines — per section
        SECTION_IDS.forEach(id => {
          const el = document.getElementById(id)
          if (!el) return
          const r = el.getBoundingClientRect()
          const topAbs = Math.round(r.top + window.scrollY)
          const h = Math.round(r.height)
          const h1 = Math.round(topAbs + h / 3)
          const h2 = Math.round(topAbs + (h / 3) * 2)

          ;[h1, h2].forEach((y, i) => {
            const hLine = document.createElement('div')
            hLine.setAttribute('data-dev-marker', 'true')
            hLine.style.cssText = `position:absolute;top:${y}px;left:0;width:100%;height:1px;background:#0066ff;opacity:0.5;z-index:99997;pointer-events:none;`
            const hLabel = document.createElement('span')
            hLabel.style.cssText = `position:absolute;top:-16px;left:50%;transform:translateX(-50%);background:#0066ff;color:#fff;font:700 10px/1.5 monospace;padding:1px 5px;white-space:nowrap;`
            hLabel.textContent = `${id.toUpperCase()} ${i === 0 ? '1/3' : '2/3'} y=${y}px`
            hLine.appendChild(hLabel)
            document.body.appendChild(hLine)
          })
        })
      }, 500)
    }

    if (document.readyState === 'complete') measure()
    else window.addEventListener('load', measure, { once: true })
  }, [])

  return null
}
