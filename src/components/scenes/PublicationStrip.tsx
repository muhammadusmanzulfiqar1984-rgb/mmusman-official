'use client'
import { useState } from 'react'

interface PubItem {
  id:            string
  name:          string
  fontFamily:    string
  fontWeight:    number
  fontSize:      number
  letterSpacing?: string
  fontStyle?:    string
  note:          'FEATURED IN' | 'COVERED BY' | 'RECOGNISED BY'
}

interface Honour {
  title:       string
  institution: string
  year:        string
}

const ROW_A: PubItem[] = [
  { id: 'forbes',    name: 'Forbes',              fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 700, fontSize: 26, note: 'FEATURED IN' },
  { id: 'tedx',      name: 'TEDx',                fontFamily: '"Arial Black",Impact,sans-serif',      fontWeight: 900, fontSize: 23, letterSpacing: '0.04em', note: 'RECOGNISED BY' },
  { id: 'bloomberg', name: 'Bloomberg',           fontFamily: '"Arial Narrow",Arial,sans-serif',      fontWeight: 700, fontSize: 22, note: 'FEATURED IN' },
  { id: 'dawn',      name: 'Dawn',                fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 700, fontSize: 25, note: 'FEATURED IN' },
  { id: 'reuters',   name: 'Reuters',             fontFamily: 'Arial,Helvetica,sans-serif',           fontWeight: 500, fontSize: 20, letterSpacing: '0.05em', note: 'COVERED BY' },
  { id: 'wsj',       name: 'Wall Street Journal', fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 400, fontSize: 16, note: 'FEATURED IN' },
  { id: 'lse',       name: 'LSE',                 fontFamily: 'var(--font-mono,"DM Mono",monospace)', fontWeight: 500, fontSize: 20, letterSpacing: '0.24em', note: 'RECOGNISED BY' },
  { id: 'arabnews',  name: 'Arab News',           fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 500, fontSize: 19, note: 'FEATURED IN' },
  { id: 'coindesk',  name: 'CoinDesk',            fontFamily: 'Arial,Helvetica,sans-serif',           fontWeight: 600, fontSize: 18, note: 'COVERED BY' },
  { id: 'fpcci',     name: 'FPCCI',               fontFamily: 'var(--font-mono,"DM Mono",monospace)', fontWeight: 400, fontSize: 16, letterSpacing: '0.2em', note: 'RECOGNISED BY' },
  { id: 'geo',       name: 'Geo News',            fontFamily: 'Arial,Helvetica,sans-serif',           fontWeight: 700, fontSize: 19, note: 'COVERED BY' },
  { id: 'oxford',    name: 'Oxford Union',        fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 300, fontSize: 16, fontStyle: 'italic', note: 'RECOGNISED BY' },
  { id: 'qmul',      name: 'QMUL',                fontFamily: 'var(--font-mono,"DM Mono",monospace)', fontWeight: 400, fontSize: 17, letterSpacing: '0.22em', note: 'RECOGNISED BY' },
  { id: 'beinc',     name: 'beInCrypto',          fontFamily: 'Arial,Helvetica,sans-serif',           fontWeight: 600, fontSize: 17, note: 'COVERED BY' },
]

const ROW_B: PubItem[] = [
  { id: 'forbes',    name: 'Forbes',              fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 700, fontSize: 44, letterSpacing: '-0.01em', note: 'FEATURED IN' },
  { id: 'bloomberg', name: 'Bloomberg',           fontFamily: '"Arial Narrow",Arial,sans-serif',      fontWeight: 700, fontSize: 38, note: 'FEATURED IN' },
  { id: 'tedx',      name: 'TEDx',                fontFamily: '"Arial Black",Impact,sans-serif',      fontWeight: 900, fontSize: 40, letterSpacing: '0.03em', note: 'RECOGNISED BY' },
  { id: 'dawn',      name: 'Dawn',                fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 700, fontSize: 42, note: 'FEATURED IN' },
  { id: 'lse',       name: 'LSE',                 fontFamily: 'var(--font-mono,"DM Mono",monospace)', fontWeight: 400, fontSize: 36, letterSpacing: '0.26em', note: 'RECOGNISED BY' },
  { id: 'reuters',   name: 'Reuters',             fontFamily: 'Arial,Helvetica,sans-serif',           fontWeight: 400, fontSize: 30, letterSpacing: '0.06em', note: 'COVERED BY' },
  { id: 'wsj',       name: 'Wall Street Journal', fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 300, fontSize: 22, note: 'FEATURED IN' },
  { id: 'express',   name: 'Express Tribune',     fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 400, fontSize: 24, note: 'COVERED BY' },
  { id: 'harvard',   name: 'Harvard Kennedy',     fontFamily: 'Georgia,"Times New Roman",serif',      fontWeight: 300, fontSize: 22, fontStyle: 'italic', note: 'RECOGNISED BY' },
]

