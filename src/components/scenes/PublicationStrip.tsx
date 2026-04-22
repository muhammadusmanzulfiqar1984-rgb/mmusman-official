'use client'
import { useState } from 'react'

/* ─────────────────────────────────────────────
   DATA — three content classes, interleaved
   ───────────────────────────────────────────── */
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

/* Row A — left-scroll, foreground, medium opacity */
const ROW_A: PubItem[] = [
  { id: 'forbes',    name: 'Forbes',              fontFamily: 'Georgia,"Times New Roman",serif',         fontWeight: 700, fontSize: 22, note: 'FEATURED IN' },
  { id: 'tedx',      name: 'TEDx',                fontFamily: '"Arial Black",Impact,sans-serif',         fontWeight: 900, fontSize: 20, letterSpacing: '0.03em', note: 'RECOGNISED BY' },
  { id: 'coindesk',  name: 'CoinDesk',            fontFamily: 'Arial,Helvetica,sans-serif',              fontWeight: 500, fontSize: 15, note: 'COVERED BY' },
  { id: 'bloomberg', name: 'Bloomberg',           fontFamily: '"Arial Narrow",Arial,sans-serif',         fontWeight: 700, fontSize: 19, note: 'FEATURED IN' },
  { id: 'lse',       name: 'LSE',                 fontFamily: 'var(--font-mono,"DM Mono",monospace)',    fontWeight: 400, fontSize: 17, letterSpacing: '0.22em', note: 'RECOGNISED BY' },
  { id: 'dawn',      name: 'Dawn',                fontFamily: 'Georgia,"Times New Roman",serif',         fontWeight: 600, fontSize: 21, note: 'FEATURED IN' },
  { id: 'fpcci',     name: 'FPCCI',               fontFamily: 'var(--font-mono,"DM Mono",monospace)',    fontWeight: 400, fontSize: 14, letterSpacing: '0.18em', note: 'RECOGNISED BY' },
  { id: 'reuters',   name: 'Reuters',             fontFamily: 'Arial,Helvetica,sans-serif',              fontWeight: 400, fontSize: 17, letterSpacing: '0.04em', note: 'COVERED BY' },
  { id: 'oxford',    name: 'Oxford Union',        fontFamily: 'Georgia,"Times New Roman",serif',         fontWeight: 300, fontSize: 14, fontStyle: 'italic', note: 'RECOGNISED BY' },
  { id: 'beinc',     name: 'beInCrypto',          fontFamily: 'Arial,Helvetica,sans-serif',              fontWeight: 500, fontSize: 14, note: 'COVERED BY' },
  { id: 'wsj',       name: 'Wall Street Journal', fontFamily: 'Georgia,"Times New Roman",serif',         fontWeight: 400, fontSize: 13, note: 'FEATURED IN' },
  { id: 'qmul',      name: 'QMUL',                fontFamily: 'var(--font-mono,"DM Mono",monospace)',    fontWeight: 400, fontSize: 15, letterSpacing: '0.2em', note: 'RECOGNISED BY' },
  { id: 'arabnews',  name: 'Arab News',           fontFamily: 'Georgia,"Times New Roman",serif',         fontWeight: 400, fontSize: 16, note: 'FEATURED IN' },
  { id: 'geo',       name: 'Geo News',            fontFamily: 'Arial,Helvetica,sans-serif',              fontWeight: 600, fontSize: 16, note: 'COVERED BY' },
]

/* Row B — right-scroll, ghosted backdrop, slightly larger scale */
const ROW_B: PubItem[] = [
  { id: 'thenews',   name: 'The News International', fontFamily: 'Arial,Helvetica,sans-serif',           fontWeight: 400, fontSize: 14, letterSpacing: '0.02em', note: 'COVERED BY' },
  { id: 'harvard',   name: 'Harvard Kennedy',         fontFamily: 'Georgia,"Times New Roman",serif',     fontWeight: 300, fontSize: 15, fontStyle: 'italic', note: 'RECOGNISED BY' },
  { id: 'psx',       name: 'PSX Forum',               fontFamily: 'Arial,Helvetica,sans-serif',          fontWeight: 400, fontSize: 14, note: 'RECOGNISED BY' },
  { id: 'express',   name: 'Express Tribune',         fontFamily: 'Georgia,"Times New Roman",serif',     fontWeight: 400, fontSize: 16, note: 'COVERED BY' },
  { id: 'cipe',      name: 'CIPE',                    fontFamily: 'var(--font-mono,"DM Mono",monospace)', fontWeight: 400, fontSize: 17, letterSpacing: '0.2em', note: 'RECOGNISED BY' },
  { id: 'bloomberg', name: 'Bloomberg',               fontFamily: '"Arial Narrow",Arial,sans-serif',     fontWeight: 700, fontSize: 26, note: 'FEATURED IN' },
  { id: 'tedx',      name: 'TEDx',                    fontFamily: '"Arial Black",Impact,sans-serif',     fontWeight: 900, fontSize: 28, letterSpacing: '0.02em', note: 'RECOGNISED BY' },
  { id: 'forbes',    name: 'Forbes',                  fontFamily: 'Georgia,"Times New Roman",serif',     fontWeight: 700, fontSize: 30, letterSpacing: '-0.01em', note: 'FEATURED IN' },
  { id: 'reuters',   name: 'Reuters',                 fontFamily: 'Arial,Helvetica,sans-serif',          fontWeight: 400, fontSize: 20, letterSpacing: '0.04em', note: 'COVERED BY' },
  { id: 'lse',       name: 'LSE',                     fontFamily: 'var(--font-mono,"DM Mono",monospace)', fontWeight: 400, fontSize: 23, letterSpacing: '0.24em', note: 'RECOGNISED BY' },
  { id: 'dawn',      name: 'Dawn',                    fontFamily: 'Georgia,"Times New Roman",serif',     fontWeight: 600, fontSize: 27, note: 'FEATURED IN' },
  { id: 'wsj',       name: 'Wall Street Journal',     fontFamily: 'Georgia,"Times New Roman",serif',     fontWeight: 400, fontSize: 15, note: 'FEATURED IN' },
]

