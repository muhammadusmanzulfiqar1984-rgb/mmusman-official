'use client'
import { useEffect, useState } from 'react'

const SECTION_IDS = ['hero','about','work','insights','speaking','training','talks','skillscape','media','truth','contact']

type SectionData = {
  id: string
  topAbs: number
  botAbs: number
  h: number
  w: number
  num: string
  h1: number
  h2: number
}

export default function DevOverlay() {
  const [active] = useState(() => process.env.NODE_ENV !== 'production')
  const [headerH, setHeaderH] = useState(0)
  const [pageH, setPageH] = useState(0)
  const [cols, setCols] = useState<number[]>([])
  const [sections, setSections] = useState<SectionData[]>([])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    const measure = () => {
      if (timeout !== undefined) clearTimeout(timeout)
      timeout = setTimeout(() => {
        const header = document.querySelector('header')
        const hH = header ? Math.round(header.getBoundingClientRect().height) : 0
        setHeaderH(hH)
        setPageH(document.documentElement.scrollHeight)

        const vp = window.innerWidth
        setCols([Math.round(vp / 3), Math.round((vp / 3) * 2)])

        const newSections: SectionData[] = []
        SECTION_IDS.forEach((id, i) => {
          const el = document.getElementById(id)
          if (!el) return
          const r = el.getBoundingClientRect()
          const topAbs = Math.round(r.top + window.scrollY)
          const h = Math.round(r.height)
          newSections.push({
            id,
            topAbs,
            botAbs: Math.round(r.bottom + window.scrollY),
            h,
            w: Math.round(r.width),
            num: String(i + 1).padStart(2, '0'),
            h1: Math.round(topAbs + h / 3),
            h2: Math.round(topAbs + (h / 3) * 2)
          })
        })
        setSections(newSections)
      }, 500)
    }

    // Measure once page is fully loaded
    if (document.readyState === 'complete') measure()
    else window.addEventListener('load', measure)
    
    // Remeasure if user resizes the window
    window.addEventListener('resize', measure)

    return () => {
      if (timeout !== undefined) clearTimeout(timeout)
      window.removeEventListener('load', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Don't render anything if inactive or on the server
  if (!active || typeof window === 'undefined') return null

  return (
    <div style={{ pointerEvents: 'none', zIndex: 99999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Header Line */}
      <div style={{ position: 'fixed', top: headerH, left: 0, width: '100%', height: '2px', background: '#00ff00', zIndex: 999999 }}>
        <span style={{ position: 'absolute', top: 2, left: 8, background: '#00ff00', color: '#000', font: '700 11px/1.5 monospace', padding: '2px 8px', whiteSpace: 'nowrap' }}>
          HEADER END | h={headerH}px — CONTENT STARTS HERE
        </span>
      </div>

      {/* Vertical Columns */}
      {cols.map((x, i) => (
        <div key={`col-${i}`} style={{ position: 'absolute', top: 0, left: x, width: '1px', height: pageH, background: '#0066ff', opacity: 0.5, zIndex: 99997 }}>
          <span style={{ position: 'fixed', top: headerH + 4, left: x + 4, background: '#0066ff', color: '#fff', font: '700 10px/1.5 monospace', padding: '1px 5px', whiteSpace: 'nowrap', zIndex: 99999 }}>
            {i === 0 ? '1/3' : '2/3'} x={x}px
          </span>
        </div>
      ))}

      {/* Sections */}
      {sections.map(s => (
        <div key={s.id}>
          {/* Start Line */}
          <div style={{ position: 'absolute', top: s.topAbs, left: 0, width: '100%', height: '2px', background: '#00ff00', zIndex: 99998 }}>
            <span style={{ position: 'absolute', top: 2, left: 8, background: '#00ff00', color: '#000', font: '700 11px/1.5 monospace', padding: '2px 8px', whiteSpace: 'nowrap' }}>
              ▶ {s.num} · {s.id.toUpperCase()} START | top={s.topAbs}px w={s.w}px h={s.h}px
            </span>
          </div>

          {/* Horizontal Thirds */}
          {[s.h1, s.h2].map((y, i) => (
            <div key={`h-${s.id}-${i}`} style={{ position: 'absolute', top: y, left: 0, width: '100%', height: '1px', background: '#0066ff', opacity: 0.5, zIndex: 99997 }}>
              <span style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: '#0066ff', color: '#fff', font: '700 10px/1.5 monospace', padding: '1px 5px', whiteSpace: 'nowrap' }}>
                {s.id.toUpperCase()} {i === 0 ? '1/3' : '2/3'} y={y}px
              </span>
            </div>
          ))}

          {/* End Line */}
          <div style={{ position: 'absolute', top: s.botAbs, left: 0, width: '100%', height: '2px', background: '#00ff00', zIndex: 99998 }}>
            <span style={{ position: 'absolute', top: -20, right: 8, background: '#00ff00', color: '#000', font: '700 11px/1.5 monospace', padding: '2px 8px', whiteSpace: 'nowrap' }}>
              ■ {s.num} · {s.id.toUpperCase()} END | bottom={s.botAbs}px
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