const HONOURS: Honour[] = [
  { title: 'Distinguished Counsel Recognition',  institution: 'Pakistan Bar Council',      year: '2019' },
  { title: 'Top 100 Business Leaders',           institution: 'Business Recorder',         year: '2021' },
  { title: 'Capital Markets Excellence',         institution: 'PSX Leadership Forum',      year: '2022' },
  { title: 'Strategic Leadership Recognition',   institution: 'FPCCI Annual Congress',     year: '2020' },
  { title: 'Cross-Border Commerce Commendation', institution: 'Pakistan–UK Trade Council', year: '2023' },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PublicationStrip({ data: _ }: { data?: any }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [paused,    setPaused]    = useState(false)

  const enter = (id: string) => { setHoveredId(id); setPaused(true) }
  const leave = ()           => { setHoveredId(null); setPaused(false) }

  const renderItems = (items: PubItem[], prefix: string, variant: 'a' | 'b') =>
    items.map((item, i) => {
      const isHov  = hoveredId === item.id
      const anyHov = hoveredId !== null
      const baseOp = variant === 'a' ? 0.82 : 0.18
      const dimOp  = variant === 'a' ? 0.35 : 0.08
      const hovOp  = variant === 'a' ? 1    : 0.30
      const baseClr = variant === 'a' ? 'rgba(228,196,128,1)' : 'rgba(200,169,110,1)'
      const hovClr  = 'rgba(255,238,185,1)'
      const divH    = variant === 'a' ? '20px' : '36px'
      const divMar  = variant === 'a' ? 'clamp(22px,2.8vw,46px)' : 'clamp(30px,4vw,64px)'
      const divOp   = anyHov ? (isHov ? 0.04 : 0.05) : (variant === 'a' ? 0.22 : 0.09)

      return (
        <span key={`${prefix}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
          <span aria-hidden="true" style={{
            display: 'inline-block', width: '1px', height: divH,
            background: 'rgba(200,169,110,1)',
            opacity: divOp, margin: `0 ${divMar}`,
            flexShrink: 0, transition: 'opacity 260ms ease',
          }} />
          <button
            onMouseEnter={() => enter(item.id)}
            onMouseLeave={leave}
            aria-label={`${item.note}: ${item.name}`}
            style={{
              background: 'transparent', border: 'none', cursor: 'default',
              padding: '24px 0 10px', position: 'relative', display: 'inline-block',
              fontFamily: item.fontFamily, fontWeight: item.fontWeight,
              fontSize: `${item.fontSize}px`,
              letterSpacing: item.letterSpacing ?? 'normal',
              fontStyle: item.fontStyle ?? 'normal',
              color: isHov ? hovClr : baseClr,
              opacity: isHov ? hovOp : anyHov ? dimOp : baseOp,
              transition: 'opacity 260ms cubic-bezier(0.4,0,0.2,1), color 260ms ease',
              whiteSpace: 'nowrap', lineHeight: 1, userSelect: 'none',
            }}
          >
            {/* Label */}
            <span aria-hidden="true" style={{
              position: 'absolute', top: 2, left: 0,
              fontFamily: 'var(--font-mono,monospace)',
              fontSize: '0.4rem', letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(228,196,128,0.85)',
              opacity: isHov ? 1 : 0,
              transition: 'opacity 160ms ease',
              whiteSpace: 'nowrap', pointerEvents: 'none', lineHeight: 1,
            }}>{item.note}</span>

            {item.name}

            {/* Underline sweep */}
            <span aria-hidden="true" style={{
              position: 'absolute', bottom: 0, left: 0,
              height: '1px', width: '100%',
              background: 'linear-gradient(90deg,rgba(200,169,110,0.4) 0%,rgba(255,230,150,1) 50%,rgba(200,169,110,0.4) 100%)',
              transform: isHov ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left center',
              transition: 'transform 300ms cubic-bezier(0.23,1,0.32,1)',
              pointerEvents: 'none',
            }} />

            {/* Warm hover bloom */}
            {isHov && (
              <span aria-hidden="true" style={{
                position: 'absolute', inset: '-8px -16px',
                background: 'radial-gradient(ellipse 80% 100% at 50% 60%,rgba(200,158,60,0.12) 0%,transparent 70%)',
                pointerEvents: 'none', borderRadius: '2px',
              }} />
            )}
          </button>
        </span>
      )
    })

  return (
    <section
      id="recognition"
      aria-label="Press, recognition and honours"
      style={{
        boxSizing:    'border-box',
        padding:      'clamp(40px,5vw,64px) 0',
        borderBottom: '1px solid rgba(200,169,110,0.22)',
        borderTop:    '1px solid rgba(200,169,110,0.14)',
        background:   'linear-gradient(180deg,rgba(8,4,1,0) 0%,rgba(26,16,4,1) 6%,rgba(20,12,3,1) 50%,rgba(26,16,4,1) 94%,rgba(8,4,1,0) 100%)',
        overflow:     'hidden',
        position:     'relative',
        zIndex:       10,
        isolation:    'isolate',
        maxWidth:     '100vw',
      }}
    >
      {/* Reflective editorial band */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        transform: 'translateY(-50%)', height: '200px',
        background: 'linear-gradient(180deg,transparent 0%,rgba(200,158,60,0.05) 25%,rgba(200,158,60,0.08) 50%,rgba(200,158,60,0.05) 75%,transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Eyebrow */}
      <div style={{ textAlign:'center', marginBottom:'clamp(36px,5.5vw,60px)', padding:'0 var(--section-pad-x)', position:'relative', zIndex:2 }}>
        <div style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'clamp(120px,20vw,240px)', height:'1px', background:'linear-gradient(90deg,transparent 0%,rgba(200,169,110,0.65) 50%,transparent 100%)' }} />
          <p style={{
            fontFamily:'var(--font-mono,monospace)', fontSize:'0.52rem',
            letterSpacing:'0.3em', textTransform:'uppercase',
            color:'rgba(220,185,120,0.85)', margin:0, whiteSpace:'nowrap',
          }}>Press · Recognition · Featured Authority</p>
          <div style={{ width:'clamp(120px,20vw,240px)', height:'1px', background:'linear-gradient(90deg,transparent 0%,rgba(200,169,110,0.65) 50%,transparent 100%)' }} />
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        position:'relative', zIndex:2,
        WebkitMaskImage:'linear-gradient(to right,transparent 0%,black 7%,black 93%,transparent 100%)',
        maskImage:'linear-gradient(to right,transparent 0%,black 7%,black 93%,transparent 100%)',
      }}>
        <div style={{ overflow:'hidden', marginBottom:'24px', lineHeight:0 }}>
          <div className="pub-row-a" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
            {renderItems(ROW_A,'a1','a')}
            {renderItems(ROW_A,'a2','a')}
          </div>
        </div>
        <div style={{ overflow:'hidden', lineHeight:0 }}>
          <div className="pub-row-b" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
            {renderItems(ROW_B,'b1','b')}
            {renderItems(ROW_B,'b2','b')}
          </div>
        </div>
      </div>

      {/* Honours */}
      <div style={{ padding:'clamp(52px,7vw,76px) var(--section-pad-x) 0', position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'var(--space-6)', marginBottom:'clamp(24px,3.5vw,40px)' }}>
          <div style={{ flex:1, height:'1px', background:'rgba(200,169,110,0.22)' }} />
          <p style={{ fontFamily:'var(--font-mono,monospace)', fontSize:'0.5rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(220,185,120,0.7)', margin:0, whiteSpace:'nowrap' }}>
            Honours · Awards
          </p>
          <div style={{ flex:1, height:'1px', background:'rgba(200,169,110,0.22)' }} />
        </div>
        <div className="honours-grid">
          {HONOURS.map((h,i) => (
            <div key={i} className="honour-entry reveal">
              <p style={{ fontFamily:'var(--font-display,Georgia,serif)', fontSize:'clamp(0.88rem,1.1vw,0.98rem)', fontStyle:'italic', fontWeight:300, color:'rgba(228,204,162,0.92)', lineHeight:1.4, margin:'0 0 8px' }}>
                {h.title}
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <span style={{ display:'inline-block', width:'12px', height:'1px', background:'rgba(200,169,110,0.5)', flexShrink:0 }} />
                <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:'0.52rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(200,169,110,0.7)' }}>
                  {h.institution}
                </span>
                <span style={{ fontFamily:'var(--font-mono,monospace)', fontSize:'0.48rem', color:'rgba(200,169,110,0.45)', letterSpacing:'0.06em' }}>
                  · {h.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pubScrollLeft  { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
        @keyframes pubScrollRight { from{transform:translateX(-50%)} to{transform:translateX(0)}    }
        .pub-row-a { display:inline-flex; align-items:center; white-space:nowrap; animation:pubScrollLeft  38s linear infinite; will-change:transform; }
        .pub-row-b { display:inline-flex; align-items:center; white-space:nowrap; animation:pubScrollRight 48s linear infinite; will-change:transform; }
        .honours-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:clamp(18px,2.5vw,32px) clamp(24px,4vw,52px); }
        .honour-entry { border-left:1px solid rgba(200,169,110,0.22); padding-left:clamp(12px,1.5vw,20px); transition:border-color 200ms ease; }
        .honour-entry:hover { border-left-color:rgba(200,169,110,0.55); }
        @media (prefers-reduced-motion:reduce) {
          .pub-row-a,.pub-row-b { animation:none !important; flex-wrap:wrap; gap:12px 0; }
          .pub-row-a button,.pub-row-b button { opacity:0.65 !important; }
        }
        @media (max-width:768px) {
          .honours-grid { grid-template-columns:1fr 1fr; }
          .pub-row-a { animation-duration:26s !important; }
          .pub-row-b { animation-duration:32s !important; }
        }
        @media (max-width:480px) {
          .honours-grid { grid-template-columns:1fr; }
          .pub-row-a { animation-duration:20s !important; }
          .pub-row-b { animation-duration:24s !important; }
        }
      `}</style>
    </section>
  )
}
