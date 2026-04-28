import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mian Muhammad Usman — Lawyer, Trader, System Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '72px 80px',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold top rule */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#c9a84c' }} />

        {/* Background texture — subtle diagonal lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 40px)',
        }} />

        {/* Top pill */}
        <div style={{ display: 'flex' }}>
          <div style={{
            background: 'rgba(201,168,76,0.12)',
            border: '1px solid rgba(201,168,76,0.4)',
            color: '#c9a84c',
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '6px 18px',
            borderRadius: '100px',
          }}>
            One mind. Every industry.
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Lawyer · Trader · System Builder · Strategist
          </div>
          <div style={{ color: '#f5f0e8', fontSize: '52px', fontWeight: 300, lineHeight: 1.1, maxWidth: '820px' }}>
            Mian Muhammad Usman
          </div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '20px', fontWeight: 300, maxWidth: '700px', lineHeight: 1.5 }}>
            Built for the problems no one else will touch.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ color: '#c9a84c', fontSize: '15px', letterSpacing: '0.08em' }}>mmusman.com</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Retail', 'Oil & Gas', 'Law', 'Capital Markets', 'Fashion', 'Politics'].map(tag => (
              <div key={tag} style={{
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                padding: '4px 12px',
                borderRadius: '100px',
              }}>{tag}</div>
            ))}
          </div>
        </div>

        {/* Gold bottom rule */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: '#c9a84c' }} />
      </div>
    ),
    { ...size }
  )
}
