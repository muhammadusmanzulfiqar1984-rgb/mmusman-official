import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          borderRadius: '4px',
        }}
      >
        {/* Gold "M" monogram */}
        <div style={{
          color: '#c9a84c',
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'serif',
          lineHeight: 1,
        }}>
          M
        </div>
      </div>
    ),
    { ...size }
  )
}