/* Honours — replace with real awards when available */
const HONOURS: Honour[] = [
  { title: 'Distinguished Counsel Recognition',  institution: 'Pakistan Bar Council',      year: '2019' },
  { title: 'Top 100 Business Leaders',           institution: 'Business Recorder',         year: '2021' },
  { title: 'Capital Markets Excellence',         institution: 'PSX Leadership Forum',      year: '2022' },
  { title: 'Strategic Leadership Recognition',   institution: 'FPCCI Annual Congress',     year: '2020' },
  { title: 'Cross-Border Commerce Commendation', institution: 'Pakistan–UK Trade Council', year: '2023' },
]

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PublicationStrip({ data: _ }: { data?: any }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [paused,    setPaused]    = useState(false)

  const enter = (id: string) => { setHoveredId(id); setPaused(true) }
  const leave = ()           => { setHoveredId(null); setPaused(false) }

  const renderItems = (items: PubItem[], prefix: string) =>
    items.map((item, i) => {
      const isHov  = hoveredId === item.id
      const anyHov = hoveredId !== null
      return (
        <span
          key={`${prefix}-${i}`}
          style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
        >
          {/* ── Vertical divider ── */}
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '1px',
              height: '18px',
              background: 'rgba(200,169,110,1)',
              opacity: anyHov ? (isHov ? 0.05 : 0.03) : 0.09,
              margin: '0 clamp(20px, 2.8vw, 42px)',
              flexShrink: 0,
              transition: 'opacity 300ms ease',
            }}
          />

          {/* ── Publication name ── */}
          <button
            onMouseEnter={() => enter(item.id)}
            onMouseLeave={leave}
            aria-label={`${item.note}: ${item.name}`}
            style={{
              background:    'transparent',
              border:        'none',
              cursor:        'default',
              padding:       '22px 0 10px',
              position:      'relative',
              display:       'inline-block',
              fontFamily:    item.fontFamily,
              fontWeight:    item.fontWeight,
              fontSize:      `${item.fontSize}px`,
              letterSpacing: item.letterSpacing ?? 'normal',
              fontStyle:     item.fontStyle ?? 'normal',
              color:         isHov ? 'rgba(248,224,168,1)' : 'rgba(200,169,110,1)',
              opacity:       isHov ? 1 : anyHov ? 0.12 : 0.45,
              transition:    'opacity 320ms cubic-bezier(0.4,0,0.2,1), color 320ms ease',
              whiteSpace:    'nowrap',
              lineHeight:    1,
              userSelect:    'none',
            }}
          >
            {/* FEATURED IN / COVERED BY / RECOGNISED BY label */}
            <span
              aria-hidden="true"
              style={{
                position:      'absolute',
                top:           0,
                left:          0,
                fontFamily:    'var(--font-mono,monospace)',
                fontSize:      '0.41rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color:         'rgba(200,169,110,0.65)',
                opacity:       isHov ? 1 : 0,
                transition:    'opacity 200ms ease',
                whiteSpace:    'nowrap',
                pointerEvents: 'none',
                lineHeight:    1,
              }}
            >
              {item.note}
            </span>

            {item.name}

            {/* Gold underline sweep — scaleX left → right */}
            <span
              aria-hidden="true"
              style={{
                position:        'absolute',
                bottom:          0,
                left:            0,
                height:          '1px',
                width:           '100%',
                background:      'linear-gradient(90deg, rgba(200,169,110,0.6) 0%, rgba(248,224,168,0.95) 50%, rgba(200,169,110,0.6) 100%)',
                transform:       isHov ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left center',
                transition:      'transform 320ms cubic-bezier(0.23,1,0.32,1)',
                pointerEvents:   'none',
              }}
            />
          </button>
        </span>
      )
    })

  return (
    <section
      id="recognition"
      aria-label="Press, recognition and honours"
      style={{
        boxSizing:  'border-box',
        padding:    'clamp(72px, 9vw, 112px) 0',
        borderBottom: '1px solid var(--color-border-soft)',
        background: 'linear-gradient(180deg, #0f0a08 0%, #160f0b 35%, #160f0b 65%, #0f0a08 100%)',
        overflow:   'hidden',
        position:   'relative',
      }}
    >

      {/* ── Eyebrow heading ── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 72px)', padding: '0 var(--section-pad-x)' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width:      'clamp(100px, 18vw, 200px)',
            height:     '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.5) 50%, transparent 100%)',
          }} />
          <p style={{
            fontFamily:    'var(--font-mono,monospace)',
            fontSize:      '0.5rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color:         'rgba(200,169,110,0.5)',
            margin:        0,
            whiteSpace:    'nowrap',
          }}>
            Press · Recognition · Featured Authority
          </p>
          <div style={{
            width:      'clamp(100px, 18vw, 200px)',
            height:     '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.5) 50%, transparent 100%)',
          }} />
        </div>
      </div>

      {/* ── Marquee area — edge-masked ── */}
      <div
        style={{
          position:          'relative',
          WebkitMaskImage:   'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
          maskImage:         'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
        }}
      >
        {/* Row A — scrolls left, foreground */}
        <div style={{ overflow: 'hidden', marginBottom: '32px' }}>
          <div
            className="pub-row-a"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {renderItems(ROW_A, 'a1')}
            {renderItems(ROW_A, 'a2')}
          </div>
        </div>

        {/* Row B — scrolls right, ghosted backdrop */}
        <div style={{ overflow: 'hidden', opacity: 0.75 }}>
          <div
            className="pub-row-b"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {renderItems(ROW_B, 'b1')}
            {renderItems(ROW_B, 'b2')}
          </div>
        </div>
      </div>

      {/* ── Honours & Awards ── */}
      <div style={{ padding: 'clamp(60px, 8vw, 88px) var(--section-pad-x) 0' }}>

        {/* Sub-heading with flanking rules */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border-soft)' }} />
          <p style={{
            fontFamily:    'var(--font-mono,monospace)',
            fontSize:      '0.48rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color:         'rgba(200,169,110,0.42)',
            margin:        0,
            whiteSpace:    'nowrap',
          }}>
            Honours · Awards
          </p>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border-soft)' }} />
        </div>

        {/* Archival grid */}
        <div className="honours-grid">
          {HONOURS.map((h, i) => (
            <div key={i} className="honour-entry reveal">
              <p style={{
                fontFamily:  'var(--font-display,Georgia,serif)',
                fontSize:    'clamp(0.82rem, 1.05vw, 0.92rem)',
                fontStyle:   'italic',
                fontWeight:  300,
                color:       'var(--color-text-secondary)',
                lineHeight:  1.35,
                margin:      '0 0 6px',
              }}>
                {h.title}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display:    'inline-block',
                  width:      '10px',
                  height:     '1px',
                  background: 'rgba(200,169,110,0.3)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily:    'var(--font-mono,monospace)',
                  fontSize:      '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         'rgba(200,169,110,0.48)',
                }}>
                  {h.institution}
                </span>
                <span style={{
                  fontFamily:    'var(--font-mono,monospace)',
                  fontSize:      '0.46rem',
                  color:         'rgba(200,169,110,0.28)',
                  letterSpacing: '0.06em',
                }}>
                  · {h.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        /* Marquee keyframes */
        @keyframes pubScrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pubScrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* Track classes */
        .pub-row-a {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          animation: pubScrollLeft 38s linear infinite;
          will-change: transform;
        }
        .pub-row-b {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          animation: pubScrollRight 46s linear infinite;
          will-change: transform;
        }

        /* Honours grid */
        .honours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: clamp(22px, 3vw, 38px) clamp(32px, 5vw, 60px);
        }
        .honour-entry {
          border-left: 1px solid rgba(200,169,110,0.1);
          padding-left: clamp(12px, 1.5vw, 20px);
        }

        /* Reduced motion — static, equal hierarchy */
        @media (prefers-reduced-motion: reduce) {
          .pub-row-a, .pub-row-b {
            animation: none !important;
            flex-wrap: wrap;
            gap: 12px 0;
          }
          .pub-row-a button,
          .pub-row-b button {
            opacity: 0.4 !important;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .honours-grid { grid-template-columns: 1fr 1fr; }
          .pub-row-a { animation-duration: 26s !important; }
          .pub-row-b { animation-duration: 32s !important; }
        }
        @media (max-width: 480px) {
          .honours-grid { grid-template-columns: 1fr; }
          .pub-row-a { animation-duration: 20s !important; }
          .pub-row-b { animation-duration: 24s !important; }
        }
      `}</style>
    </section>
  )
}
